/**
 * @file PortfolioTable.tsx
 * @description Tabla de cartera diversificada (Acciones, ETFs, Cripto, Metales Preciosos).
 */

import React from 'react';
import { TrendingUp, TrendingDown, Layers } from 'lucide-react';
import type { PortfolioAsset } from '../../types/finance';
import { formatCurrency, formatPercent } from '../../lib/formatters';

interface PortfolioTableProps {
  assets: PortfolioAsset[];
}

export const PortfolioTable: React.FC<PortfolioTableProps> = ({ assets }) => {
  const getAssetBadgeColor = (type: string) => {
    switch (type) {
      case 'STOCK':
        return 'bg-blue-950/60 text-blue-300 border-blue-800/40';
      case 'ETF':
        return 'bg-purple-950/60 text-purple-300 border-purple-800/40';
      case 'CRYPTO':
        return 'bg-amber-950/60 text-amber-300 border-amber-800/40';
      case 'PRECIOUS_METAL':
        return 'bg-yellow-950/60 text-yellow-300 border-yellow-800/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Cartera de Inversiones</h3>
            <p className="text-xs text-slate-400">Acciones, ETFs, Criptomonedas y Metales</p>
          </div>
        </div>
        <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md">
          {assets.length} activos
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
              <th className="pb-2 font-medium">Activo</th>
              <th className="pb-2 font-medium">Tipo</th>
              <th className="pb-2 font-medium text-right">Cantidad</th>
              <th className="pb-2 font-medium text-right">Precio Promedio</th>
              <th className="pb-2 font-medium text-right">Precio Actual</th>
              <th className="pb-2 font-medium text-right">Valor Total</th>
              <th className="pb-2 font-medium text-right">Rendimiento (P&L)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {assets.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-slate-400">
                  No hay activos registrados en la cartera.
                </td>
              </tr>
            ) : (
              assets.map((asset) => {
                const profit = asset.unrealizedProfit || 0;
                const profitPercent = asset.unrealizedProfitPercent || 0;
                const isPositive = profit >= 0;

                return (
                  <tr key={asset.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 pr-2">
                      <div className="font-semibold text-slate-100">{asset.symbol}</div>
                      <div className="text-[11px] text-slate-400">{asset.name}</div>
                    </td>
                    <td className="py-3 pr-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${getAssetBadgeColor(asset.assetType)}`}>
                        {asset.assetType}
                      </span>
                    </td>
                    <td className="py-3 text-right text-slate-200 font-mono">
                      {asset.quantity.toLocaleString('es-ES', { maximumFractionDigits: 6 })}
                    </td>
                    <td className="py-3 text-right text-slate-400 font-mono">
                      {formatCurrency(asset.purchasePriceAvg, asset.currency)}
                    </td>
                    <td className="py-3 text-right text-slate-200 font-mono font-medium">
                      {formatCurrency(asset.currentPrice, asset.currency)}
                    </td>
                    <td className="py-3 text-right text-slate-100 font-semibold font-mono">
                      {formatCurrency(asset.currentValue || 0, asset.currency)}
                    </td>
                    <td className="py-3 text-right font-mono">
                      <span className={`inline-flex items-center gap-1 font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {formatCurrency(profit, asset.currency)} ({formatPercent(profitPercent)})
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
