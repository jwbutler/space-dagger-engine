import { test, expect } from 'vitest';
import { Vector } from '../../../src/geometry/Vector';
import { accelerate } from '../../../src/entities/functions/accelerate';

test('accelerate', () => {
  let speed = { x: 3, y: 4 };
  const maxSpeed = 10;
  const entity = {
    getSpeed: () => speed,
    setSpeed: (value: Vector) => {
      speed = value;
    },
    getMaxSpeed: () => maxSpeed
  };
  const acceleration = { x: 3, y: 4 };
  accelerate(entity, acceleration, 1);
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
    getMaxSpeed: () => maxSpeed
  };
  const acceleration = { x: 4, y: 0 };
  accelerate(entity, acceleration, 1);
  expect(entity.getSpeed()).toEqual({ x: 3, y: 0 });
});

test('partial acceleration', () => {
  let speed = { x: 0, y: 1 };
  const entity = {
    getSpeed: () => speed,
    setSpeed: (value: Vector) => {
      speed = value;
    },
    getMaxSpeed: () => null
  };
  const acceleration = { x: 0, y: 4 };
  accelerate(entity, acceleration, 0.25);
  expect(entity.getSpeed()).toEqual({ x: 0, y: 2 });
});
