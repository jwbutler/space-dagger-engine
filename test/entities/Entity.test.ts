import { expect, test } from 'vitest';
import { Angle } from '../../src/geometry/Angle';
import { Coordinates } from '../../src/geometry/Coordinates';
import { Sprite } from '../../src/graphics/Sprite';
import { EntityBehavior } from '../../src/entities/behaviors/EntityBehavior';
import { EntityImpl } from '../../src/entities/EntityImpl';
import { Vector } from '../../src/geometry';

test('entity', () => {
  const sprite = {} as Sprite;
  const entity = new EntityImpl({
    angle: Angle.ofDegrees(0),
    centerCoordinates: Coordinates.zero(),
    name: 'test',
    sprite,
    friction: 0.5
  });

  expect(entity.getId()).toBe('1');
  expect(entity.getName()).toBe('test');
  expect(entity.getSprite()).toBe(sprite);
  expect(entity.getCenterCoordinates()).toEqual(Coordinates.zero());
  expect(entity.getAngle()).toEqual(Angle.ofDegrees(0));
  expect(entity.getMaxSpeed()).toBe(null);
  expect(entity.getAcceleration()).toEqual(Vector.zero());
  expect(entity.getFriction()).toBe(0.5);
  expect(entity.getScript()).toBe(null);
  expect(entity.getBehaviors()).toEqual([]);

  entity.setAngle(Angle.ofDegrees(15));
  expect(entity.getAngle()).toEqual(Angle.ofDegrees(15));

  entity.setMaxSpeed(5);
  expect(entity.getMaxSpeed()).toBe(5);

  const acceleration = { x: 2, y: 2 };
  entity.setAcceleration(acceleration);
  expect(entity.getAcceleration()).toEqual(acceleration);

  entity.setFriction(0.2);
  expect(entity.getFriction()).toBe(0.2);

  const behavior = {} as EntityBehavior;
  entity.addBehavior(behavior);
  expect(entity.getBehaviors()).toEqual([behavior]);

  entity.setStringVariable('one', '1');
  entity.setStringVariable('two', '2');
  expect(entity.getStringVariable('one')).toBe('1');
  expect(entity.getStringVariable('two')).toBe('2');
  entity.setStringVariable('one', null);
  expect(entity.getStringVariable('one')).toBe(null);
});
