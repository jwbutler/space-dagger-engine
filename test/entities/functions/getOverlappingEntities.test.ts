import { getOverlappingEntities } from '../../../src/entities/functions/getOverlappingEntities';
import { Scene } from '../../../src/core/Scene';
import { Coordinates } from '../../../src/geometry/Coordinates';
import { Entity } from '../../../src/entities/Entity';
import { Sprite } from '../../../src/graphics/Sprite';
import { Angle } from '../../../src/geometry/Angle';
import { Rect } from '../../../src/geometry';
import { test, expect, describe } from 'vitest';

describe('getOverlappingEntities', () => {
  const rect = { left: 10, top: 10, width: 20, height: 20 };
  const entity = {
    getCenterCoordinates: () => centerCoordinates,
    getAngle: () => Angle.ofDegrees(0),
    getSprite: () =>
      ({
        getCollisionPolygon: () => Rect.asPolygon(rect)
      }) as unknown as Sprite
  } as Entity;

  let centerCoordinates: Coordinates;
  const sprite = {
    getCollisionPolygon: () =>
      Rect.asPolygon({
        left: centerCoordinates.x - 10,
        top: centerCoordinates.y - 10,
        width: 20,
        height: 20
      })
  } as unknown as Sprite;
  const other = {
    getCenterCoordinates: () => centerCoordinates,
    getAngle: () => Angle.ofDegrees(0),
    getSprite: () => sprite
  } as Entity;
  const scene = {
    getEntities: () => [other]
  } as Partial<Scene> as Scene;

  test('center of rect', () => {
    centerCoordinates = { x: 20, y: 20 };
    const entities = getOverlappingEntities(entity, scene);
    expect(entities).toEqual([other]);
  });

  // TODO consider if "edge" means 39 or 40
  test('edge of rect', () => {
    centerCoordinates = { x: 39, y: 20 };
    const entities = getOverlappingEntities(entity, scene);
    expect(entities).toEqual([other]);
  });

  test('corner', () => {
    centerCoordinates = { x: 39, y: 39 };
    const entities = getOverlappingEntities(entity, scene);
    expect(entities).toEqual([other]);
  });

  test('outside', () => {
    centerCoordinates = { x: 41, y: 41 };
    const entities = getOverlappingEntities(entity, scene);
    expect(entities).toEqual([]);
  });
});
