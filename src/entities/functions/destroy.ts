import { Entity } from '../Entity';
import { Engine } from '../../core/Engine';

export const destroy = (entity: Entity, engine: Engine, dt: number) => {
  engine.getScene().removeEntity(entity);
  entity.getScript()?.onDestroy?.(entity, engine, dt);
};
