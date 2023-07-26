export function formatCurrency(amount?: number | string | null): string {
  if (!amount) return ''

  const value = typeof amount === 'number' ? amount : Number(amount)

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value)
}
