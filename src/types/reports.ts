/**
 * @file reports.ts
 * @description Tipos de dominio para el módulo de Informes Diarios (Mercados e IA).
 */

export type ReportCategory = 'FINANCIAL_MARKET' | 'AI_TECHNOLOGY' | 'MACROECONOMY';
export type MarketSentiment = 'BULLISH' | 'BEARISH' | 'NEUTRAL';

export interface DailyReport {
  id: string;
  title: string;
  category: ReportCategory;
  summary: string;
  content: string;
  source: string;
  sentiment?: MarketSentiment | null;
  tags: string[];
  reportDate: string;
}
