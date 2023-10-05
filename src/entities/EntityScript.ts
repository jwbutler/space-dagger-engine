import { Entity } from './Entity';
import { Engine } from '../core/Engine';

export type EntityScript = Readonly<{
  onTick?: (entity: Entity, engine: Engine, dt: number) => void;
  onCollision?: (entity: Entity, otherEntity: Entity, engine: Engine, dt: number) => void;
  onDestroy?: (entity: Entity, engine: Engine, dt: number) => void;
}>;
