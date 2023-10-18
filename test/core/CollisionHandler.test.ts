import { CollisionHandlerImpl, matches } from '../../src/core/CollisionHandler';
import { Entity } from '../../src/entities';
import { Sprite } from '../../src/graphics';
import { Coordinates } from '../../src/geometry';
import { afterAll, describe, expect, test, vi } from 'vitest';

describe('CollisionHandler', () => {
  vi.useFakeTimers({
    toFake: ['performance']
  });

  const collisionHandler = new CollisionHandlerImpl({ gracePeriod: 0.25 });
  const firstSprite = {
    getBoundingRect: () => ({ left: 10, top: 10, width: 20, height: 20 })
  } as unknown as Sprite;
  const first = {
    getId: () => 'first',
    getSprite: () => firstSprite
  } as Entity;

  let secondCenterCoordinates: Coordinates;
  const secondSprite = {
    getBoundingRect: () => ({
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

  test('simple collision', () => {
    secondCenterCoordinates = { x: 30, y: 30 };
    const collisions = collisionHandler.detectCollisions(entities);
    const expectedCollision = {
      firstId: first.getId(),
      secondId: second.getId()
    };
    expect(collisions).toEqual([expectedCollision]);
  });

  test('second pass - stale collision should not be returned', () => {
    const collisions = collisionHandler.detectCollisions(entities);
    expect(collisions).toEqual([]);
  });

  test('Test grace period', () => {
    secondCenterCoordinates = { x: 50, y: 50 };
    let collisions = collisionHandler.detectCollisions(entities);
    expect(collisions).toEqual([]);
    secondCenterCoordinates = { x: 30, y: 30 };
    collisions = collisionHandler.detectCollisions(entities);
    expect(collisions).toEqual([]);
  });

  test('Test after grace period', () => {
    secondCenterCoordinates = { x: 50, y: 50 };
    let collisions = collisionHandler.detectCollisions(entities);
    expect(collisions).toEqual([]);

    vi.advanceTimersByTime(260);

    secondCenterCoordinates = { x: 30, y: 30 };
    collisions = collisionHandler.detectCollisions(entities);
    const expectedCollision = {
      firstId: first.getId(),
      secondId: second.getId()
    };
    expect(collisions).toEqual([expectedCollision]);
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
