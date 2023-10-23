import { EntityBehavior } from './EntityBehavior';
import { Entity } from '../Entity';
import { TickEvent } from '../../events';
import { Coordinates, Vector } from '../../geometry';
import { getOverlappingEntities } from '../functions/getOverlappingEntities';

export namespace SolidBehavior {
  export const TAG_NAME = 'solid';
  export const PUSH_DISTANCE = 1;

  export const create = (): EntityBehavior => {
    const init = (entity: Entity) => {
      entity.addTag(TAG_NAME);
    };

    const onTick = (entity: Entity, { engine }: TickEvent) => {
      const overlappingEntities = getOverlappingEntities(entity, engine.getScene());
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

    return { init, onTick } as EntityBehavior;
  };
}
