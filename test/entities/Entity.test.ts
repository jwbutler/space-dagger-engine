import { expect, describe, test, vi } from 'vitest';
import { Angle } from '../../src/geometry/Angle';
import { Coordinates } from '../../src/geometry/Coordinates';
import { Sprite } from '../../src/graphics/Sprite';
import { EntityBehavior } from '../../src/entities/behaviors/EntityBehavior';
import { EntityImpl } from '../../src/entities/EntityImpl';
import { Vector } from '../../src/geometry';
import { EntityScript } from '../../src/events';
import { Engine } from '../../src';

describe('Entity', () => {
  const sprite = {} as Sprite;
  const entity = new EntityImpl({
    angle: Angle.ofDegrees(0),
    centerCoordinates: Coordinates.zero(),
    name: 'test',
    sprite,
    friction: 0.5
  });

  test('init', () => {
    expect(entity.getId()).toBe('1');
    expect(entity.getName()).toBe('test');
    expect(entity.getSprite()).toBe(sprite);
    expect(entity.getCenterCoordinates()).toEqual(Coordinates.zero());
    expect(entity.getAngle()).toEqual(Angle.ofDegrees(0));
    expect(entity.getMaxSpeed()).toBe(null);
    expect(entity.getAcceleration()).toEqual(Vector.zero());
    expect(entity.getFriction()).toBe(0.5);
    expect(entity.getScripts()).toEqual([]);
    expect(entity.getBehaviors()).toEqual([]);
  });

  test('setAngle', () => {
    entity.setAngle(Angle.ofDegrees(15));
    expect(entity.getAngle()).toEqual(Angle.ofDegrees(15));
  });

  test('setMaxSpeed', () => {
    entity.setMaxSpeed(5);
    expect(entity.getMaxSpeed()).toBe(5);
  });

  test('setAcceleration', () => {
    const acceleration = { x: 2, y: 2 };
    entity.setAcceleration(acceleration);
    expect(entity.getAcceleration()).toEqual(acceleration);
  });

  test('setFriction', () => {
    entity.setFriction(0.2);
    expect(entity.getFriction()).toBe(0.2);
  });

  test('addScript', () => {
    const script = {
      init: () => {}
    } as EntityScript;
    entity.addScript(script);
    expect(entity.getScripts().length).toBe(1);
    expect(entity.getScripts()[0]).toBe(script);
  });

  test('addBehavior', () => {
    const behavior = {
      init: () => {}
    } as EntityBehavior;
    entity.addBehavior(behavior);
    expect(entity.getBehaviors().length).toBe(1);
    expect(entity.getBehaviors()).toEqual([behavior]);
  });

  test('setStringVariable', () => {
    entity.setStringVariable('one', '1');
    entity.setStringVariable('two', '2');
    expect(entity.getStringVariable('one')).toBe('1');
    expect(entity.getStringVariable('two')).toBe('2');
    entity.setStringVariable('one', null);
    expect(entity.getStringVariable('one')).toBe(null);
  });

  test('tags', () => {
    entity.addTag('a');
    expect(entity.getTags()).toEqual(new Set(['a']));
    expect(entity.hasTag('a')).toBe(true);
    expect(entity.hasTag('b')).toBe(false);
    entity.addTag('b');
    expect(entity.getTags()).toEqual(new Set(['a', 'b']));
    expect(entity.hasTag('a')).toBe(true);
    expect(entity.hasTag('b')).toBe(true);
  });

  test('init', () => {
    const engine = {} as Engine;
    const script_init_spy = vi.spyOn(entity.getScripts()[0], 'init');
    const behavior_init_spy = vi.spyOn(entity.getBehaviors()[0], 'init');
    expect(entity.isInitialized()).toBe(false);
    entity.init(engine);
    expect(entity.isInitialized()).toBe(true);
    expect(script_init_spy).toHaveBeenCalledWith(entity, { engine });
    expect(behavior_init_spy).toHaveBeenCalledWith(entity, { engine });
  });
});
