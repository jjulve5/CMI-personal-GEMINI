/**
 * @file formatters.ts
 * @description Funciones puras de utilidad para formateo monetario, porcentajes y fechas.
 */

export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercent(value: number): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function getDaysRemaining(dueDateString: string): number {
  const due = new Date(dueDateString).getTime();
  const now = new Date().getTime();
  return Math.ceil((due - now) / (1000 * 60 * 60 * 24));
}
