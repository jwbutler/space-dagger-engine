import { test, expect, describe } from 'vitest';

import { Angle } from '../../src/geometry/Angle';

const EPSILON = 0.00001;

describe('Angle', () => {
  test('ofDegrees', () => {
    const angle = Angle.ofDegrees(45);
    expect(angle.degrees).toBe(45);
    expect(_isWithinEpsilon(angle.radians, Math.PI / 4, EPSILON)).toBe(true);
  });

  test('ofRadians', () => {
    const angle = Angle.ofRadians(Math.PI / 4);
    expect(angle.degrees).toBe(45);
    expect(_isWithinEpsilon(angle.radians, Math.PI / 4, EPSILON)).toBe(true);
  });

  test('rotateRight', () => {
    const angle = Angle.ofDegrees(30);
    expect(Angle.rotateClockwise(angle, Angle.ofDegrees(15)).degrees).toBe(45);
  });

  test('rotateLeft', () => {
    const angle = Angle.ofDegrees(90);
    expect(Angle.rotateCounterClockwise(angle, Angle.ofDegrees(45)).degrees).toBe(45);
  });

  test('between', () => {
    const first = { x: 1, y: 1 };
    const second = { x: 2, y: 2 };
    expect(Angle.between(first, second)).toEqual(Angle.ofDegrees(45));
  });

  test('clamp', () => {
    _expectIsWithinEpsilon(Angle.ofDegrees(45 + 360), Angle.ofDegrees(45));
    _expectIsWithinEpsilon(Angle.ofDegrees(45 - 360), Angle.ofDegrees(45));
    _expectIsWithinEpsilon(
      Angle.ofRadians(Math.PI / 4 + Math.PI * 2),
      Angle.ofRadians(Math.PI / 4)
    );
    _expectIsWithinEpsilon(
      Angle.ofRadians(Math.PI / 4 - Math.PI * 2),
      Angle.ofRadians(Math.PI / 4)
    );
  });
});

const _isWithinEpsilon = (value: number, expected: number, epsilon: number): boolean => {
  return Math.abs(value - expected) < epsilon;
};

const _expectIsWithinEpsilon = (value: Angle, expected: Angle): boolean => {
  return Math.abs(value.radians - expected.radians) < EPSILON;
};
