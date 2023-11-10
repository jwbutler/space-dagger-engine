import { Scene } from '../../../src/core/Scene';
import { Entity } from '../../../src/entities/Entity';
import { Vector } from '../../../src/geometry/Vector';
import { BounceOffEdgesBehavior } from '../../../src/entities/behaviors/BounceOffEdgesBehavior';
import { Sprite } from '../../../src/graphics/Sprite';
import { Angle } from '../../../src/geometry/Angle';
import { Coordinates } from '../../../src/geometry/Coordinates';
import { Engine } from '../../../src';
import { expect, test, describe } from 'vitest';

describe('BounceOffEdgesBehavior', () => {
  const scene = {
    getDimensions: () => ({ width: 200, height: 200 })
  } as Scene;

  let speed: Vector;
  let centerCoordinates: Coordinates;
  const sprite = {
    getBoundingRect: () => ({
      left: centerCoordinates.x - 10,
      top: centerCoordinates.y - 10,
      width: 20,
      height: 20
    })
  } as unknown as Sprite;
  const entity = {
    getCenterCoordinates: () => centerCoordinates,
    setCenterCoordinates: (value: Coordinates) => {
      centerCoordinates = value;
    },
    getAngle: () => Angle.ofDegrees(0),
    getSpeed: () => speed,
    setSpeed: (value: Vector): void => {
      speed = value;
    },
    getSprite: () => sprite
  } as Entity;

  const engine = {
    getCurrentScene: () => scene
  } as unknown as Engine;
  const behavior = BounceOffEdgesBehavior.create({ coefficient: 1 });

  test('right', () => {
    centerCoordinates = { x: 200, y: 100 };
    speed = { x: 1, y: 0 };
    behavior.onTick?.(entity, engine, { dt: 1 });
    expect(speed).toEqual({ x: -1, y: 0 });
    expect(centerCoordinates).toEqual({ x: 190, y: 100 });
  });

  test('left', () => {
    centerCoordinates = { x: 0, y: 100 };
    speed = { x: -1, y: 0 };
    behavior.onTick?.(entity, engine, { dt: 1 });
    expect(speed).toEqual({ x: 1, y: 0 });
    expect(centerCoordinates).toEqual({ x: 10, y: 100 });
  });

  test('top', () => {
    centerCoordinates = { x: 100, y: 0 };
    speed = { x: 0, y: -1 };
    behavior.onTick?.(entity, engine, { dt: 1 });
    expect(speed).toEqual({ x: 0, y: 1 });
    expect(centerCoordinates).toEqual({ x: 100, y: 10 });
  });

  test('bottom', () => {
    centerCoordinates = { x: 100, y: 200 };
    speed = { x: 0, y: 1 };
    behavior.onTick?.(entity, engine, { dt: 1 });
    expect(speed).toEqual({ x: 0, y: -1 });
    expect(centerCoordinates).toEqual({ x: 100, y: 190 });
  });
});
