import { test, expect, vi } from 'vitest';
import { Scene } from '../../src/core/Scene';
import { Camera } from '../../src/geometry/Camera';
import { Coordinates } from '../../src/geometry/Coordinates';
import { Dimensions } from '../../src/geometry/Dimensions';
import { Entity } from '../../src/entities/Entity';
import { Graphics } from '../../src/graphics/Graphics';
import { SceneImpl } from '../../src/core/SceneImpl';

test('scene', () => {
  const image = {} as unknown;
  const camera = Camera.create({
    centerCoordinates: Coordinates.zero(),
    dimensions: Dimensions.allBalls()
  });
  const props = {
    name: 'test',
    backgroundColor: 'red',
    backgroundImage: image,
    camera,
    dimensions: Dimensions.allBalls()
  };
  const graphics = {} as Graphics;
  const scene = new SceneImpl({ ...props, graphics });
  expect(scene.getName()).toBe('test');
  expect(scene.getBackgroundColor()).toBe('red');
  expect(scene.getBackgroundImage()).toBe(image);
  expect(scene.getCamera()).toBe(camera);
  expect(scene.getDimensions()).toEqual(Dimensions.allBalls());

  // I couldn't get module mocks to work, this sucks
  const documentMock = vi.stubGlobal('document', {
    createElement: () => ({
      getContext: () => ({})
    })
  });
  const sceneViaFactoryMethod = Scene.create(props);
  expect(sceneViaFactoryMethod.getName()).toBe('test');
  expect(sceneViaFactoryMethod.getBackgroundColor()).toBe('red');
  expect(sceneViaFactoryMethod.getBackgroundImage()).toBe(image);
  expect(sceneViaFactoryMethod.getCamera()).toBe(camera);
  expect(sceneViaFactoryMethod.getDimensions()).toEqual(Dimensions.allBalls());
  documentMock.clearAllMocks();
});

test('entities', () => {
  const image = {} as unknown;
  const camera = Camera.create({
    centerCoordinates: Coordinates.zero(),
    dimensions: Dimensions.allBalls()
  });
  const scene = new SceneImpl({
    name: 'test',
    backgroundColor: 'red',
    backgroundImage: image,
    camera,
    dimensions: Dimensions.allBalls(),
    graphics: {} as Graphics
  });

  expect(scene.getEntities()).toEqual([]);
  const entity = {} as Entity;
  scene.addEntity(entity);
  expect(scene.getEntities()).toEqual([entity]);
  scene.removeEntity(entity);
  expect(scene.getEntities()).toEqual([]);
  expect(() => scene.removeEntity(entity)).toThrow();
});
