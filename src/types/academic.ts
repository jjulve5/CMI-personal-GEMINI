/**
 * @file academic.ts
 * @description Tipos de dominio para el Planificador Académico de Ingeniería.
 */

export type CourseStatus = 'ENROLLED' | 'PASSED' | 'FAILED' | 'PENDING';
export type AcademicEventType = 'EXAM' | 'DELIVERY' | 'LAB' | 'PROJECT_DEFENSE';
export type EventStatus = 'PENDING' | 'SUBMITTED' | 'GRADED';

export interface AcademicCourse {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: number;
  academicYear: string;
  professor: string;
  status: CourseStatus;
  finalGrade?: number | null;
  colorHex: string;
}

export interface AcademicEvent {
  id: string;
  courseId: string;
  courseName?: string;
  courseColor?: string;
  title: string;
  eventType: AcademicEventType;
  dueDate: string;
  weightPercentage: number;
  status: EventStatus;
  grade?: number | null;
  notes?: string | null;
}

export interface AcademicProgress {
  totalCredits: number;
  passedCredits: number;
  enrolledCredits: number;
  averageGrade: number;
}
