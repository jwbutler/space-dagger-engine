import { expect, test, vi } from 'vitest';
import { Angle } from '../../src/geometry/Angle';
import { Sprite } from '../../src/graphics/Sprite';
import { Rect } from '../../src/geometry/Rect';
import { update } from '../../src/core/update';
import { Entity } from '../../src/entities/Entity';
import { Scene } from '../../src/core/Scene';
import { Engine, Layer } from '../../src';
import { CollisionHandler } from '../../src/core/CollisionHandler';
import { check } from '../../src/utils';
import { EntityScript, GlobalScript } from '../../src/events';

test('update', () => {
  const sprite = {
    getBoundingRect: () => Rect.allBalls()
  } as unknown as Sprite;
  const behaviors = [0, 1, 2].map(() => ({
    onTick: () => {}
  }));
  const entityScript = {
    onTick: () => {},
    onCollision: () => {}
  } as EntityScript;
  const layer = {} as Layer;
  const ship = Entity.create({
    name: 'ship',
    centerCoordinates: { x: 0, y: 0 },
    angle: Angle.ofDegrees(0),
    layer,
    sprite,
    script: entityScript,
    behaviors
  });
  ship.setSpeed({ x: 3, y: 4 });
  const scene = {
    getDimensions: () => ({ width: 1000, height: 1000 }),
    getEntities: () => [ship],
    getEntityById: (id: string): Entity => {
      check(id === ship.getId());
      return ship;
    }
  } as Scene;

  const entityScript_update_spy = vi.spyOn(entityScript, 'onTick');
  const entityScript_collision_spy = vi.spyOn(entityScript, 'onCollision');
  const behaviorSpies = behaviors.map(behavior => vi.spyOn(behavior, 'onTick'));

  const globalScript = {
    onTick: () => {}
  } as GlobalScript;
  const collisionHandler = {
    // this is, of course, invalid
    detectCollisions: () => [{ firstId: ship.getId(), secondId: ship.getId() }]
  } as CollisionHandler;

  const detectCollisions_spy = vi.spyOn(collisionHandler, 'detectCollisions');

  const engine = {
    getScene: () => scene,
    getGlobalScripts: () => [globalScript],
    getCollisionHandler: () => collisionHandler
  } as Partial<Engine> as Engine;

  const globalScript_onTick_spy = vi.spyOn(globalScript, 'onTick');
  const dt = 1;
  update(engine, dt);
  expect(detectCollisions_spy).toHaveBeenCalled();
  expect(ship.getCenterCoordinates()).toEqual({ x: 3, y: 4 });
  expect(globalScript_onTick_spy).toHaveBeenCalledWith({
    engine,
    dt
  });

  expect(entityScript_update_spy).toHaveBeenCalledWith(ship, { engine, dt });
  expect(entityScript_collision_spy).toHaveBeenCalledWith(ship, {
    other: ship,
    engine,
    dt
  });
  for (const behaviorSpy of behaviorSpies) {
    expect(behaviorSpy).toHaveBeenCalledWith(ship, { engine, dt });
  }

  // TODO: verify that applyAcceleration / updatePosition were called here

  vi.clearAllMocks();
});
