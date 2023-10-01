import { test, expect } from 'vitest';
import { Coordinates } from '../../src/geometry/Coordinates';

test('plus', () => {
  const first = { x: 2, y: 4 };
  const second = { x: 1, y: 1 };
  const added = Coordinates.plus(first, second);
  expect(added).toEqual({ x: 3, y: 5 });
});
