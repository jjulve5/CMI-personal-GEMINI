/**
 * @file academicService.ts
 * @description Capa backend: Consultas y mutaciones de Supabase para la carrera universitaria de ingeniería.
 * Gestiona asignaturas, cálculo de promedio ponderado, eventos de calendario y fechas límite de exámenes.
 */

import { getSupabaseClient } from '../lib/supabaseClient';
import type { AcademicCourse, AcademicEvent, AcademicProgress } from '../types/academic';

// ==========================================
// SECCIÓN 1: ASIGNATURAS Y CRÉDITOS
// ==========================================

export async function fetchAcademicCourses(): Promise<AcademicCourse[]> {
  const client = getSupabaseClient();
  if (!client) {
    return [];
  }

  const { data, error } = await client
    .from('academic_courses')
    .select('*')
    .order('semester', { ascending: true });

  if (error) {
    console.error('[academicService] Error al obtener asignaturas:', error);
    throw error;
  }

  return (data || []).map((row) => ({
    id: row.id,
    code: row.code,
    name: row.name,
    credits: row.credits,
    semester: row.semester,
    academicYear: row.academic_year,
    professor: row.professor,
    status: row.status,
    finalGrade: row.final_grade !== null ? Number(row.final_grade) : null,
    colorHex: row.color_hex,
  }));
}

// ==========================================
// SECCIÓN 2: EVENTOS, ENTREGAS Y EXÁMENES
// ==========================================

export async function fetchAcademicEvents(): Promise<AcademicEvent[]> {
  const client = getSupabaseClient();
  if (!client) {
    return [];
  }

  const { data, error } = await client
    .from('academic_events')
    .select(`
      *,
      academic_courses (
        name,
        color_hex
      )
    `)
    .order('due_date', { ascending: true });

  if (error) {
    console.error('[academicService] Error al obtener eventos académicos:', error);
    throw error;
  }

  return (data || []).map((row) => {
    // Supabase join handling
    const course = Array.isArray(row.academic_courses) 
      ? row.academic_courses[0] 
      : row.academic_courses;

    return {
      id: row.id,
      courseId: row.course_id,
      courseName: course?.name || 'Asignatura',
      courseColor: course?.color_hex || '#3b82f6',
      title: row.title,
      eventType: row.event_type,
      dueDate: row.due_date,
      weightPercentage: Number(row.weight_percentage),
      status: row.status,
      grade: row.grade !== null ? Number(row.grade) : null,
      notes: row.notes,
    };
  });
}

// ==========================================
// SECCIÓN 3: CÁLCULO DE PROGRESO DE LA CARRERA
// ==========================================

export function computeAcademicProgress(courses: AcademicCourse[]): AcademicProgress {
  const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);
  const passedCourses = courses.filter((c) => c.status === 'PASSED');
  const passedCredits = passedCourses.reduce((acc, c) => acc + c.credits, 0);
  const enrolledCredits = courses
    .filter((c) => c.status === 'ENROLLED')
    .reduce((acc, c) => acc + c.credits, 0);

  const gradedCourses = passedCourses.filter((c) => typeof c.finalGrade === 'number' && c.finalGrade !== null);
  const totalWeightedGrade = gradedCourses.reduce((acc, c) => acc + (c.finalGrade! * c.credits), 0);
  const totalGradedCredits = gradedCourses.reduce((acc, c) => acc + c.credits, 0);

  const averageGrade = totalGradedCredits > 0 ? totalWeightedGrade / totalGradedCredits : 0;

  return {
    totalCredits,
    passedCredits,
    enrolledCredits,
    averageGrade,
  };
}
