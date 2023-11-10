import { EntityBehavior } from './EntityBehavior';
import { Entity } from '../Entity';
import { Coordinates, Vector } from '../../geometry';
import { Engine } from '../../core/Engine';
import { getCachedOverlaps } from '../../plugins/collision/CollisionDetectionPlugin';

export namespace SolidBehavior {
  export const TAG_NAME = 'solid';
  export const PUSH_DISTANCE = 1;

  export const create = (): EntityBehavior => {
    const init = (entity: Entity) => {
      entity.addTag(TAG_NAME);
    };

    const onTick = (entity: Entity, engine: Engine) => {
      const overlappingEntities = getCachedOverlappingEntities(entity, engine);
      for (const other of overlappingEntities) {
        if (other.hasTag(TAG_NAME)) {
          const direction = Vector.withMagnitude(
            Vector.betweenEntities(entity, other),
            PUSH_DISTANCE
          );
          entity.setCenterCoordinates(
            Coordinates.minus(entity.getCenterCoordinates(), direction)
          );
          other.setCenterCoordinates(
            Coordinates.plus(other.getCenterCoordinates(), direction)
          );
        }
      }
    };

    return { init, onTick };
  };
}

/** exporting for test coverage */
export const getCachedOverlappingEntities = (
  entity: Entity,
  engine: Engine
): Entity[] => {
  const overlaps = getCachedOverlaps(engine);
  return overlaps
    .filter(
      ({ firstId, secondId }) => firstId === entity.getId() || secondId === entity.getId()
    )
    .map(overlap => {
      const otherId =
        overlap.firstId === entity.getId() ? overlap.secondId : overlap.firstId;
      return engine.getCurrentScene().getEntityById(otherId);
    })
    .filter(other => other !== null) as Entity[];
};
