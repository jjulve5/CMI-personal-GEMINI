/**
 * @file LiquidityCard.tsx
 * @description Tarjeta para visualizar el desglose de liquidez y cuentas bancarias.
 */

import React from 'react';
import { Landmark, ArrowUpRight } from 'lucide-react';
import type { BankAccount } from '../../types/finance';
import { formatCurrency } from '../../lib/formatters';

interface LiquidityCardProps {
  accounts: BankAccount[];
  totalLiquidity: number;
}

export const LiquidityCard: React.FC<LiquidityCardProps> = ({ accounts, totalLiquidity }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Landmark className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Liquidez Bancaria</h3>
            <p className="text-xs text-slate-400">Total en cuentas corrientes y depósitos</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-emerald-400">
            {formatCurrency(totalLiquidity)}
          </span>
        </div>
      </div>

      <div className="divide-y divide-slate-800/60 mt-2">
        {accounts.length === 0 ? (
          <p className="text-xs text-slate-400 py-3 text-center">No hay cuentas bancarias registradas.</p>
        ) : (
          accounts.map((acc) => (
            <div key={acc.id} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <p className="font-medium text-slate-200">{acc.name}</p>
                <p className="text-slate-400 text-[11px]">{acc.institution} • {acc.accountType}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-100">{formatCurrency(acc.balance, acc.currency)}</p>
                <span className="text-[10px] text-slate-400 flex items-center justify-end gap-0.5">
                  <ArrowUpRight className="w-2.5 h-2.5 text-emerald-500" /> Disponible
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
