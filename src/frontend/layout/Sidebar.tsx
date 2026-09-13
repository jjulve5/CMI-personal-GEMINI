/**
 * @file Sidebar.tsx
 * @description Menú de navegación principal para alternar entre Centro Financiero, Planificador e Informes.
 */

import React from 'react';
import { DollarSign, GraduationCap, Newspaper, LayoutDashboard } from 'lucide-react';

export type ActiveTab = 'overview' | 'finance' | 'academic' | 'reports';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'overview', label: 'Visión General', icon: LayoutDashboard },
    { id: 'finance', label: 'Centro Financiero', icon: DollarSign },
    { id: 'academic', label: 'Planificador Académico', icon: GraduationCap },
    { id: 'reports', label: 'Informes Diarios', icon: Newspaper },
  ];

  return (
    <nav className="w-full md:w-64 bg-slate-900/90 border-r border-slate-800 p-4 flex flex-row md:flex-col gap-1 overflow-x-auto">
      <div className="hidden md:block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Módulos
      </div>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all text-left whitespace-nowrap ${
              isActive
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
