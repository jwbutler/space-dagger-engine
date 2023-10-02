import { expect, test, describe } from 'vitest';
import { Entity, isCollidingWith } from '../../../src/entities';
import { Sprite } from '../../../src/graphics';

describe('isCollidingWith', () => {
  test('corner to corner', () => {
    const first = {
      getSprite: () =>
        ({
          getBoundingRect: () => ({ left: 1, top: 2, width: 3, height: 4 })
        }) as Partial<Sprite> as Sprite
    } as Entity;
    const second = {
      getSprite: () =>
        ({
          getBoundingRect: () => ({ left: 4, top: 6, width: 3, height: 4 })
        }) as Partial<Sprite> as Sprite
    } as Entity;
    expect(isCollidingWith(first, second)).toBe(false);
  });

  test('overlapping', () => {
    const first = {
      getSprite: () =>
        ({
          getBoundingRect: () => ({ left: 1, top: 2, width: 3, height: 4 })
        }) as Partial<Sprite> as Sprite
    } as Entity;
    const second = {
      getSprite: () =>
        ({
          getBoundingRect: () => ({ left: 3, top: 5, width: 3, height: 4 })
        }) as Partial<Sprite> as Sprite
    } as Entity;
    expect(isCollidingWith(first, second)).toBe(true);
  });
});
