import { EntityBehavior } from './EntityBehavior';
import { Entity } from '../Entity';
import { Rect } from '../../geometry/Rect';
import { clampToRect } from '../functions/clampToRect';
import { TickEvent } from '../../events/TickEvent';

export namespace ClampToSceneBehavior {
  export const create = (): EntityBehavior => ({
    onTick: (entity: Entity, { engine }: TickEvent): void => {
      const sceneRect = Rect.fromDimensions(engine.getCurrentScene().getDimensions());
      clampToRect(entity, sceneRect);
    }
  });
}
