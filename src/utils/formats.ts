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

export const capitalize = (value: string): string => {
  const valueArr = value.split(' ');

  return valueArr.reduce(
    (prev, current, i) =>
      `${prev}${current[0]?.toUpperCase() ?? ''}${current.substring(1)}${
        i === valueArr.length - 1 ? '' : ' '
      }`,
    '',
  );
};
