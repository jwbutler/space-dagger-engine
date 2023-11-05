import { Entity } from '../Entity';
import { Engine } from '../../core/Engine';

export const destroy = (entity: Entity, engine: Engine) => {
  engine.getCurrentScene().removeEntity(entity);

  for (const script of engine.getGlobalScripts()) {
    script?.onDestroy?.(entity, { engine });
  }

  for (const script of entity.getScripts()) {
    script?.onDestroy?.(entity, { engine });
  }
};
