import { destroy, Entity } from '../../../src/entities';
import { Engine, Scene } from '../../../src';
import { EntityScript } from '../../../src/events';
import { test, expect, vi } from 'vitest';

test('destroy', () => {
  const entityScript = {
    onDestroy: () => {}
  } as EntityScript;

  const entity = {
    getScripts: () => [entityScript]
  } as Entity;
  const scene = {
    removeEntity: () => {}
  } as unknown as Scene;

  const engine = {
    getCurrentScene: () => scene
  } as Engine;

  const onDestroy_spy = vi.spyOn(entityScript, 'onDestroy');
  const removeEntity_spy = vi.spyOn(scene, 'removeEntity');

  destroy(entity, engine);

  expect(onDestroy_spy).toHaveBeenCalledWith(entity, { engine });
  expect(removeEntity_spy).toHaveBeenCalledWith(entity);
  expect(scene.removeEntity);

  vi.clearAllMocks();
});
