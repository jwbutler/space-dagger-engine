import { CameraFollowBehavior } from '../../../src/entities/behaviors/CameraFollowBehavior';
import { Camera } from '../../../src/geometry/Camera';
import { Entity } from '../../../src/entities/Entity';
import { Scene } from '../../../src/core/Scene';
import { Engine } from '../../../src';
import { test, expect } from 'vitest';

test('camera follow behavior', () => {
  const camera = Camera.create({
    centerCoordinates: { x: 10, y: 10 },
    dimensions: { width: 100, height: 100 }
  });
  const scene = {
    getCamera: () => camera
  } as unknown as Scene;

  const engine = {
    getCurrentScene: () => scene
  } as Engine;

  const entity = {
    getCenterCoordinates: () => ({ x: 20, y: 20 })
  } as Entity;

  const behavior = CameraFollowBehavior.create();
  behavior.onTick?.(entity, engine, { dt: 1 });
  expect(camera.getCenterCoordinates()).toEqual({ x: 20, y: 20 });
});
