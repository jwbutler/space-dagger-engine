import { EntityBehavior } from './EntityBehavior';
import { Entity } from '../Entity';
import { Rect } from '../../geometry/Rect';
import { clampToRect } from '../functions/clampToRect';
import { Engine } from '../../core/Engine';

export namespace ClampToSceneBehavior {
  export const create = (): EntityBehavior => ({
    onTick: (entity: Entity, engine: Engine): void => {
      const sceneRect = Rect.fromDimensions(engine.getScene().getDimensions());
      clampToRect(entity, sceneRect);
    }
  });
}
