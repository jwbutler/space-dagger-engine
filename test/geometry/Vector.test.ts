import { Vector } from '../../src/geometry/Vector';
import { Angle } from '../../src/geometry/Angle';
import { Entity } from '../../src/entities';
import { test, expect, describe } from 'vitest';

const epsilon = 0.000001;

describe('Vector', () => {
  test('magnitude', () => {
    const vector = { x: 3, y: 4 };
    expect(Vector.magnitude(vector)).toBe(5);
  });

  test('fromAngle', () => {
    const angle = Angle.ofDegrees(45);
    const vector = Vector.fromAngle(angle, 1);
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

  test('rotate', () => {
    const vector = { x: 1, y: 2 };
    const actual = Vector.rotate(vector, Angle.ofDegrees(90));
    const expected = { x: -2, y: 1 };
    // stupid little floating point errors
    expect(_isWithinEpsilon(actual.x, expected.x, epsilon));
    expect(_isWithinEpsilon(actual.y, actual.y, epsilon));
  });

  test('between', () => {
    expect(Vector.between({ x: 1, y: 2 }, { x: 10, y: 10 })).toEqual({ x: 9, y: 8 });
  });

  test('betweenEntities', () => {
    const first = {
      getCenterCoordinates: () => ({ x: 1, y: 2 })
    } as Entity;
    const second = {
      getCenterCoordinates: () => ({ x: 10, y: 10 })
    } as Entity;
    expect(Vector.betweenEntities(first, second)).toEqual({ x: 9, y: 8 });
  });
});

const _isWithinEpsilon = (value: number, expected: number, epsilon: number): boolean => {
  return Math.abs(value - expected) < epsilon;
};
