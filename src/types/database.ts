/**
 * @file database.ts
 * @description Contratos de esquemas de datos SQL en TypeScript.
 * Refleja fielmente las tablas de Supabase para Finanzas, Estudios Universitarios e Informes Diarios.
 */

export interface Database {
  public: {
    Tables: {
      // Módulo 1: Centro Financiero
      bank_accounts: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          account_type: 'CHECKING' | 'SAVINGS' | 'INVESTMENT_CASH';
          currency: string;
          balance: number;
          institution: string;
          updated_at: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bank_accounts']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['bank_accounts']['Insert']>;
      };
      portfolio_assets: {
        Row: {
          id: string;
          user_id: string;
          symbol: string;
          name: string;
          asset_type: 'STOCK' | 'ETF' | 'CRYPTO' | 'PRECIOUS_METAL';
          quantity: number;
          purchase_price_avg: number;
          current_price: number;
          currency: string;
          platform: string;
          updated_at: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['portfolio_assets']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['portfolio_assets']['Insert']>;
      };
      financial_transactions: {
        Row: {
          id: string;
          user_id: string;
          account_id?: string | null;
          asset_id?: string | null;
          type: 'DEPOSIT' | 'WITHDRAWAL' | 'BUY' | 'SELL' | 'DIVIDEND';
          amount: number;
          currency: string;
          description: string;
          transaction_date: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['financial_transactions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['financial_transactions']['Insert']>;
      };

      // Módulo 2: Planificador Académico (Ingeniería)
      academic_courses: {
        Row: {
          id: string;
          user_id: string;
          code: string;
          name: string;
          credits: number;
          semester: number;
          academic_year: string;
          professor: string;
          status: 'ENROLLED' | 'PASSED' | 'FAILED' | 'PENDING';
          final_grade?: number | null;
          color_hex: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['academic_courses']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['academic_courses']['Insert']>;
      };
      academic_events: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          title: string;
          event_type: 'EXAM' | 'DELIVERY' | 'LAB' | 'PROJECT_DEFENSE';
          due_date: string;
          weight_percentage: number;
          status: 'PENDING' | 'SUBMITTED' | 'GRADED';
          grade?: number | null;
          notes?: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['academic_events']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['academic_events']['Insert']>;
      };

      // Módulo 3: Informes Diarios (Mercados e IA)
      daily_reports: {
        Row: {
          id: string;
          title: string;
          category: 'FINANCIAL_MARKET' | 'AI_TECHNOLOGY' | 'MACROECONOMY';
          summary: string;
          content: string;
          source: string;
          sentiment?: 'BULLISH' | 'BEARISH' | 'NEUTRAL' | null;
          tags: string[];
          report_date: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['daily_reports']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['daily_reports']['Insert']>;
      };
    };
  };
}
