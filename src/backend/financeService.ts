/**
 * @file financeService.ts
 * @description Capa backend: Servicios y transacciones de Base de Datos para el Centro Financiero.
 * Implementa consultas optimizadas para balances de cuentas, cartera de activos y cálculo de rentabilidades.
 */

import { getSupabaseClient } from '../lib/supabaseClient';
import type { BankAccount, PortfolioAsset, FinancialSummary } from '../types/finance';

// ==========================================
// SECCIÓN 1: CUENTAS BANCARIAS Y LIQUIDEZ
// ==========================================

export async function fetchBankAccounts(): Promise<BankAccount[]> {
  const client = getSupabaseClient();
  if (!client) {
    return [];
  }

  const { data, error } = await client
    .from('bank_accounts')
    .select('*')
    .order('balance', { ascending: false });

  if (error) {
    console.error('[financeService] Error al obtener cuentas bancarias:', error);
    throw error;
  }

  return (data || []).map((row) => ({
    id: row.id,
    name: row.name,
    accountType: row.account_type,
    currency: row.currency,
    balance: Number(row.balance),
    institution: row.institution,
    updatedAt: row.updated_at,
  }));
}

// ==========================================
// SECCIÓN 2: CARTERA DE INVERSIONES
// ==========================================

export async function fetchPortfolioAssets(): Promise<PortfolioAsset[]> {
  const client = getSupabaseClient();
  if (!client) {
    return [];
  }

  const { data, error } = await client
    .from('portfolio_assets')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('[financeService] Error al obtener cartera de activos:', error);
    throw error;
  }

  return (data || []).map((row) => {
    const qty = Number(row.quantity);
    const avgPrice = Number(row.purchase_price_avg);
    const currPrice = Number(row.current_price);
    const totalInvested = qty * avgPrice;
    const currentValue = qty * currPrice;
    const unrealizedProfit = currentValue - totalInvested;
    const unrealizedProfitPercent = totalInvested > 0 ? (unrealizedProfit / totalInvested) * 100 : 0;

    return {
      id: row.id,
      symbol: row.symbol,
      name: row.name,
      assetType: row.asset_type,
      quantity: qty,
      purchasePriceAvg: avgPrice,
      currentPrice: currPrice,
      currency: row.currency,
      platform: row.platform,
      updatedAt: row.updated_at,
      totalInvested,
      currentValue,
      unrealizedProfit,
      unrealizedProfitPercent,
    };
  });
}

// ==========================================
// SECCIÓN 3: CÁLCULO DE PATRIMONIO GLOBAL
// ==========================================

export function computeFinancialSummary(
  accounts: BankAccount[],
  assets: PortfolioAsset[]
): FinancialSummary {
  const totalLiquidity = accounts.reduce((acc, curr) => acc + curr.balance, 0);

  let totalInvested = 0;
  let totalPortfolioValue = 0;

  const distribution = {
    STOCK: 0,
    ETF: 0,
    CRYPTO: 0,
    PRECIOUS_METAL: 0,
    LIQUIDITY: totalLiquidity,
  };

  assets.forEach((asset) => {
    const invested = asset.totalInvested || 0;
    const currentVal = asset.currentValue || 0;

    totalInvested += invested;
    totalPortfolioValue += currentVal;

    if (asset.assetType in distribution) {
      distribution[asset.assetType] += currentVal;
    }
  });

  const totalNetWorth = totalLiquidity + totalPortfolioValue;
  const totalUnrealizedPnL = totalPortfolioValue - totalInvested;
  const unrealizedPnLPercent = totalInvested > 0 ? (totalUnrealizedPnL / totalInvested) * 100 : 0;

  return {
    totalLiquidity,
    totalInvested,
    totalNetWorth,
    totalUnrealizedPnL,
    unrealizedPnLPercent,
    distributionByCategory: distribution,
  };
}
