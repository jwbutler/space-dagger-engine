import { Entity } from '../entities';
import { Engine } from '../core/Engine';

export type CollisionEvent = Readonly<{
  other: Entity;
  engine: Engine;
}>;
