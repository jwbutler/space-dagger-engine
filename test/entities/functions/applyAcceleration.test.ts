import { test, expect } from 'vitest';
import { Vector } from '../../../src/geometry/Vector';
import { applyAcceleration } from '../../../src/entities/functions/applyAcceleration';
import { Entity } from '../../../src/entities';

test('accelerate', () => {
  let speed = { x: 3, y: 4 };
  const maxSpeed = 10;
  const entity = {
    getSpeed: () => speed,
    setSpeed: (value: Vector) => {
      speed = value;
    },
    getMaxSpeed: () => maxSpeed,
    getAcceleration: () => ({ x: 3, y: 4 })
  } as Entity;
  applyAcceleration(entity, 1);
  expect(entity.getSpeed()).toEqual({ x: 6, y: 8 });
});

test('accelerate, limiting max speed', () => {
  let speed = { x: 1, y: 0 };
  const maxSpeed = 3;
  const entity = {
    getSpeed: () => speed,
    setSpeed: (value: Vector) => {
      speed = value;
    },
    getMaxSpeed: () => maxSpeed,
    getAcceleration: () => ({ x: 4, y: 0 })
  } as Entity;
  applyAcceleration(entity, 1);
  expect(entity.getSpeed()).toEqual({ x: 3, y: 0 });
});

test('partial acceleration', () => {
  let speed = { x: 0, y: 1 };
  const entity = {
    getSpeed: () => speed,
    setSpeed: (value: Vector) => {
      speed = value;
    },
    getMaxSpeed: () => null,
    getAcceleration: () => ({ x: 0, y: 4 })
  } as Entity;
  applyAcceleration(entity, 0.25);
  expect(entity.getSpeed()).toEqual({ x: 0, y: 2 });
});
