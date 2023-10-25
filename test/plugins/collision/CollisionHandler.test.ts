import {
  CollisionHandler,
  CollisionHandlerImpl,
  isMaybeOverlapping,
  isOverlapping,
  matches
} from '../../../src/plugins/collision/CollisionHandler';
import { Entity } from '../../../src/entities';
import { Sprite } from '../../../src/graphics';
import { Coordinates, Rect } from '../../../src/geometry';
import { afterAll, describe, expect, test, vi } from 'vitest';

describe('CollisionHandler', () => {
  vi.useFakeTimers({
    toFake: ['performance']
  });

  const collisionHandler = new CollisionHandlerImpl({ gracePeriod: 0.25 });
  const firstSprite = {
    getCollisionPolygon: () =>
      Rect.asPolygon({ left: 10, top: 10, width: 20, height: 20 })
  } as unknown as Sprite;
  const first = {
    getId: () => 'first',
    getSprite: () => firstSprite
  } as Entity;

  let secondCenterCoordinates: Coordinates;
  const secondSprite = {
    getCollisionPolygon: () =>
      Rect.asPolygon({
        left: secondCenterCoordinates.x - 10,
        top: secondCenterCoordinates.y - 10,
        width: 20,
        height: 20
      })
  } as unknown as Sprite;
  const second = {
    getId: () => 'second',
    getSprite: () => secondSprite
  } as Entity;
  const entities = [first, second];
  const currentTime = 123.456;
  vi.advanceTimersByTime(currentTime * 1000);

  const overlap = {
    firstId: first.getId(),
    secondId: second.getId()
  };

  test('simple collision', () => {
    secondCenterCoordinates = { x: 30, y: 30 };
    const { collisions, overlaps } = collisionHandler.detectCollisions(entities);
    expect(collisions).toEqual([overlap]);
    expect(overlaps).toEqual([overlap]);
  });

  test('second pass - stale collision should not be returned', () => {
    const { collisions, overlaps } = collisionHandler.detectCollisions(entities);
    expect(collisions).toEqual([]);
    expect(overlaps).toEqual([overlap]);
  });

  test('Test grace period', () => {
    secondCenterCoordinates = { x: 50, y: 50 };
    let { collisions, overlaps } = collisionHandler.detectCollisions(entities);
    expect(collisions).toEqual([]);
    expect(overlaps).toEqual([]);
    secondCenterCoordinates = { x: 30, y: 30 };
    ({ collisions, overlaps } = collisionHandler.detectCollisions(entities));
    expect(collisions).toEqual([]);
    expect(overlaps).toEqual([overlap]);
  });

  test('Test after grace period', () => {
    secondCenterCoordinates = { x: 50, y: 50 };
    let { collisions, overlaps } = collisionHandler.detectCollisions(entities);
    expect(collisions).toEqual([]);
    expect(overlaps).toEqual([]);

    vi.advanceTimersByTime(260);

    secondCenterCoordinates = { x: 30, y: 30 };
    ({ collisions, overlaps } = collisionHandler.detectCollisions(entities));
    expect(collisions).toEqual([overlap]);
    expect(overlaps).toEqual([overlap]);
  });

  test('CollisionHandler#create', () => {
    expect(() => {
      CollisionHandler.create({
        sanityDX: 100,
        sanityDY: 100,
        gracePeriod: 0.5
      });
    }).not.toThrow();
  });

  afterAll(() => {
    vi.useRealTimers();
  });
});

// extra section for test coverage... shouldn't really be exporting this method
describe('matches', () => {
  test('flip first/second', () => {
    expect(
      matches({ firstId: 'a', secondId: 'b' }, { firstId: 'b', secondId: 'a' })
    ).toBe(true);
  });
});

describe('isMaybeOverlapping', () => {
  test('isMaybeOverlapping', () => {
    const first = {
      getCenterCoordinates: () => ({ x: 20, y: 20 })
    } as Entity;
    const second = {
      getCenterCoordinates: () => ({ x: 120, y: 20 })
    } as Entity;
    const third = {
      getCenterCoordinates: () => ({ x: 20, y: 120 })
    } as Entity;

    expect(isMaybeOverlapping(first, second, 99, 99)).toBe(false);
    expect(isMaybeOverlapping(first, second, 101, 99)).toBe(true);
    expect(isMaybeOverlapping(first, third, 99, 99)).toBe(false);
    expect(isMaybeOverlapping(first, third, 99, 101)).toBe(true);
  });
});

describe('isOverlapping', () => {
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
    expect(isOverlapping(first, second)).toBe(true);
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
    expect(isOverlapping(first, second)).toBe(true);
  });
});
