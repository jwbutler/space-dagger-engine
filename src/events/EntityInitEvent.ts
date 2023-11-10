import { Entity } from '../entities';

export type EntityInitEvent = Readonly<{
  entity: Entity;
}>;
