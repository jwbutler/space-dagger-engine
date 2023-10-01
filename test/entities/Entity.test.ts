import { test, expect } from 'vitest';
import { Entity } from '../../src/entities/Entity';
import { Angle } from '../../src/geometry/Angle';
import { Coordinates } from '../../src/geometry/Coordinates';
import { Sprite } from '../../src/graphics/Sprite';
import { EntityBehavior } from '../../src/entities/behaviors/EntityBehavior';

test('entity', () => {
  const sprite = {} as Sprite;
  const entity = Entity.create({
    angle: Angle.ofDegrees(0),
    centerCoordinates: Coordinates.zero(),
    name: 'test',
    sprite
  });

  expect(entity.getName()).toBe('test');
  expect(entity.getSprite()).toBe(sprite);
  expect(entity.getCenterCoordinates()).toEqual(Coordinates.zero());
  expect(entity.getAngle()).toEqual(Angle.ofDegrees(0));
  expect(entity.getMaxSpeed()).toBe(null);
  expect(entity.getScript()).toBe(null);
  expect(entity.getBehaviors()).toEqual([]);

  entity.setAngle(Angle.ofDegrees(15));
  expect(entity.getAngle()).toEqual(Angle.ofDegrees(15));

  entity.setMaxSpeed(5);
  expect(entity.getMaxSpeed()).toBe(5);

  const behavior = {} as EntityBehavior;
  entity.addBehavior(behavior);
  expect(entity.getBehaviors()).toEqual([behavior]);
});
