import { expect, test, vi } from 'vitest';
import { Keyboard } from '../../src/input/Keyboard';
import { Angle } from '../../src/geometry/Angle';
import { Sprite } from '../../src/graphics/Sprite';
import { Rect } from '../../src/geometry/Rect';
import { update } from '../../src/core/update';
import { Entity } from '../../src/entities/Entity';
import { Scene } from '../../src/core/Scene';
import { GlobalScript } from '../../src';

test('update', () => {
  const keyboard = Keyboard.create();
  const sprite = {
    getBoundingRect: () => Rect.allBalls()
  } as unknown as Sprite;
  const behaviors = [0, 1, 2].map(() => ({
    update: () => {}
  }));
  const entityScript = {
    update: () => {}
  };
  const ship = Entity.create({
    name: 'ship',
    centerCoordinates: { x: 0, y: 0 },
    angle: Angle.ofDegrees(0),
    sprite,
    script: entityScript,
    behaviors
  });
  ship.setSpeed({ x: 3, y: 4 });
  const scene = {
    getDimensions: () => ({ width: 1000, height: 1000 }),
    getEntities: () => [ship]
  } as Scene;

  const entityScript_update_spy = vi.spyOn(entityScript, 'update');
  const behaviorSpies = behaviors.map(behavior => vi.spyOn(behavior, 'update'));

  const globalScript = {
    onTick: () => {}
  } as GlobalScript;
  const globalScript_onTick_spy = vi.spyOn(globalScript, 'onTick');
  const dt = 1;
  update(scene, [globalScript], keyboard, dt);
  expect(ship.getCenterCoordinates()).toEqual({ x: 3, y: 4 });
  expect(globalScript_onTick_spy).toHaveBeenCalledWith({
    scene,
    keyboard,
    dt
  });

  expect(entityScript_update_spy).toHaveBeenCalledWith(ship, scene, keyboard, dt);
  for (const behaviorSpy of behaviorSpies) {
    expect(behaviorSpy).toHaveBeenCalledWith(ship, scene, keyboard, dt);
  }
});
