export const isWithinEpsilon = (
  value: number,
  expected: number,
  epsilon: number
): boolean => {
  return Math.abs(value - expected) < epsilon;
};
