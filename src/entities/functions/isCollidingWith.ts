import { Entity } from '../Entity.ts';
import { Rect } from '../../geometry/Rect.ts';

/** TODO naive collision detection */
export const isCollidingWith = (first: Entity, second: Entity): boolean => {
  return Rect.overlaps(
    first.getSprite().getBoundingRect(first),
    second.getSprite().getBoundingRect(second)
  );
};
