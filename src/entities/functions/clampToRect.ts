import { Rect } from '../../geometry/Rect';
import { Entity } from '../Entity';

export const clampToRect = (entity: Entity, rect: Rect): void => {
  let { x, y } = entity.getCenterCoordinates();
  const boundingRect = entity.getSprite().getBoundingRect(entity);
  if (boundingRect.left < rect.left) {
    x += rect.left - boundingRect.left;
  }
  if (boundingRect.top < rect.top) {
    y += rect.top - boundingRect.top;
  }
  const right = rect.left + rect.width;
  const boundingRight = boundingRect.left + boundingRect.width;
  if (boundingRight > right) {
    x -= boundingRight - right;
  }
  const bottom = rect.top + rect.height;
  const boundingBottom = boundingRect.top + boundingRect.height;
  if (boundingBottom > bottom) {
    y -= boundingBottom - bottom;
  }
  entity.setCenterCoordinates({ x, y });
};
