export const formatMillion = (value: string) => {
  const splittedNumber = value.split('.');
  return splittedNumber.length > 2
    ? splittedNumber.reduceRight(
        (next, current, i) =>
          `${current}${
            i === splittedNumber.length - 1
              ? ''
              : i % 2 === (splittedNumber.length % 2 === 0 ? 1 : 0)
              ? "'"
              : '.'
          }${next}`,
        '',
      )
    : value;
};

export const formatThousand = (value: string | number) => {
  const parsedValue = Number(value);
  if (Number.isNaN(parsedValue)) return null;
  const formattedNumber = Intl.NumberFormat('es-CO', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(parsedValue);
  return formatMillion(formattedNumber);
};

export const formatPrice = (value: string | number): string | null => {
  const parsedValue = Number(value);
  if (Number.isNaN(parsedValue)) return null;
  const formattedNumber = Intl.NumberFormat('es-CO', {
    currency: 'COP',
    style: 'currency',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(parsedValue);
  return formatMillion(formattedNumber);
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
