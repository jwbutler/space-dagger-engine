import { EntityProps } from './EntityProps';
import { EntityImpl } from './EntityImpl';
import { EntityBehavior } from './behaviors/EntityBehavior';
import { Coordinates } from '../geometry/Coordinates';
import { Vector } from '../geometry/Vector';
import { Sprite } from '../graphics/Sprite';
import { Angle } from '../geometry/Angle';
import { EntityScript } from '../events/EntityScript';
import { Engine } from '../core/Engine';

export interface Entity {
  /**
   * This should be unique for every entity
   */
  getId: () => string;
  /**
   * Typically this is the name of an entity "class", so it's not expected to be unique
   */
  getName: () => string;
  getCenterCoordinates: () => Coordinates;
  setCenterCoordinates: (coordinates: Coordinates) => void;
  getAngle: () => Angle;
  setAngle: (angle: Angle) => void;
  getSprite: () => Sprite;
  setSprite: (sprite: Sprite) => void;
  getSpeed: () => Vector;
  setSpeed: (speed: Vector) => void;
  getMaxSpeed: () => number | null;
  setMaxSpeed: (maxSpeed: number | null) => void;
  getAcceleration: () => Vector;
  setAcceleration: (acceleration: Vector) => void;
  /**
   * @return a number between 0 and 1
   * If friction is 0.05, this means the entity's speed is reduced by 0.05 each second
   */
  getFriction: () => number;
  setFriction: (friction: number) => void;

  getScripts: () => EntityScript[];
  getBehaviors: () => EntityBehavior[];
  getStringVariable: (key: string) => string | null;
  setStringVariable: (key: string, value: string | null) => void;
  getTags: () => Set<string>;
  addTag: (tag: string) => void;
  hasTag: (tag: string) => boolean;

  init: (engine: Engine) => void;
}

export namespace Entity {
  export const create = (props: EntityProps): Entity => new EntityImpl(props);
}
