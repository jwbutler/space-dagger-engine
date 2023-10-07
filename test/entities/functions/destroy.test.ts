import { test, expect, vi } from 'vitest';
import { destroy, Entity } from '../../../src/entities';
import { Engine, Scene } from '../../../src';
import { EntityScript } from '../../../src/events';

test('destroy', () => {
  const entityScript = {
    onDestroy: () => {}
  } as EntityScript;

  const entity = {
    getScript: () => entityScript
  } as Entity;
  const scene = {
    removeEntity: () => {}
  } as unknown as Scene;

  const engine = {
    getScene: () => scene
  } as Engine;

  const onDestroy_spy = vi.spyOn(entityScript, 'onDestroy');
  const removeEntity_spy = vi.spyOn(scene, 'removeEntity');

  destroy(entity, engine, 1);

  expect(onDestroy_spy).toHaveBeenCalledWith(entity, { engine, dt: 1 });
  expect(removeEntity_spy).toHaveBeenCalledWith(entity);
  expect(scene.removeEntity);

  vi.clearAllMocks();
});
