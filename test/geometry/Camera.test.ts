import { Camera } from '../../src/geometry/Camera';
import { test, expect, describe } from 'vitest';

describe('Camera', () => {
  const centerCoordinates = { x: 20, y: 20 };
  const dimensions = { width: 20, height: 20 };
  const camera = Camera.create({
    centerCoordinates,
    dimensions
  });

  test('init', () => {
    expect(camera.getCenterCoordinates()).toEqual(centerCoordinates);
    expect(camera.getDimensions()).toEqual(dimensions);
    expect(camera.getRect()).toEqual({
      left: 10,
      top: 10,
      width: 20,
      height: 20
    });
  });

  test('setCoordinates', () => {
    camera.setCenterCoordinates({ x: 21, y: 21 });
    expect(camera.getCenterCoordinates()).toEqual({ x: 21, y: 21 });
    expect(camera.getRect()).toEqual({
      left: 11,
      top: 11,
      width: 20,
      height: 20
    });
  });

  test('setDimensions', () => {
    camera.setDimensions({ width: 30, height: 10 });
    expect(camera.getDimensions()).toEqual({ width: 30, height: 10 });
    expect(camera.getRect()).toEqual({
      left: 6,
      top: 16,
      width: 30,
      height: 10
    });
  });
});
