import { ClampToSceneBehavior } from '../../../src/entities/behaviors/ClampToSceneBehavior';
import { Entity } from '../../../src/entities/Entity';
import { Scene } from '../../../src/core/Scene';
import { Coordinates } from '../../../src/geometry/Coordinates';
import { Sprite } from '../../../src/graphics/Sprite';
import { Angle } from '../../../src/geometry/Angle';
import { Engine } from '../../../src';
import { expect, test } from 'vitest';

test('clamp to scene', () => {
  const scene = {
    getDimensions: () => ({ width: 100, height: 100 })
  } as Partial<Scene> as Scene;

  let centerCoordinates = { x: -10, y: -10 };
  const sprite = {
    getBoundingRect: () => ({
      left: centerCoordinates.x - 10,
      top: centerCoordinates.y - 10,
      width: 20,
      height: 20
    })
  } as Partial<Sprite> as Sprite;
  const entity = {
    getCenterCoordinates: () => centerCoordinates,
    setCenterCoordinates: (coordinates: Coordinates) => {
      centerCoordinates = coordinates;
    },
    getSprite: () => sprite,
    getAngle: () => Angle.ofDegrees(0)
  } as Entity;

  const engine = {
    getScene: () => scene
  } as Engine;

  const behavior = ClampToSceneBehavior.create();
  behavior.onTick?.(entity, { engine, dt: 1 });
  expect(centerCoordinates).toEqual({ x: 10, y: 10 });
});
