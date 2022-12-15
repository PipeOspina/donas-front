export const formatPrice = (value: string | number): string | null => {
  const parsedValue = Number(value);
  if (Number.isNaN(parsedValue)) return null;
  return Intl.NumberFormat('es-CO', {
    currency: 'COP',
    style: 'currency',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(parsedValue);
};
