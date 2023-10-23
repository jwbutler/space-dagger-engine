import { Graphics } from './Graphics';
import { Rect } from '../geometry/Rect';
import { Entity } from '../entities/Entity';
import { Polygon } from '../geometry/Polygon';

export interface Sprite {
  render: (entity: Entity, graphics: Graphics) => void;
  getBoundingRect: (entity: Entity) => Rect;
  getCollisionPolygon: (entity: Entity) => Polygon;
}
