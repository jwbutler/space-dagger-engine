import { describe, expect, test, vi } from 'vitest';
import { Entity, SolidBehavior } from '../../../src/entities';
import { EntityInitEvent } from '../../../src/events';
import { Engine, Scene } from '../../../src';

const sqrt_2 = 2 ** 0.5;

describe('SolidBehavior', () => {
  const entity = {
    addTag: () => {},
    getSprite: () => ({
      getBoundingRect: () => ({ left: 10, top: 10, width: 20, height: 20 })
    }),
    getCenterCoordinates: () => ({ x: 20, y: 20 }),
    setCenterCoordinates: () => {}
  } as unknown as Entity;

  const addTag_spy = vi.spyOn(entity, 'addTag');
  const behavior = SolidBehavior.create();

  test('init', () => {
    behavior.init?.(entity, {} as EntityInitEvent);
    expect(addTag_spy).toHaveBeenCalledWith(SolidBehavior.TAG_NAME);
  });

  test('onTick', () => {
    const otherEntity = {
      getSprite: () => ({
        getBoundingRect: () => ({ left: 20, top: 20, width: 20, height: 20 })
      }),
      getCenterCoordinates: () => ({ x: 30, y: 30 }),
      setCenterCoordinates: () => {},
      hasTag: (name: string) => name === SolidBehavior.TAG_NAME
    } as unknown as Entity;

    const entity_setCoordinates_spy = vi.spyOn(entity, 'setCenterCoordinates');
    const other_setCoordinates_spy = vi.spyOn(otherEntity, 'setCenterCoordinates');

    const scene = {
      getEntities: () => [entity, otherEntity]
    } as unknown as Scene;
    const engine = {
      getScene: () => scene
    } as Engine;

    behavior.onTick?.(entity, { engine, dt: 1 });
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
