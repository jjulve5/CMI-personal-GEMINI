/**
 * @file finance.ts
 * @description Modelos de dominio y tipos de cálculo para el Centro Financiero.
 */

export type AssetCategory = 'STOCK' | 'ETF' | 'CRYPTO' | 'PRECIOUS_METAL';

export interface BankAccount {
  id: string;
  name: string;
  accountType: 'CHECKING' | 'SAVINGS' | 'INVESTMENT_CASH';
  currency: string;
  balance: number;
  institution: string;
  updatedAt: string;
}

export interface PortfolioAsset {
  id: string;
  symbol: string;
  name: string;
  assetType: AssetCategory;
  quantity: number;
  purchasePriceAvg: number;
  currentPrice: number;
  currency: string;
  platform: string;
  updatedAt: string;
  // Métricas calculadas
  totalInvested?: number;
  currentValue?: number;
  unrealizedProfit?: number;
  unrealizedProfitPercent?: number;
}

export interface FinancialSummary {
  totalLiquidity: number;
  totalInvested: number;
  totalNetWorth: number;
  totalUnrealizedPnL: number;
  unrealizedPnLPercent: number;
  distributionByCategory: Record<AssetCategory | 'LIQUIDITY', number>;
}
