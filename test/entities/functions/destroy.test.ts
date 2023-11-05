import { destroy, Entity } from '../../../src/entities';
import { Engine, Scene } from '../../../src';
import { EntityScript, GlobalScript } from '../../../src/events';
import { test, expect, vi } from 'vitest';

test('destroy', () => {
  const entityScript = {
    onDestroy: () => {}
  } as EntityScript;

  const globalScript = {
    onDestroy: () => {}
  } as GlobalScript;

  const entity = {
    getScripts: () => [entityScript]
  } as Entity;
  const scene = {
    removeEntity: () => {}
  } as unknown as Scene;

  const engine = {
    getCurrentScene: () => scene,
    getGlobalScripts: () => [globalScript]
  } as Engine;

  const entity_onDestroy_spy = vi.spyOn(entityScript, 'onDestroy');
  const global_onDestroy_spy = vi.spyOn(globalScript, 'onDestroy');
  const removeEntity_spy = vi.spyOn(scene, 'removeEntity');

  destroy(entity, engine);

  expect(entity_onDestroy_spy).toHaveBeenCalledWith(entity, { engine });
  expect(global_onDestroy_spy).toHaveBeenCalledWith(entity, { engine });
  expect(removeEntity_spy).toHaveBeenCalledWith(entity);
  expect(scene.removeEntity);

  vi.clearAllMocks();
});
