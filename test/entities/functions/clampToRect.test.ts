import { clampToRect } from '../../../src/entities/functions/clampToRect';
import { Sprite } from '../../../src/graphics/Sprite';
import { Rect } from '../../../src/geometry/Rect';
import { Coordinates } from '../../../src/geometry/Coordinates';
import { Angle } from '../../../src/geometry/Angle';
import { Entity } from '../../../src/entities/Entity';
import { test, expect } from 'vitest';

test('clamp to rect', () => {
  let centerCoordinates: Coordinates;
  const sprite = {
    getBoundingRect: () => ({
      left: centerCoordinates.x,
      top: centerCoordinates.y,
      width: 1,
      height: 1
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

  {
    centerCoordinates = { x: 5, y: 5 };
    const rect: Rect = { left: 10, top: 10, width: 20, height: 10 };
    clampToRect(entity, rect);
    expect(centerCoordinates).toEqual({ x: 10, y: 10 });
  }

  {
    centerCoordinates = { x: 35, y: 25 };
    const rect: Rect = { left: 10, top: 10, width: 20, height: 10 };
    clampToRect(entity, rect);
    expect(centerCoordinates).toEqual({ x: 29, y: 19 });
  }
});
