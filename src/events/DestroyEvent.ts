import { Entity } from '../entities';

export type DestroyEvent = Readonly<{
  entity: Entity;
}>;
