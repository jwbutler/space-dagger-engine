import { EntityBehavior } from './EntityBehavior';
import { Entity } from '../Entity';
import { Engine } from '../../core/Engine.ts';

export namespace CameraFollowBehavior {
  export const create = (): EntityBehavior => ({
    onTick: (entity: Entity, engine: Engine): void => {
      const camera = engine.getScene().getCamera();
      camera.setCenterCoordinates(entity.getCenterCoordinates());
    }
  });
}
