import { Entity } from '../Entity.ts';
import { Engine } from '../../core/Engine.ts';

export const destroy = (entity: Entity, engine: Engine, dt: number) => {
  engine.getScene().removeEntity(entity);
  entity.getScript()?.onDestroy?.(entity, engine, dt);
};
