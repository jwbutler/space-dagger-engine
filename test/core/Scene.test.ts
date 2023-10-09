import { test, expect, vi } from 'vitest';
import { Scene } from '../../src/core/Scene';
import { Camera } from '../../src/geometry/Camera';
import { Coordinates } from '../../src/geometry/Coordinates';
import { Dimensions } from '../../src/geometry/Dimensions';
import { Entity } from '../../src/entities/Entity';
import { Graphics } from '../../src/graphics/Graphics';
import { SceneImpl } from '../../src/core/SceneImpl';
import { Layer } from '../../src/core/Layer';

test('scene', () => {
  const camera = Camera.create({
    centerCoordinates: Coordinates.zero(),
    dimensions: Dimensions.allBalls()
  });
  const graphics = {} as Graphics;
  const layer = {} as Layer;
  const scene = new SceneImpl({
    name: 'test',
    layers: [layer],
    camera,
    dimensions: Dimensions.allBalls(),
    graphics
  });
  expect(scene.getName()).toBe('test');
  expect(scene.getLayers()).toEqual([layer]);
  expect(scene.getCamera()).toBe(camera);
  expect(scene.getDimensions()).toEqual(Dimensions.allBalls());
  expect(scene.getGraphics()).toBe(graphics);
});

test('factory method', () => {
  // I couldn't get module mocks to work, this sucks
  const documentMock = vi.stubGlobal('document', {
    createElement: () => ({
      getContext: () => ({})
    })
  });
  const camera = Camera.create({
    centerCoordinates: Coordinates.zero(),
    dimensions: Dimensions.allBalls()
  });
  const layer = {} as Layer;
  const scene = Scene.create({
    name: 'test',
    camera,
    dimensions: Dimensions.allBalls(),
    layers: [layer]
  });
  expect(scene.getName()).toBe('test');
  expect(scene.getLayers()).toEqual([layer]);
  expect(scene.getCamera()).toBe(camera);
  expect(scene.getDimensions()).toEqual(Dimensions.allBalls());

  documentMock.clearAllMocks();
});

test('entities', () => {
  const camera = Camera.create({
    centerCoordinates: Coordinates.zero(),
    dimensions: Dimensions.allBalls()
  });
  const layer = {} as Layer;
  const scene = new SceneImpl({
    name: 'test',
    layers: [layer],
    camera,
    dimensions: Dimensions.allBalls(),
    graphics: {} as Graphics
  });

  expect(scene.getEntities()).toEqual([]);
  const entity = {
    getId: () => 'test_id',
    getName: () => 'test'
  } as Entity;
  scene.addEntity(entity);
  expect(scene.getEntities()).toEqual([entity]);
  expect(scene.getEntitiesByName('test')).toEqual([entity]);
  expect(scene.getEntitiesByName('not')).toEqual([]);
  expect(scene.getEntityById('test_id')).toBe(entity);
  scene.removeEntity(entity);
  expect(scene.getEntities()).toEqual([]);
  expect(() => scene.removeEntity(entity)).toThrow();
  expect(scene.getEntityById('test_id')).toBe(null);
});
