import { Scene } from '../../core/Scene';
import { Entity } from '../Entity';
import { Polygon } from '../../geometry/Polygon';

export const getOverlappingEntities = (entity: Entity, scene: Scene): Entity[] => {
  const overlappingEntities: Entity[] = [];
  const entityPolygon = entity.getSprite().getCollisionPolygon(entity);
  for (const other of scene.getEntities()) {
    if (other === entity) continue;

    const otherPolygon = other.getSprite().getCollisionPolygon(other);
    console.log(`TEST: ${JSON.stringify(entityPolygon)} ${JSON.stringify(otherPolygon)}`);
    if (Polygon.overlaps(entityPolygon, otherPolygon)) {
      overlappingEntities.push(other);
    }
  }
  return overlappingEntities;
};
