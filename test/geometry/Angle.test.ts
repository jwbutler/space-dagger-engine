import { test, expect } from 'vitest';

import { Angle } from '../../src/geometry/Angle';

test('ofDegrees', () => {
  const angle = Angle.ofDegrees(45);
  expect(angle.degrees).toBe(45);
  expect(_isWithinEpsilon(angle.radians, Math.PI / 4, 0.00001)).toBe(true);
});

test('ofRadians', () => {
  const angle = Angle.ofRadians(Math.PI / 4);
  expect(angle.degrees).toBe(45);
  expect(_isWithinEpsilon(angle.radians, Math.PI / 4, 0.00001)).toBe(true);
});

test('rotateRight', () => {
  const angle = Angle.ofDegrees(30);
  expect(Angle.rotateClockwise(angle, Angle.ofDegrees(15)).degrees).toBe(45);
});

test('rotateLeft', () => {
  const angle = Angle.ofDegrees(90);
  expect(Angle.rotateCounterClockwise(angle, Angle.ofDegrees(45)).degrees).toBe(45);
});

const _isWithinEpsilon = (value: number, expected: number, epsilon: number): boolean => {
  return Math.abs(value - expected) < epsilon;
};
