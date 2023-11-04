import { Scene } from '../../src/core/Scene';
import { Camera } from '../../src/geometry/Camera';
import { Coordinates } from '../../src/geometry/Coordinates';
import { Dimensions } from '../../src/geometry/Dimensions';
import { Graphics } from '../../src/graphics/Graphics';
import { SceneImpl } from '../../src/core/SceneImpl';
import { EntityImpl } from '../../src/entities/EntityImpl';
import { Element } from '../../src/graphics/ui/Element';
import { describe, expect, test, vi } from 'vitest';

test('scene', () => {
  const image = {} as ImageBitmap;
  const camera = Camera.create({
    centerCoordinates: Coordinates.zero(),
    dimensions: Dimensions.allBalls()
  });
  const graphics = {} as Graphics;
  const scene = new SceneImpl({
    name: 'test',
    camera,
    dimensions: Dimensions.allBalls(),
    graphics
  });
  expect(scene.getName()).toBe('test');
  expect(scene.getBackgroundColor()).toBe(null);
  expect(scene.getBackgroundImage()).toBe(null);
  expect(scene.getCamera()).toBe(camera);
  expect(scene.getDimensions()).toEqual(Dimensions.allBalls());
  expect(scene.getGraphics()).toBe(graphics);

  scene.setBackgroundColor('red');
  expect(scene.getBackgroundColor()).toBe('red');
  scene.setBackgroundImage(image);
  expect(scene.getBackgroundImage()).toBe(image);
});

test('factory method', () => {
  // I couldn't get module mocks to work, this sucks
  const documentMock = vi.stubGlobal('document', {
    createElement: () => ({
      getContext: () => ({})
    })
  });
  const image = {} as ImageBitmap;
  const camera = Camera.create({
    centerCoordinates: Coordinates.zero(),
    dimensions: Dimensions.allBalls()
  });
  const sceneViaFactoryMethod = Scene.create({
    name: 'test',
    camera,
    dimensions: Dimensions.allBalls(),
    backgroundColor: 'red',
    backgroundImage: image
  });
  expect(sceneViaFactoryMethod.getName()).toBe('test');
  expect(sceneViaFactoryMethod.getBackgroundColor()).toBe('red');
  expect(sceneViaFactoryMethod.getBackgroundImage()).toBe(image);
  expect(sceneViaFactoryMethod.getCamera()).toBe(camera);
  expect(sceneViaFactoryMethod.getDimensions()).toEqual(Dimensions.allBalls());

  documentMock.clearAllMocks();
});

describe('entities', () => {
  const image = {} as ImageBitmap;
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

  test('init', () => {
    expect(scene.getEntities()).toEqual([]);
  });

  const entity = {
    getId: () => 'test_id',
    getName: () => 'test',
    isInitialized: (): boolean => true
  } as EntityImpl;

  const element = {} as Element;

  test('addEntity', () => {
    scene.addEntity(entity);
    expect(scene.getEntities()).toEqual([entity]);
    expect(scene.getEntitiesByName('test')).toEqual([entity]);
    expect(scene.getEntitiesByName('not')).toEqual([]);
    expect(scene.getEntityById('test_id')).toBe(entity);
  });

  test('removeEntity', () => {
    scene.removeEntity(entity);
    expect(scene.getEntities()).toEqual([]);
    expect(() => scene.removeEntity(entity)).toThrow();
    expect(scene.getEntityById('test_id')).toBe(null);
  });

  test('clearEntities', () => {
    scene.addEntity(entity);
    expect(scene.getEntities()).toEqual([entity]);
    scene.clearEntities();
    expect(scene.getEntities()).toEqual([]);
  });

  test('addElement', () => {
    scene.addElement(element);
    expect(scene.getElements()).toEqual([element]);
  });

  test('removeElement', () => {
    scene.removeElement(element);
    expect(scene.getElements()).toEqual([]);
  });

  test('clearElements', () => {
    scene.addElement(element);
    expect(scene.getElements()).toEqual([element]);
    scene.clearElements();
    expect(scene.getElements()).toEqual([]);
  });
});
