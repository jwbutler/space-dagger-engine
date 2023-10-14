import { Entity } from '../entities/Entity';
import { CollisionEvent } from './CollisionEvent';
import { DestroyEvent } from './DestroyEvent';
import { TickEvent } from './TickEvent';
import { EntityInitEvent } from './EntityInitEvent';

/**
 * I'm defining these events separately from the target entity
 * partly so we can reuse the types with GlobalScript
 */
export type EntityScript = Readonly<{
  init?: (entity: Entity, event: EntityInitEvent) => void;
  onTick?: (entity: Entity, event: TickEvent) => void;
  onCollision?: (entity: Entity, event: CollisionEvent) => void;
  onDestroy?: (entity: Entity, event: DestroyEvent) => void;
}>;
