import { test, expect } from 'vitest';
import { Keyboard } from '../../src/input/Keyboard';
import { Angle } from '../../src/geometry/Angle';
import { Sprite } from '../../src/graphics/Sprite';
import { Rect } from '../../src/geometry/Rect';
import { update } from '../../src/core/update';
import { Entity } from '../../src/entities/Entity';
import { Scene } from '../../src/core/Scene';

test('update', () => {
  const keyboard = Keyboard.create();
  const sprite = {
    getBoundingRect: () => Rect.allBalls()
  } as unknown as Sprite;
  let executedScript = false;
  let executedBehaviors = 0;
  const ship = Entity.create({
    name: 'ship',
    centerCoordinates: { x: 0, y: 0 },
    angle: Angle.ofDegrees(0),
    sprite,
    script: {
      update: () => {
        executedScript = true;
      }
    },
    behaviors: [0, 1, 2].map(() => ({
      update: () => {
        executedBehaviors++;
      }
    }))
  });
  ship.setSpeed({ x: 3, y: 4 });
  const scene = {
    getDimensions: () => ({ width: 1000, height: 1000 }),
    getEntities: () => [ship]
  } as Scene;
  update(scene, [], keyboard, 1);
  expect(ship.getCenterCoordinates()).toEqual({ x: 3, y: 4 });

  expect(executedScript).toBe(true);
  expect(executedBehaviors).toBe(3);
});
