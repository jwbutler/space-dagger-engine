import { EntityBehavior } from './EntityBehavior.ts';
import { Entity } from '../Entity.ts';
import { Rect } from '../../geometry/Rect.ts';
import { clampToRect } from '../functions/clampToRect.ts';
import { Engine } from '../../core/Engine.ts';

export namespace ClampToSceneBehavior {
  export const create = (): EntityBehavior => ({
    onTick: (entity: Entity, engine: Engine): void => {
      const sceneRect = Rect.fromDimensions(engine.getScene().getDimensions());
      clampToRect(entity, sceneRect);
    }
  });
}
