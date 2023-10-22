import { Entity, isCollidingWith } from '../../../src/entities';
import { Sprite } from '../../../src/graphics';
import { Rect } from '../../../src/geometry';
import { expect, test, describe } from 'vitest';

describe('isCollidingWith', () => {
  test('corner to corner', () => {
    const first = {
      getSprite: () =>
        ({
          getCollisionPolygon: () =>
            Rect.asPolygon({ left: 1, top: 2, width: 3, height: 4 })
        }) as unknown as Sprite
    } as Entity;
    const second = {
      getSprite: () =>
        ({
          getCollisionPolygon: () =>
            Rect.asPolygon({ left: 4, top: 6, width: 3, height: 4 })
        }) as unknown as Sprite
    } as Entity;
    expect(isCollidingWith(first, second)).toBe(true);
  });

  test('overlapping', () => {
    const first = {
      getSprite: () =>
        ({
          getCollisionPolygon: () =>
            Rect.asPolygon({ left: 1, top: 2, width: 3, height: 4 })
        }) as unknown as Sprite
    } as Entity;
    const second = {
      getSprite: () =>
        ({
          getCollisionPolygon: () =>
            Rect.asPolygon({ left: 3, top: 5, width: 3, height: 4 })
        }) as unknown as Sprite
    } as Entity;
    expect(isCollidingWith(first, second)).toBe(true);
  });
});
