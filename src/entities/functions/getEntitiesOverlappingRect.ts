import { Scene } from '../../core/Scene.ts';
import { Entity } from '../Entity.ts';
import { Rect } from '../../geometry/Rect.ts';

/**
 * TODO - do some research on efficient collision detection
 */
export const getEntitiesOverlappingRect = (rect: Rect, scene: Scene): Entity[] => {
  const overlappingEntities: Entity[] = [];
  for (const entity of scene.getEntities()) {
    const boundingRect = entity.getSprite().getBoundingRect(entity);
    if (Rect.overlaps(boundingRect, rect)) {
      overlappingEntities.push(entity);
    }
  }
  return overlappingEntities;
};
