/**
 * @file Header.tsx
 * @description Barra superior con indicador de conexión a Supabase y fecha actual.
 */

import React from 'react';
import { Database, ShieldCheck, ShieldAlert, Sparkles } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabaseClient';

interface HeaderProps {
  onOpenConfig: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConfig }) => {
  const todayStr = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Panel de Control Personal</h1>
        </div>
        <p className="text-xs text-slate-400 mt-1 capitalize">{todayStr}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onOpenConfig}
          className={`px-3 py-1.5 rounded-md text-xs font-medium border flex items-center gap-2 transition-colors ${
            isSupabaseConfigured
              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60 hover:bg-emerald-900/50'
              : 'bg-amber-950/40 text-amber-300 border-amber-800/60 hover:bg-amber-900/50'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Supabase:</span>
          {isSupabaseConfigured ? (
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Conectado
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Configurar Credenciales
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
