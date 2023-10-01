import { test, expect } from 'vitest';
import { CameraFollowBehavior } from '../../../src/entities/behaviors/CameraFollowBehavior';
import { Camera } from '../../../src/geometry/Camera';
import { Keyboard } from '../../../src/input/Keyboard';
import { Entity } from '../../../src/entities/Entity';
import { Scene } from '../../../src/core/Scene';

test('camera follow behavior', () => {
  const camera = Camera.create({
    centerCoordinates: { x: 10, y: 10 },
    dimensions: { width: 100, height: 100 }
  });
  const scene = {
    getCamera: () => camera
  } as unknown as Scene;

  const entity = {
    getCenterCoordinates: () => ({ x: 20, y: 20 })
  } as Entity;

  const behavior = CameraFollowBehavior.create();
  behavior.update(entity, scene, {} as Keyboard, 1);
  expect(camera.getCenterCoordinates()).toEqual({ x: 20, y: 20 });
});
