import { EntityBehavior } from './EntityBehavior';
import { Entity } from '../Entity';
import { Rect } from '../../geometry/Rect';
import { clampToRect } from '../functions/clampToRect';
import { TickEvent } from '../../events/TickEvent';

type Props = Readonly<{
  coefficient: number;
}>;

export namespace BounceOffEdgesBehavior {
  export const create = ({ coefficient }: Props): EntityBehavior => ({
    onTick: (entity: Entity, { engine }: TickEvent): void => {
      const entityRect = entity.getSprite().getBoundingRect(entity);
      const sceneRect = Rect.fromDimensions(engine.getCurrentScene().getDimensions());
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
