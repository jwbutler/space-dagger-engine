import { destroy, Entity } from '../../../src/entities';
import { Engine, Scene } from '../../../src';
import { EntityScript } from '../../../src/scripts';
import { test, expect, vi } from 'vitest';

test('destroy', () => {
  const entityScript = {
    onDestroy: vi.fn(() => {})
  } as EntityScript;
  const globalScript = {
    onDestroy: vi.fn(() => {})
  } as EntityScript;

  const entity = {
    getScripts: () => [entityScript]
  } as Entity;
  const scene = {
    removeEntity: vi.fn(() => {})
  } as unknown as Scene;

  const engine = {
    getCurrentScene: () => scene,
    getGlobalScripts: () => [globalScript]
  } as Engine;

  destroy(entity, engine);

  expect(globalScript.onDestroy).toHaveBeenCalledWith(engine, { entity });
  expect(entityScript.onDestroy).toHaveBeenCalledWith(entity, engine, { entity });
  expect(scene.removeEntity).toHaveBeenCalledWith(entity);

  vi.clearAllMocks();
});
