import { EntityBehavior } from './EntityBehavior.ts';
import { Entity } from '../Entity.ts';
import { Scene } from '../../core/Scene.ts';
import { Rect } from '../../geometry/Rect.ts';
import { clampToRect } from '../functions/clampToRect.ts';

type Props = Readonly<{
  coefficient: number;
}>;

export namespace BounceOffEdgesBehavior {
  export const create = ({ coefficient }: Props): EntityBehavior => ({
    update: (entity: Entity, scene: Scene): void => {
      const entityRect = entity.getSprite().getBoundingRect(entity);
      const sceneRect = Rect.fromDimensions(scene.getDimensions());
      let speed = entity.getSpeed();
      if (entityRect.left < sceneRect.left) {
        speed = { x: speed.x * -1 * coefficient, y: speed.y };
      }
      if (entityRect.top < sceneRect.top) {
        speed = { x: speed.x, y: speed.y * -1 * coefficient };
      }
      if (entityRect.left + entityRect.width > sceneRect.left + sceneRect.width) {
        speed = { x: speed.x * -1 * coefficient, y: speed.y };
      }
      if (entityRect.top + entityRect.height > sceneRect.top + sceneRect.height) {
        speed = { x: speed.x, y: speed.y * -1 * coefficient };
      }
      entity.setSpeed(speed);
      clampToRect(entity, sceneRect);
    }
  });
}
