/**
 * @file ReportCard.tsx
 * @description Tarjeta de presentación de informes de IA y Mercados Financieros.
 */

import React from 'react';
import { Newspaper, TrendingUp, TrendingDown, Cpu, Globe } from 'lucide-react';
import type { DailyReport } from '../../types/reports';
import { formatDate } from '../../lib/formatters';

interface ReportCardProps {
  report: DailyReport;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  const isMarket = report.category === 'FINANCIAL_MARKET';
  const isAI = report.category === 'AI_TECHNOLOGY';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`p-1.5 rounded-md border text-xs ${
              isMarket
                ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-400'
                : isAI
                ? 'bg-purple-950/40 border-purple-800/40 text-purple-400'
                : 'bg-blue-950/40 border-blue-800/40 text-blue-400'
            }`}>
              {isMarket ? <TrendingUp className="w-3.5 h-3.5" /> : isAI ? <Cpu className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
            </span>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              {report.category.replace('_', ' ')}
            </span>
          </div>

          <span className="text-[11px] text-slate-400 font-mono">{formatDate(report.reportDate)}</span>
        </div>

        <h3 className="text-base font-bold text-slate-100 mb-2 leading-snug">{report.title}</h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">{report.summary}</p>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span>Fuente: <strong className="text-slate-300 font-medium">{report.source}</strong></span>
        {report.sentiment && (
          <span className={`px-2 py-0.5 rounded font-mono font-medium flex items-center gap-1 ${
            report.sentiment === 'BULLISH'
              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
              : report.sentiment === 'BEARISH'
              ? 'bg-rose-950/60 text-rose-300 border border-rose-800/40'
              : 'bg-slate-800 text-slate-300'
          }`}>
            {report.sentiment === 'BULLISH' && <TrendingUp className="w-2.5 h-2.5" />}
            {report.sentiment === 'BEARISH' && <TrendingDown className="w-2.5 h-2.5" />}
            {report.sentiment}
          </span>
        )}
      </div>
    </div>
  );
};
