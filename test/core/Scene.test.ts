import { test, expect } from 'vitest';
import { Scene } from '../../src/core/Scene';
import { Camera } from '../../src/geometry/Camera';
import { Coordinates } from '../../src/geometry/Coordinates';
import { Dimensions } from '../../src/geometry/Dimensions';
import { Entity } from '../../src/entities/Entity';
import { Graphics } from '../../src/graphics/Graphics';

test('scene', () => {
  const image = {} as unknown;
  const camera = Camera.create({
    centerCoordinates: Coordinates.zero(),
    dimensions: Dimensions.allBalls()
  });
  const scene = Scene.create({
    backgroundColor: 'red',
    backgroundImage: image,
    camera,
    dimensions: Dimensions.allBalls(),
    viewport: {} as Graphics,
    buffer: {} as Graphics
  });
  expect(scene.getBackgroundColor()).toBe('red');
  expect(scene.getBackgroundImage()).toBe(image);
  expect(scene.getCamera()).toBe(camera);
  expect(scene.getDimensions()).toEqual(Dimensions.allBalls());
});

test('entities', () => {
  const image = {} as unknown;
  const camera = Camera.create({
    centerCoordinates: Coordinates.zero(),
    dimensions: Dimensions.allBalls()
  });
  const scene = Scene.create({
    backgroundColor: 'red',
    backgroundImage: image,
    camera,
    dimensions: Dimensions.allBalls(),
    viewport: {} as Graphics,
    buffer: {} as Graphics
  });

  expect(scene.getEntities()).toEqual([]);
  const entity = {} as Entity;
  scene.addEntity(entity);
  expect(scene.getEntities()).toEqual([entity]);
  scene.removeEntity(entity);
  expect(scene.getEntities()).toEqual([]);
  expect(() => scene.removeEntity(entity)).toThrow();
});
