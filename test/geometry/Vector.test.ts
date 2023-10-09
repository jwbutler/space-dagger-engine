import { test, expect } from 'vitest';
import { Vector } from '../../src/geometry/Vector';
import { Angle } from '../../src/geometry/Angle';

test('magnitude', () => {
  const vector = { x: 3, y: 4 };
  expect(Vector.magnitude(vector)).toBe(5);
});

test('fromAngle', () => {
  const angle = Angle.ofDegrees(45);
  const vector = Vector.fromAngle(angle, 1);
  const epsilon = 0.000001;
  const expected = Math.sqrt(2) / 2;
  // stupid little floating point errors
  expect(_isWithinEpsilon(vector.x, expected, epsilon));
  expect(_isWithinEpsilon(vector.y, expected, epsilon));
});

test('plus', () => {
  const first = { x: 2, y: 3 };
  const second = { x: 4, y: 5 };
  expect(Vector.plus(first, second)).toEqual({ x: 6, y: 8 });
});

test('multiply', () => {
  const vector = { x: 2, y: 3 };
  expect(Vector.multiply(vector, 2)).toEqual({ x: 4, y: 6 });
});

test('zero', () => {
  const zero = Vector.zero();
  expect(zero.x === 0);
  expect(zero.y === 0);
});

test('withMagnitude', () => {
  const vector = { x: 6, y: 8 };
  expect(Vector.withMagnitude(vector, 5)).toEqual({ x: 3, y: 4 });
});

test('withMagnitude, zero vector', () => {
  const vector = { x: 0, y: 0 };
  expect(Vector.withMagnitude(vector, 5)).toEqual(vector);
});

const _isWithinEpsilon = (value: number, expected: number, epsilon: number): boolean => {
  return Math.abs(value - expected) < epsilon;
};
