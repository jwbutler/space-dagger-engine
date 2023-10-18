import { getEntitiesOverlappingRect } from '../../../src/entities/functions/getEntitiesOverlappingRect';
import { Scene } from '../../../src/core/Scene';
import { Coordinates } from '../../../src/geometry/Coordinates';
import { Entity } from '../../../src/entities/Entity';
import { Sprite } from '../../../src/graphics/Sprite';
import { Angle } from '../../../src/geometry/Angle';
import { test, expect } from 'vitest';

test('find overlapping entities', () => {
  const rect = { left: 10, top: 10, width: 20, height: 20 };
  let centerCoordinates: Coordinates;
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
    getAngle: () => Angle.ofDegrees(0),
    getSprite: () => sprite
  } as Entity;
  const scene = {
    getEntities: () => [entity]
  } as Partial<Scene> as Scene;

  // center of rect
  {
    centerCoordinates = { x: 20, y: 20 };
    const entities = getEntitiesOverlappingRect(rect, scene);
    expect(entities).toEqual([entity]);
  }

  // edge of rect
  // TODO consider if "edge" means 39 or 40
  {
    centerCoordinates = { x: 39, y: 20 };
    const entities = getEntitiesOverlappingRect(rect, scene);
    expect(entities).toEqual([entity]);
  }

  // corner
  {
    centerCoordinates = { x: 39, y: 39 };
    const entities = getEntitiesOverlappingRect(rect, scene);
    expect(entities).toEqual([entity]);
  }

  // outside
  {
    centerCoordinates = { x: 40, y: 40 };
    const entities = getEntitiesOverlappingRect(rect, scene);
    expect(entities).toEqual([]);
  }
});
