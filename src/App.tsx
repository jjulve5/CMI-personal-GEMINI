/**
 * @file App.tsx
 * @description Orquestador del Panel de Control Personal.
 * Integra Centro Financiero, Planificador Académico e Informes Diarios
 * estructurado bajo Clean Architecture (/frontend, /backend, /lib, /types).
 */

import { useState, useEffect } from 'react';
import { Header } from './frontend/layout/Header';
import { Sidebar, ActiveTab } from './frontend/layout/Sidebar';
import { SupabaseConfigModal } from './frontend/layout/SupabaseConfigModal';
import { LiquidityCard } from './frontend/finance/LiquidityCard';
import { PortfolioTable } from './frontend/finance/PortfolioTable';
import { CourseGrid } from './frontend/academic/CourseGrid';
import { AcademicTimeline } from './frontend/academic/AcademicTimeline';
import { ReportCard } from './frontend/reports/ReportCard';

import { 
  fetchBankAccounts, 
  fetchPortfolioAssets, 
  computeFinancialSummary 
} from './backend/financeService';
import { 
  fetchAcademicCourses, 
  fetchAcademicEvents, 
  computeAcademicProgress 
} from './backend/academicService';
import { fetchDailyReports } from './backend/reportsService';

import type { BankAccount, PortfolioAsset, FinancialSummary } from './types/finance';
import type { AcademicCourse, AcademicEvent, AcademicProgress } from './types/academic';
import type { DailyReport } from './types/reports';
import { formatCurrency, formatPercent } from './lib/formatters';
import { Landmark, Briefcase, GraduationCap, Award, Newspaper } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  // Estados locales con datos iniciales (servirán de demostración o datos de Supabase)
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      name: 'Cuenta Nómina Principal',
      accountType: 'CHECKING',
      currency: 'EUR',
      balance: 4850.50,
      institution: 'BBVA',
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Fondo de Emergencia (Depósito 3%)',
      accountType: 'SAVINGS',
      currency: 'EUR',
      balance: 15200.00,
      institution: 'Trade Republic',
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Efectivo en Broker',
      accountType: 'INVESTMENT_CASH',
      currency: 'EUR',
      balance: 1420.00,
      institution: 'Interactive Brokers',
      updatedAt: new Date().toISOString(),
    }
  ]);

  const [assets, setAssets] = useState<PortfolioAsset[]>([
    {
      id: '1',
      symbol: 'VWCE',
      name: 'Vanguard FTSE All-World UCITS ETF',
      assetType: 'ETF',
      quantity: 120,
      purchasePriceAvg: 104.50,
      currentPrice: 124.80,
      currency: 'EUR',
      platform: 'Interactive Brokers',
      updatedAt: new Date().toISOString(),
      totalInvested: 12540,
      currentValue: 14976,
      unrealizedProfit: 2436,
      unrealizedProfitPercent: 19.42,
    },
    {
      id: '2',
      symbol: 'BTC',
      name: 'Bitcoin',
      assetType: 'CRYPTO',
      quantity: 0.35,
      purchasePriceAvg: 48200.00,
      currentPrice: 87450.00,
      currency: 'EUR',
      platform: 'Cold Wallet',
      updatedAt: new Date().toISOString(),
      totalInvested: 16870,
      currentValue: 30607.5,
      unrealizedProfit: 13737.5,
      unrealizedProfitPercent: 81.43,
    },
    {
      id: '3',
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      assetType: 'STOCK',
      quantity: 45,
      purchasePriceAvg: 95.00,
      currentPrice: 138.20,
      currency: 'EUR',
      platform: 'Interactive Brokers',
      updatedAt: new Date().toISOString(),
      totalInvested: 4275,
      currentValue: 6219,
      unrealizedProfit: 1944,
      unrealizedProfitPercent: 45.47,
    },
    {
      id: '4',
      symbol: 'GOLD',
      name: 'Physical Gold ETC',
      assetType: 'PRECIOUS_METAL',
      quantity: 30,
      purchasePriceAvg: 185.00,
      currentPrice: 228.40,
      currency: 'EUR',
      platform: 'Trade Republic',
      updatedAt: new Date().toISOString(),
      totalInvested: 5550,
      currentValue: 6852,
      unrealizedProfit: 1302,
      unrealizedProfitPercent: 23.45,
    }
  ]);

  const [courses, setCourses] = useState<AcademicCourse[]>([
    {
      id: 'c1',
      code: 'ING-401',
      name: 'Sistemas Distribuidos y Cloud',
      credits: 6,
      semester: 7,
      academicYear: '2025/2026',
      professor: 'Dr. Alejandro Morales',
      status: 'ENROLLED',
      finalGrade: null,
      colorHex: '#6366f1',
    },
    {
      id: 'c2',
      code: 'ING-402',
      name: 'Arquitectura de Computadores Avanzada',
      credits: 6,
      semester: 7,
      academicYear: '2025/2026',
      professor: 'Dra. Carmen Valero',
      status: 'ENROLLED',
      finalGrade: null,
      colorHex: '#06b6d4',
    },
    {
      id: 'c3',
      code: 'ING-305',
      name: 'Teoría de Control y Robótica',
      credits: 6,
      semester: 6,
      academicYear: '2024/2025',
      professor: 'Dr. Fernando Soria',
      status: 'PASSED',
      finalGrade: 8.8,
      colorHex: '#10b981',
    },
    {
      id: 'c4',
      code: 'ING-306',
      name: 'Bases de Datos e Inteligencia de Negocio',
      credits: 6,
      semester: 6,
      academicYear: '2024/2025',
      professor: 'Dra. Laura Gil',
      status: 'PASSED',
      finalGrade: 9.4,
      colorHex: '#8b5cf6',
    }
  ]);

  const [events, setEvents] = useState<AcademicEvent[]>([
    {
      id: 'e1',
      courseId: 'c1',
      courseName: 'Sistemas Distribuidos y Cloud',
      courseColor: '#6366f1',
      title: 'Entrega Proyecto: Cluster Kubernetes & Consenso Raft',
      eventType: 'DELIVERY',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      weightPercentage: 35,
      status: 'PENDING',
    },
    {
      id: 'e2',
      courseId: 'c2',
      courseName: 'Arquitectura de Computadores Avanzada',
      courseColor: '#06b6d4',
      title: 'Examen Parcial: Jerarquía de Cachés y Pipeline OOO',
      eventType: 'EXAM',
      dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
      weightPercentage: 40,
      status: 'PENDING',
    }
  ]);

  const [reports, setReports] = useState<DailyReport[]>([
    {
      id: 'r1',
      title: 'Mercados: La inflación PCE modera rendimientos y empuja la renta variable global',
      category: 'FINANCIAL_MARKET',
      summary: 'Los índices S&P 500 y MSCI World consolidan máximos tras datos de empleo estables. El oro físico y Bitcoin se mantienen como reservas estratégicas de liquidez.',
      content: 'Contenido completo del análisis macroeconómico...',
      source: 'Bloomberg Financial Markets',
      sentiment: 'BULLISH',
      tags: ['S&P500', 'Macro', 'Liquidez'],
      reportDate: new Date().toISOString(),
    },
    {
      id: 'r2',
      title: 'Inteligencia Artificial: Avances en razonamiento autónomo y computación cuántica híbrida',
      category: 'AI_TECHNOLOGY',
      summary: 'Nuevos benchmarks confirman que los modelos de razonamiento profundo optimizan el diseño de microchips y reducen el coste de inferencia en más de un 60%.',
      content: 'Contenido del reporte tecnológico...',
      source: 'MIT Tech Review & Arxiv Daily',
      sentiment: 'NEUTRAL',
      tags: ['LLM', 'Inferencia', 'Hardware'],
      reportDate: new Date().toISOString(),
    }
  ]);

  // Carga asíncrona desde Supabase cuando esté conectado
  useEffect(() => {
    async function loadData() {
      try {
        const [accs, asts, crss, evts, rpts] = await Promise.all([
          fetchBankAccounts(),
          fetchPortfolioAssets(),
          fetchAcademicCourses(),
          fetchAcademicEvents(),
          fetchDailyReports()
        ]);
        if (accs.length > 0) setAccounts(accs);
        if (asts.length > 0) setAssets(asts);
        if (crss.length > 0) setCourses(crss);
        if (evts.length > 0) setEvents(evts);
        if (rpts.length > 0) setReports(rpts);
      } catch (err) {
        console.warn('Utilizando datos locales/demostración mientras se configuran las tablas de Supabase.');
      }
    }
    loadData();
  }, []);

  const financialSummary: FinancialSummary = computeFinancialSummary(accounts, assets);
  const academicProgress: AcademicProgress = computeAcademicProgress(courses);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header onOpenConfig={() => setIsConfigOpen(true)} />

      <div className="flex-1 flex flex-col md:flex-row">
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

        <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
          {/* VISTA GENERAL / OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Patrimonio Neto Total</p>
                    <p className="text-lg font-bold text-white">{formatCurrency(financialSummary.totalNetWorth)}</p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Cartera Invertida</p>
                    <p className="text-lg font-bold text-white">{formatCurrency(financialSummary.totalInvested)}</p>
                    <p className="text-[11px] text-emerald-400 font-medium">
                      P&L: {formatPercent(financialSummary.unrealizedPnLPercent)}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Créditos de Ingeniería</p>
                    <p className="text-lg font-bold text-white">{academicProgress.passedCredits} / 240 ECTS</p>
                    <p className="text-[11px] text-blue-400 font-medium">
                      {academicProgress.enrolledCredits} ECTS en curso
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Nota Media del Grado</p>
                    <p className="text-lg font-bold text-white">{academicProgress.averageGrade.toFixed(2)} / 10</p>
                    <p className="text-[11px] text-slate-400">Ponderada por créditos</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LiquidityCard accounts={accounts} totalLiquidity={financialSummary.totalLiquidity} />
                <AcademicTimeline events={events} />
              </div>

              <div>
                <PortfolioTable assets={assets} />
              </div>
            </div>
          )}

          {/* MÓDULO 1: CENTRO FINANCIERO */}
          {activeTab === 'finance' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-white">Centro Financiero</h2>
                  <p className="text-xs text-slate-400">Gestión de liquidez y cartera de activos diversificada</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Patrimonio Global:</span>
                  <span className="ml-2 font-bold text-emerald-400 text-sm">{formatCurrency(financialSummary.totalNetWorth)}</span>
                </div>
              </div>

              <LiquidityCard accounts={accounts} totalLiquidity={financialSummary.totalLiquidity} />
              <PortfolioTable assets={assets} />
            </div>
          )}

          {/* MÓDULO 2: PLANIFICADOR ACADÉMICO */}
          {activeTab === 'academic' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-white">Planificador Académico de Ingeniería</h2>
                  <p className="text-xs text-slate-400">Seguimiento de asignaturas, entregas y calendario anual</p>
                </div>
                <div className="text-xs text-slate-400">
                  Media actual: <strong className="text-white">{academicProgress.averageGrade.toFixed(2)}</strong>
                </div>
              </div>

              <AcademicTimeline events={events} />
              <CourseGrid courses={courses} />
            </div>
          )}

          {/* MÓDULO 3: INFORMES DIARIOS */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="pb-2 border-b border-slate-800">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-indigo-400" />
                  Informes Diarios de Mercados e Inteligencia Artificial
                </h2>
                <p className="text-xs text-slate-400">Actualizaciones matutinas automáticas leídas desde Supabase</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <SupabaseConfigModal 
        isOpen={isConfigOpen} 
        onClose={() => setIsConfigOpen(false)} 
      />
    </div>
  );
}
