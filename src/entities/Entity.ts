import { Coordinates } from '../geometry/Coordinates';
import { Vector } from '../geometry/Vector';
import { Sprite } from '../graphics/Sprite';
import { Angle } from '../geometry/Angle';
import { EntityScript } from './EntityScript';
import { EntityProps } from './EntityProps';
import { EntityImpl } from './EntityImpl';
import { EntityBehavior } from './behaviors/EntityBehavior';

export interface Entity {
  getName: () => string;
  getCenterCoordinates: () => Coordinates;
  setCenterCoordinates: (coordinates: Coordinates) => void;
  getAngle: () => Angle;
  setAngle: (angle: Angle) => void;
  getSprite: () => Sprite;
  setSpeed: (speed: Vector) => void;
  getSpeed: () => Vector;
  getMaxSpeed: () => number | null;
  setMaxSpeed: (maxSpeed: number | null) => void;
  getScript: () => EntityScript | null;
  getBehaviors: () => EntityBehavior[];
  addBehavior: (behavior: EntityBehavior) => void;

  getStringVariable: (key: string) => string | null;
  setStringVariable: (key: string, value: string | null) => void;
}

export namespace Entity {
  export const create = (props: EntityProps): Entity => new EntityImpl(props);
}
