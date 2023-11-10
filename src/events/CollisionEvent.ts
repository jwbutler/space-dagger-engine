import { Entity } from '../entities';

export type CollisionEvent = Readonly<{
  entity: Entity;
  other: Entity;
}>;
