import { Entity } from '../entities/Entity.ts';
import { Angle } from '../geometry/Angle.ts';
import { Vector } from '../geometry/Vector.ts';
import { createVectorSprite } from './shipSprite.ts';
import {
  ENTITY_NAME_PLAYER_SHIP,
  SHIP_MAX_SPEED,
  SHIP_RADIUS,
  STARTING_FUEL
} from '../core/constants.ts';
import { CameraFollowBehavior } from '../entities/behaviors/CameraFollowBehavior.ts';
import { Coordinates } from '../geometry/Coordinates.ts';
import { ShipScript } from './ShipScript.ts';
import { BounceOffEdgesBehavior } from '../entities/behaviors/BounceOffEdgesBehavior.ts';
import { checkNotNull } from '../utils/preconditions.ts';
import { Scene } from '../core/Scene.ts';

export const BULLET_COOLDOWN = 0.25;
export const VAR_KEY_SCORE = 'score';
export const VAR_KEY_FUEL = 'fuel';

type Props = Readonly<{
  centerCoordinates: Coordinates;
}>;

export const createPlayerShip = async ({ centerCoordinates }: Props): Promise<Entity> => {
  // const image = await loadImageBitmap('heavy_assault_fighter.png');
  const ship = Entity.create({
    name: 'ship',
    centerCoordinates,
    angle: Angle.ofDegrees(0),
    speed: Vector.zero(),
    sprite: createVectorSprite({ color: 'red' }),
    // sprite: createRasterSprite({ image }),
    maxSpeed: SHIP_MAX_SPEED,
    script: ShipScript.create(),
    behaviors: [CameraFollowBehavior.create(), BounceOffEdgesBehavior.create({ coefficient: 0.5 })]
  });
  setFuel(ship, STARTING_FUEL);
  setScore(ship, 0);
  return ship;
};

export const setFuel = (ship: Entity, amount: number): void => {
  ship.setStringVariable(VAR_KEY_FUEL, `${amount}`);
};

export const getFuel = (ship: Entity): number => {
  return parseFloat(checkNotNull(ship.getStringVariable(VAR_KEY_FUEL)));
};

/** TODO HACK! This should not be stored on the ship */
export const getScore = (ship: Entity): number => {
  return parseFloat(checkNotNull(ship.getStringVariable(VAR_KEY_SCORE)));
};

/** TODO HACK! This should not be stored on the ship */
export const setScore = (ship: Entity, value: number): void => {
  ship.setStringVariable(VAR_KEY_SCORE, `${value}`);
};

export const spendFuel = (ship: Entity, amount: number): void => {
  const fuel = Math.max(0, getFuel(ship) - amount);
  setFuel(ship, fuel);
};

export const getNoseCoordinates = (ship: Entity) => {
  const center = ship.getCenterCoordinates();
  const angle = ship.getAngle();
  return {
    x: center.x + SHIP_RADIUS * Math.cos(angle.radians),
    y: center.y + SHIP_RADIUS * Math.sin(angle.radians)
  };
};

export const getPlayerShip = (scene: Scene): Entity => {
  return checkNotNull(scene.getEntitiesByName(ENTITY_NAME_PLAYER_SHIP)[0]);
};
