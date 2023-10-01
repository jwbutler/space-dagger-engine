import { Graphics } from './Graphics';
import { Rect } from '../geometry/Rect';
import { Entity } from '../entities/Entity.ts';

export interface Sprite {
  render: (entity: Entity, graphics: Graphics) => void;
  getBoundingRect: (entity: Entity) => Rect;
}
