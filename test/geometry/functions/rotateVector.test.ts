import { describe, expect, test } from 'vitest';
import { rotateVector } from '../../../src/geometry/functions/rotateVector';
import { Angle } from '../../../src/geometry';
import { isWithinEpsilon } from '../../testUtils';

const epsilon = 0.00000001;
const sqrt_2 = 2 ** 0.5;

describe('rotateVector', () => {
  test('(1, 0), 0 to 90', () => {
    const actual = rotateVector({ x: 1, y: 0 }, Angle.ofDegrees(90));
    const expected = { x: 0, y: 1 };
    expect(isWithinEpsilon(actual.x, expected.x, epsilon)).toBe(true);
    expect(isWithinEpsilon(actual.y, expected.y, epsilon)).toBe(true);
  });
  test('(1, 0), 0 to 45', () => {
    const actual = rotateVector({ x: 1, y: 0 }, Angle.ofDegrees(45));
    const expected = { x: sqrt_2 / 2, y: sqrt_2 / 2 };
    expect(isWithinEpsilon(actual.x, expected.x, epsilon)).toBe(true);
    expect(isWithinEpsilon(actual.y, expected.y, epsilon)).toBe(true);
  });
  test('(40, 8), 0 to 45', () => {
    const actual = rotateVector({ x: 40, y: 8 }, Angle.ofDegrees(45));
    const expected = {
      x: (8 / sqrt_2 + 40 / sqrt_2) / 2,
      y: (8 / sqrt_2 + 40 / sqrt_2) / 2
    };
    console.log(`${JSON.stringify(actual)}`);
    expect(isWithinEpsilon(actual.x, expected.x, epsilon)).toBe(true);
    expect(isWithinEpsilon(actual.y, expected.y, epsilon)).toBe(true);
  });
});
