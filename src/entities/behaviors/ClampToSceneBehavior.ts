import { EntityBehavior } from './EntityBehavior.ts';
import { Entity } from '../Entity.ts';
import { Scene } from '../../core/Scene.ts';
import { Rect } from '../../geometry/Rect.ts';
import { clampToRect } from '../functions/clampToRect.ts';

export namespace ClampToSceneBehavior {
  export const create = (): EntityBehavior => ({
    update: (entity: Entity, scene: Scene): void => {
      const sceneRect = Rect.fromDimensions(scene.getDimensions());
      clampToRect(entity, sceneRect);
    }
  });
}
