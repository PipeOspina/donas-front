export const calculateNitDV = (nit: string | number) => {
  if (Number.isNaN(Number(nit))) return null;
  const nitString = nit.toString();
  if (nitString.length > 15) return null;
  const nitNumber = nitString.padStart(15, '0').split('');
  const nitSeries = [71, 67, 59, 53, 47, 43, 41, 37, 29, 23, 19, 17, 13, 7, 3];

  const sum = nitSeries.reduce((prev, serie, i) => {
    const nitDigitNumber = Number(nitNumber[i]);
    return prev + nitDigitNumber * serie;
  }, 0);

  return 11 - (sum % 11);
};
