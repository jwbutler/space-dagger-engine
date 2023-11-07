import { EntityBehavior } from './behaviors/EntityBehavior';
import { Coordinates } from '../geometry/Coordinates';
import { Angle } from '../geometry/Angle';
import { Vector } from '../geometry/Vector';
import { Sprite } from '../graphics/Sprite';
import { EntityScript } from '../events/EntityScript';

export type EntityProps = Readonly<{
  name: string;
  centerCoordinates: Coordinates;
  angle: Angle;
  speed?: Vector;
  maxSpeed?: number;
  friction?: number;
  sprite: Sprite;
  tags?: string[];
  scripts?: EntityScript[];
  behaviors?: EntityBehavior[];
}>;
