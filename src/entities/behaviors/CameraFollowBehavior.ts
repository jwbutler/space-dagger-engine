import { EntityBehavior } from './EntityBehavior';
import { Entity } from '../Entity';
import { TickEvent } from '../../events/TickEvent';

export namespace CameraFollowBehavior {
  export const create = (): EntityBehavior => ({
    onTick: (entity: Entity, { engine }: TickEvent): void => {
      const camera = engine.getScene().getCamera();
      camera.setCenterCoordinates(entity.getCenterCoordinates());
    }
  });
}
