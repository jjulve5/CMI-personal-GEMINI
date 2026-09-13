/**
 * @file AcademicTimeline.tsx
 * @description Cronograma de fechas límite, entregas de prácticas y exámenes de ingeniería.
 */

import React from 'react';
import { Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import type { AcademicEvent } from '../../types/academic';
import { formatDate, getDaysRemaining } from '../../lib/formatters';

interface AcademicTimelineProps {
  events: AcademicEvent[];
}

export const AcademicTimeline: React.FC<AcademicTimelineProps> = ({ events }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Cronograma y Exámenes</h3>
            <p className="text-xs text-slate-400">Próximos hitos, entregas de laboratorios y controles</p>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {events.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">No hay eventos ni exámenes programados.</p>
        ) : (
          events.map((event) => {
            const daysLeft = getDaysRemaining(event.dueDate);
            const isUrgent = daysLeft >= 0 && daysLeft <= 7;
            const isPassed = daysLeft < 0;

            return (
              <div
                key={event.id}
                className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: event.courseColor || '#6366f1' }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-100">{event.title}</span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                        {event.eventType}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      {event.courseName} • Ponderación: {event.weightPercentage}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pl-5 sm:pl-0">
                  <span className="text-slate-400 font-mono text-[11px]">{formatDate(event.dueDate)}</span>
                  {isPassed ? (
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-500" /> Pasado
                    </span>
                  ) : (
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded flex items-center gap-1 ${
                      isUrgent ? 'bg-rose-950/60 text-rose-300 border border-rose-800/40' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {isUrgent && <AlertCircle className="w-3 h-3 text-rose-400" />}
                      {daysLeft === 0 ? '¡Hoy!' : daysLeft === 1 ? 'Mañana' : `En ${daysLeft} días`}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
