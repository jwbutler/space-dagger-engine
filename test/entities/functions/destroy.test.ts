import { destroy, Entity } from '../../../src/entities';
import { Engine, Scene } from '../../../src';
import { EntityScript, GlobalScript } from '../../../src/scripts';
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

  const globalScript = {
    onDestroy: () => {}
  } as GlobalScript;

  const engine = {
    getCurrentScene: () => scene,
    getGlobalScripts: () => [globalScript]
  } as Engine;

  const entity_onDestroy_spy = vi.spyOn(entityScript, 'onDestroy');
  const global_onDestroy_spy = vi.spyOn(globalScript, 'onDestroy');
  const removeEntity_spy = vi.spyOn(scene, 'removeEntity');

  destroy(entity, engine);

  expect(entity_onDestroy_spy).toHaveBeenCalledWith(entity, engine, { entity });
  expect(global_onDestroy_spy).toHaveBeenCalledWith(engine, { entity });
  expect(removeEntity_spy).toHaveBeenCalledWith(entity);
  expect(scene.removeEntity);

  vi.clearAllMocks();
});
