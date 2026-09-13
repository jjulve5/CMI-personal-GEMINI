/**
 * @file reportsService.ts
 * @description Capa backend: Servicio de lectura de Informes Diarios de Mercados e IA desde Supabase.
 * Permite filtrar por categorías, obtener los últimos análisis e informes matutinos.
 */

import { getSupabaseClient } from '../lib/supabaseClient';
import type { DailyReport, ReportCategory } from '../types/reports';

// ==========================================
// SECCIÓN 1: LECTURA DE INFORMES DIARIOS
// ==========================================

export async function fetchDailyReports(category?: ReportCategory): Promise<DailyReport[]> {
  const client = getSupabaseClient();
  if (!client) {
    return [];
  }

  let query = client
    .from('daily_reports')
    .select('*')
    .order('report_date', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[reportsService] Error al obtener informes diarios:', error);
    throw error;
  }

  return (data || []).map((row) => ({
    id: row.id,
    title: row.title,
    category: row.category,
    summary: row.summary,
    content: row.content,
    source: row.source,
    sentiment: row.sentiment,
    tags: row.tags || [],
    reportDate: row.report_date,
  }));
}
