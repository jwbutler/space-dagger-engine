import { test, expect } from 'vitest';
import { Camera } from '../../src/geometry/Camera';

test('camera', () => {
  const centerCoordinates = { x: 20, y: 20 };
  const dimensions = { width: 20, height: 20 };
  const camera = Camera.create({
    centerCoordinates,
    dimensions
  });
  expect(camera.getCenterCoordinates()).toEqual(centerCoordinates);
  expect(camera.getRect()).toEqual({
    left: 10,
    top: 10,
    width: 20,
    height: 20
  });
  camera.setCenterCoordinates({ x: 21, y: 21 });
  expect(camera.getCenterCoordinates()).toEqual({ x: 21, y: 21 });
  expect(camera.getRect()).toEqual({
    left: 11,
    top: 11,
    width: 20,
    height: 20
  });
});
