import { CollisionEvent } from '../events/CollisionEvent';
import { CustomEvent } from '../events/CustomEvent';
import { DestroyEvent } from '../events/DestroyEvent';
import { TickEvent } from '../events/TickEvent';
import { EntityInitEvent } from '../events/EntityInitEvent';
import { Entity } from '../entities/Entity';
import { Engine } from '../core/Engine';

/**
 * I'm defining these events separately from the target entity
 * partly so we can reuse the types with GlobalScript
 */
export type EntityScript = Readonly<{
  init?: (entity: Entity, engine: Engine, event: EntityInitEvent) => void;
  onTick?: (entity: Entity, engine: Engine, event: TickEvent) => void;
  onCollision?: (entity: Entity, engine: Engine, event: CollisionEvent) => void;
  onDestroy?: (entity: Entity, engine: Engine, event: DestroyEvent) => void;
  onCustomEvent?: (entity: Entity, engine: Engine, event: CustomEvent) => void;
}>;
