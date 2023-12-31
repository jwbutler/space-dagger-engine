import { Entity, SolidBehavior } from '../../../src/entities';
import { EntityInitEvent } from '../../../src/events';
import { Engine, Scene } from '../../../src';
import { Rect } from '../../../src/geometry';
import { getCachedOverlappingEntities } from '../../../src/entities/behaviors/SolidBehavior';
import { describe, expect, test, vi } from 'vitest';

const sqrt_2 = 2 ** 0.5;

describe('SolidBehavior', () => {
  const entity = {
    getId: () => 'entity',
    addTag: () => {},
    getSprite: () => ({
      getCollisionPolygon: () =>
        Rect.asPolygon({ left: 10, top: 10, width: 20, height: 20 })
    }),
    getCenterCoordinates: () => ({ x: 20, y: 20 }),
    setCenterCoordinates: () => {}
  } as unknown as Entity;

  const addTag_spy = vi.spyOn(entity, 'addTag');
  const behavior = SolidBehavior.create();

  test('init', () => {
    behavior.init?.(entity, {} as Engine, {} as EntityInitEvent);
    expect(addTag_spy).toHaveBeenCalledWith(SolidBehavior.TAG_NAME);
  });

  test('onTick', () => {
    const otherEntity = {
      getId: () => 'other',
      getSprite: () => ({
        getCollisionPolygon: () =>
          Rect.asPolygon({ left: 20, top: 20, width: 20, height: 20 })
      }),
      getCenterCoordinates: () => ({ x: 30, y: 30 }),
      setCenterCoordinates: () => {},
      hasTag: (name: string) => name === SolidBehavior.TAG_NAME
    } as unknown as Entity;

    const entity_setCoordinates_spy = vi.spyOn(entity, 'setCenterCoordinates');
    const other_setCoordinates_spy = vi.spyOn(otherEntity, 'setCenterCoordinates');

    const scene = {
      getEntities: () => [entity, otherEntity],
      getEntityById: (id: string) => {
        return id === 'entity' ? entity : otherEntity;
      }
    } as unknown as Scene;
    const engine = {
      getCurrentScene: () => scene,
      getStringVariable: () => JSON.stringify([{ firstId: 'entity', secondId: 'other' }])
    } as unknown as Engine;

    behavior.onTick?.(entity, engine, { dt: 1 });
    expect(entity_setCoordinates_spy).toHaveBeenCalledWith({
      x: 20 - 2 ** 0.5 / 2,
      y: 20 - 2 ** 0.5 / 2
    });
    expect(other_setCoordinates_spy).toHaveBeenCalledWith({
      x: 30 + sqrt_2 / 2,
      y: 30 + sqrt_2 / 2
    });
  });
});

describe('getCachedOverlappingEntities', () => {
  const first = {
    getId: () => '1'
  } as Entity;
  const second = {
    getId: () => '2'
  } as Entity;
  const scene = {
    getEntityById: (id: string) => {
      return id === '1' ? first : second;
    }
  } as Scene;
  const engine = {
    getStringVariable: () => JSON.stringify([{ firstId: '1', secondId: '2' }]),
    getCurrentScene: () => scene
  } as unknown as Engine;

  test('with flipped ids', () => {
    expect(getCachedOverlappingEntities(first, engine)).toEqual([second]);
    expect(getCachedOverlappingEntities(second, engine)).toEqual([first]);
  });
});
