import { test, expect, describe } from 'vitest';
import { applyFriction } from '../../../src/entities/functions/applyFriction';
import { Entity } from '../../../src/entities';
import { Vector } from '../../../src/geometry';

describe('applyFriction', () => {
  test('dt=1', () => {
    let speed: Vector = { x: 1, y: 1 };
    const entity = {
      getFriction: () => 0.05,
      getSpeed: () => speed,
      setSpeed: (value: Vector) => {
        speed = value;
      }
    } as Entity;
    applyFriction(entity, 1);
    expect(entity.getSpeed()).toEqual({ x: 0.95, y: 0.95 });
  });

  test('dt=0.5 x 2', () => {
    let speed: Vector = { x: 1, y: 1 };
    const entity = {
      getFriction: () => 0.05,
      getSpeed: () => speed,
      setSpeed: (value: Vector) => {
        speed = value;
      }
    } as Entity;

    applyFriction(entity, 0.5);
    applyFriction(entity, 0.5);

    // TODO expect.extend...
    const epsilon = 0.0000001;
    expect(Math.abs(entity.getSpeed().x - 0.95)).toBeLessThan(epsilon);
    expect(Math.abs(entity.getSpeed().y - 0.95)).toBeLessThan(epsilon);
  });
});
