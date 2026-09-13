/**
 * @file CourseGrid.tsx
 * @description Cuadrícula de asignaturas del grado en Ingeniería y seguimiento de notas.
 */

import React from 'react';
import { BookOpen, CheckCircle2, Clock } from 'lucide-react';
import type { AcademicCourse } from '../../types/academic';

interface CourseGridProps {
  courses: AcademicCourse[];
}

export const CourseGrid: React.FC<CourseGridProps> = ({ courses }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Asignaturas de Ingeniería</h3>
            <p className="text-xs text-slate-400">Plan de estudios universitario</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {courses.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 col-span-full text-center">
            No hay asignaturas registradas en el plan de estudios.
          </p>
        ) : (
          courses.map((course) => {
            const isPassed = course.status === 'PASSED';
            return (
              <div
                key={course.id}
                className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3.5 flex flex-col justify-between relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: course.colorHex || '#3b82f6' }}
                />
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-medium text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                      {course.code}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {course.credits} ECTS • Sem. {course.semester}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-100 line-clamp-1">{course.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Prof: {course.professor}</p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                    isPassed ? 'text-emerald-400' : 'text-blue-400'
                  }`}>
                    {isPassed ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {isPassed ? 'Superada' : 'Matriculado'}
                  </span>
                  {course.finalGrade !== null && course.finalGrade !== undefined && (
                    <span className="font-bold text-slate-100 bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                      Nota: {course.finalGrade.toFixed(1)}
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
