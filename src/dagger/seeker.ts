import { Entity } from '../entities/Entity.ts';
import { Angle } from '../geometry/Angle.ts';
import { Coordinates } from '../geometry/Coordinates.ts';
import { createTargetSprite } from './targetSprite.ts';
import { BounceOffEdgesBehavior } from '../entities/behaviors/BounceOffEdgesBehavior.ts';
import { Vector } from '../geometry/Vector.ts';
import { ENTITY_NAME_PLAYER_SHIP, ENTITY_NAME_SEEKER } from '../core/constants.ts';
import { EntityScript } from '../entities/EntityScript.ts';
import { Scene } from '../core/Scene.ts';
import { checkNotNull } from '../utils/preconditions.ts';
import { getCurrentTimeSeconds } from '../utils/getCurrentTimeMillis.ts';
import { randFloat, randInt } from '../utils/Random.ts';
import { isCollidingWith } from '../entities/functions/isCollidingWith.ts';
import { gameOver } from './gameOver.ts';

type Props = Readonly<{
  centerCoordinates: Coordinates;
}>;

const MIN_SPEED = 150;
const MAX_SPEED = 250;
const MIN_UPDATE_INTERVAL = 0.75;
const MAX_UPDATE_INTERVAL = 1.5;
const VISION_DISTANCE = 600;
const NEXT_UPDATE_KEY = 'next_update';

const script: EntityScript = {
  update: (seeker: Entity, scene: Scene) => {
    const currentTime = getCurrentTimeSeconds();
    if (currentTime >= getNextUpdateTime(seeker)) {
      const playerShip = checkNotNull(scene.getEntitiesByName(ENTITY_NAME_PLAYER_SHIP)[0]);
      if (
        Coordinates.distance(seeker.getCenterCoordinates(), playerShip.getCenterCoordinates()) <=
        VISION_DISTANCE
      ) {
        const angle = Angle.between(
          seeker.getCenterCoordinates(),
          playerShip.getCenterCoordinates()
        );
        seeker.setAngle(angle);
        seeker.setSpeed(Vector.fromAngle(angle, randInt(MIN_SPEED, MAX_SPEED)));
      }
      setNextUpdateTime(seeker, currentTime + randFloat(MIN_UPDATE_INTERVAL, MAX_UPDATE_INTERVAL));
    }

    const playerShip = checkNotNull(scene.getEntitiesByName(ENTITY_NAME_PLAYER_SHIP)[0]);
    if (isCollidingWith(seeker, playerShip)) {
      gameOver();
    }
  }
};

export const createSeeker = ({ centerCoordinates }: Props): Entity => {
  const angleOfMovement = Angle.ofDegrees(Math.random() * 360);
  const seeker = Entity.create({
    name: ENTITY_NAME_SEEKER,
    centerCoordinates,
    angle: Angle.ofDegrees(0),
    speed: Vector.fromAngle(angleOfMovement, MIN_SPEED),
    sprite: createTargetSprite({ color: 'red' }),
    behaviors: [BounceOffEdgesBehavior.create({ coefficient: 1.0 })],
    script
  });
  setNextUpdateTime(
    seeker,
    getCurrentTimeSeconds() + randFloat(MIN_UPDATE_INTERVAL, MAX_UPDATE_INTERVAL)
  );
  return seeker;
};

const getNextUpdateTime = (seeker: Entity): number => {
  const variable = checkNotNull(seeker.getStringVariable(NEXT_UPDATE_KEY));
  return parseFloat(variable);
};

const setNextUpdateTime = (seeker: Entity, timeSeconds: number): void => {
  seeker.setStringVariable(NEXT_UPDATE_KEY, `${timeSeconds}`);
};
