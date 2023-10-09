import { Coordinates } from '../geometry/Coordinates';
import { Angle } from '../geometry/Angle';
import { Vector } from '../geometry/Vector';
import { Sprite } from '../graphics/Sprite';
import { EntityScript } from '../events/EntityScript';
import { EntityBehavior } from './behaviors/EntityBehavior';
import { Layer } from '../core/Layer';

export type EntityProps = Readonly<{
  name: string;
  layer: Layer;
  centerCoordinates: Coordinates;
  angle: Angle;
  speed?: Vector;
  maxSpeed?: number;
  friction?: number;
  sprite: Sprite;
  script?: EntityScript;
  behaviors?: EntityBehavior[];
}>;
