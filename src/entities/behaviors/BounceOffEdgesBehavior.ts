import { EntityBehavior } from './EntityBehavior.ts';
import { Entity } from '../Entity.ts';
import { Rect } from '../../geometry/Rect.ts';
import { clampToRect } from '../functions/clampToRect.ts';
import { Engine } from '../../core/Engine.ts';

type Props = Readonly<{
  coefficient: number;
}>;

export namespace BounceOffEdgesBehavior {
  export const create = ({ coefficient }: Props): EntityBehavior => ({
    onTick: (entity: Entity, engine: Engine): void => {
      const entityRect = entity.getSprite().getBoundingRect(entity);
      const sceneRect = Rect.fromDimensions(engine.getScene().getDimensions());
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
