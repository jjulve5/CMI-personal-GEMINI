/**
 * @file SupabaseConfigModal.tsx
 * @description Modal informativo para guiar al usuario sobre la configuración de variables de entorno y tablas.
 */

import React from 'react';
import { X, KeyRound, ExternalLink, Terminal } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabaseClient';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 shadow-2xl relative text-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Conexión a Supabase</h3>
            <p className="text-xs text-slate-400">Estado de la configuración de la base de datos</p>
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <div className={`p-3.5 rounded-lg border text-xs font-mono ${
            isSupabaseConfigured 
              ? 'bg-emerald-950/30 border-emerald-800 text-emerald-300'
              : 'bg-amber-950/30 border-amber-800 text-amber-300'
          }`}>
            Estado actual: {isSupabaseConfigured ? '🟢 Conectado con Supabase' : '🟡 Variables no detectadas (Modo Demostración / Mock activo)'}
          </div>

          <p className="text-slate-300 text-xs leading-relaxed">
            Para enlazar con tu proyecto real de Supabase, añade las credenciales a tu archivo <code className="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded">.env</code> o en la configuración de entorno:
          </p>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
            <p className="text-slate-400"># Tu proyecto en Supabase</p>
            <p>VITE_SUPABASE_URL="https://tu-id.supabase.co"</p>
            <p>VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsIn..."</p>
          </div>

          <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-slate-500" />
              Fase 2 creará el SQL correspondiente.
            </span>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              Dashboard Supabase <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
