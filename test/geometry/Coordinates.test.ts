import { test, expect, describe } from 'vitest';
import { Coordinates } from '../../src/geometry/Coordinates';

describe('Coordinates', () => {
  test('plus', () => {
    const first = { x: 2, y: 4 };
    const second = { x: 1, y: 1 };
    const added = Coordinates.plus(first, second);
    expect(added).toEqual({ x: 3, y: 5 });
  });

  test('distance', () => {
    const first = { x: 2, y: 3 };
    const second = { x: 6, y: 0 };
    expect(Coordinates.distance(first, second)).toEqual(5);
  });
});
