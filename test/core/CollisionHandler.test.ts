import { describe, expect, test } from 'vitest';
import { CollisionHandler } from '../../src/core/CollisionHandler';
import { Entity } from '../../src/entities';
import { Sprite } from '../../src/graphics';

describe('CollisionHandler', () => {
  test('CollisionHandler', () => {
    const collisionHandler = CollisionHandler.create();
    const firstSprite = {
      getBoundingRect: () => ({ left: 10, top: 10, width: 20, height: 20 })
    } as Partial<Sprite> as Sprite;
    const first = {
      getId: () => 'first',
      getSprite: () => firstSprite
    } as Entity;
    let secondCenterCoordinates = { x: 30, y: 30 };
    const secondSprite = {
      getBoundingRect: () => ({
        left: secondCenterCoordinates.x - 10,
        top: secondCenterCoordinates.y - 10,
        width: 20,
        height: 20
      })
    } as Partial<Sprite> as Sprite;
    const second = {
      getId: () => 'second',
      getSprite: () => secondSprite
    } as Entity;
    const entities = [first, second];

    // first pass - should return a collision
    {
      const collisions = collisionHandler.detectCollisions(entities);
      expect(collisions).toEqual([{ firstId: first.getId(), secondId: second.getId() }]);
    }

    // second pass - they are still overlapping so this should return nothing
    {
      const collisions = collisionHandler.detectCollisions(entities);
      expect(collisions).toEqual([]);
    }

    // third pass - move second entity out of collision range
    // should return nothing but reset internal state
    secondCenterCoordinates = { x: 50, y: 50 };

    {
      const collisions = collisionHandler.detectCollisions(entities);
      expect(collisions).toEqual([]);
    }

    secondCenterCoordinates = { x: 30, y: 30 };
    // fourth pass - should return a collision
    {
      const collisions = collisionHandler.detectCollisions(entities);
      expect(collisions).toEqual([{ firstId: first.getId(), secondId: second.getId() }]);
    }
  });
});
