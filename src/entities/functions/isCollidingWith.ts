import { Entity } from '../Entity';
import { Polygon } from '../../geometry';

export const isCollidingWith = (first: Entity, second: Entity): boolean => {
  return Polygon.overlaps(
    first.getSprite().getCollisionPolygon(first),
    second.getSprite().getCollisionPolygon(second)
  );
};
