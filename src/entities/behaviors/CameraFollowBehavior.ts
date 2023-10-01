import { EntityBehavior } from './EntityBehavior';
import { Entity } from '../Entity';
import { Scene } from '../../core/Scene';

export namespace CameraFollowBehavior {
  export const create = (): EntityBehavior => ({
    update: (entity: Entity, scene: Scene): void => {
      const camera = scene.getCamera();
      camera.setCenterCoordinates(entity.getCenterCoordinates());
    }
  });
}
