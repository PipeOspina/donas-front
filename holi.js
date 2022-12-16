const nit = '99999'.split('');

const [odd, even] = nit.reduce(
  (prev, current, i) => {
    const number = Number(current);
    if (i % 2) return [prev[0] + number, prev[1]];
    return [prev[0], prev[1] + number];
  },
  [0, 0],
);

const res = Number.parseInt((odd * 3 + even) / 10) + 1;

console.log('myRes:', res);
