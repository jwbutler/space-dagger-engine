import { Coordinates } from '../geometry/Coordinates';
import { Angle } from '../geometry/Angle';
import { Vector } from '../geometry/Vector';
import { Sprite } from '../graphics/Sprite';
import { EntityScript } from './EntityScript';
import { EntityBehavior } from './behaviors/EntityBehavior';

export type EntityProps = Readonly<{
  name: string;
  centerCoordinates: Coordinates;
  angle: Angle;
  speed?: Vector;
  maxSpeed?: number;
  sprite: Sprite;
  script?: EntityScript;
  behaviors?: EntityBehavior[];
}>;
