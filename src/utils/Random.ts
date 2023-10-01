export const randInt = (min: number, maxInclusive: number): number =>
  Math.floor(Math.random() * (maxInclusive - min + 1)) + min;

export const randFloat = (min: number, maxInclusive: number): number =>
  Math.random() * (maxInclusive - min) + min;
