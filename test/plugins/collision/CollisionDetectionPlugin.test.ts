import { Engine, Scene } from '../../../src';
import {
  CollisionHandler,
  CollisionResult
} from '../../../src/plugins/collision/CollisionHandler';
import {
  CollisionDetectionPlugin,
  CollisionDetectionPluginImpl,
  getCachedOverlaps
} from '../../../src/plugins/collision/CollisionDetectionPlugin';
import { Entity } from '../../../src/entities';
import { describe, expect, test, vi } from 'vitest';
import type { Plugin } from '../../../src/plugins/Plugin';

describe('CollisionDetectionPlugin', () => {
  let collisions: CollisionResult;
  const handler = {
    detectCollisions: () => collisions
  } as CollisionHandler;

  const plugin = new CollisionDetectionPluginImpl(handler) as Plugin;

  const firstCollisionScript = {
    onCollision: () => {}
  };
  const first = {
    getId: () => '1',
    getScripts: () => [firstCollisionScript]
  } as unknown as Entity;
  const secondCollisionScript = {
    onCollision: () => {}
  };
  const second = {
    getId: () => '2',
    getScripts: () => [secondCollisionScript]
  } as unknown as Entity;
  const overlap = { firstId: '1', secondId: '2' };
  const scene = {
    getEntities: () => [first, second],
    getEntityById: (id: string) => (id === '1' ? first : second)
  } as unknown as Scene;
  const engine = {
    getCurrentScene: () => scene,
    setStringVariable: () => {}
  } as unknown as Engine;

  test('empty collisions', () => {
    collisions = {
      collisions: [],
      overlaps: []
    };
    const setStringVariable_spy = vi.spyOn(engine, 'setStringVariable');
    plugin.onTick?.(engine, { dt: 1 });
    expect(setStringVariable_spy).toHaveBeenCalledWith('overlaps', '[]');
    setStringVariable_spy.mockClear();
  });

  test('non-empty collisions', () => {
    collisions = {
      collisions: [overlap],
      overlaps: [overlap]
    };
    const setStringVariable_spy = vi.spyOn(engine, 'setStringVariable');
    const firstCollision_spy = vi.spyOn(firstCollisionScript, 'onCollision');
    const secondCollision_spy = vi.spyOn(secondCollisionScript, 'onCollision');
    plugin.onTick?.(engine, { dt: 1 });
    expect(setStringVariable_spy).toHaveBeenCalledWith(
      'overlaps',
      '[{"firstId":"1","secondId":"2"}]'
    );
    expect(firstCollision_spy).toHaveBeenCalledWith(first, engine, {
      entity: first,
      other: second
    });
    expect(secondCollision_spy).toHaveBeenCalledWith(second, engine, {
      entity: second,
      other: first
    });

    setStringVariable_spy.mockClear();
    firstCollision_spy.mockClear();
    secondCollision_spy.mockClear();
  });

  /** bad test for coverage */
  test('CollisionDetectionPlugin#create', () => {
    expect(() => {
      CollisionDetectionPlugin.create({
        sanityDX: 100,
        sanityDY: 100,
        gracePeriod: 0.5
      });
    }).not.toThrow();
  });
});

describe('getCachedOverlaps', () => {
  test('empty', () => {
    const engine = {
      getStringVariable: () => null
    } as unknown as Engine;
    expect(getCachedOverlaps(engine)).toEqual([]);
  });
});
