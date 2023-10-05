import { Entity } from '../Entity';
import { Rect } from '../../geometry/Rect';

/** TODO naive collision detection */
export const isCollidingWith = (first: Entity, second: Entity): boolean => {
  return Rect.overlaps(
    first.getSprite().getBoundingRect(first),
    second.getSprite().getBoundingRect(second)
  );
};
