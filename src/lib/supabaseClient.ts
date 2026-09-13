/**
 * @file supabaseClient.ts
 * @description Inicialización del cliente oficial de Supabase con patrón Singleton.
 * Detecta si existen las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.
 * Si no están configuradas, proporciona un aviso claro para guiar al usuario sin que la app crashee.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.trim() !== '' && 
  supabaseAnonKey.trim() !== '' &&
  !supabaseUrl.includes('placeholder')
);

let clientInstance: SupabaseClient<Database> | null = null;

export function getSupabaseClient(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured) {
    return null;
  }
  if (!clientInstance) {
    clientInstance = createClient<Database>(supabaseUrl, supabaseAnonKey);
  }
  return clientInstance;
}

export const supabase = getSupabaseClient();
