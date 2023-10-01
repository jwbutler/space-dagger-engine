import { Entity } from '../entities/Entity.ts';
import { Angle } from '../geometry/Angle.ts';
import { Coordinates } from '../geometry/Coordinates.ts';
import { createTargetSprite } from './targetSprite.ts';
import { BounceOffEdgesBehavior } from '../entities/behaviors/BounceOffEdgesBehavior.ts';
import { Vector } from '../geometry/Vector.ts';
import { ENTITY_NAME_PLAYER_SHIP, ENTITY_NAME_SHOOTER } from '../core/constants.ts';
import { EntityScript } from '../entities/EntityScript.ts';
import { Scene } from '../core/Scene.ts';
import { checkNotNull } from '../utils/preconditions.ts';
import { getCurrentTimeSeconds } from '../utils/getCurrentTimeMillis.ts';
import { randFloat, randInt } from '../utils/Random.ts';
import { isCollidingWith } from '../entities/functions/isCollidingWith.ts';
import { gameOver } from './gameOver.ts';
import { createBullet } from './bullet.ts';
import distance = Coordinates.distance;
import { getPlayerShip } from './playerShip.ts';

type Props = Readonly<{
  centerCoordinates: Coordinates;
}>;

const MIN_SPEED = 100;
const MAX_SPEED = 200;
const MIN_UPDATE_INTERVAL = 0.25;
const MAX_UPDATE_INTERVAL = 0.75;
const MIN_SHOOT_INTERVAL = 1.5;
const MAX_SHOOT_INTERVAL = 3.0;
const VISION_DISTANCE = 800;
const SHOOT_DISTANCE = 200;
const NEXT_UPDATE_KEY = 'next_update';
const NEXT_SHOT_KEY = 'next_shot';

const script: EntityScript = {
  update: (shooter: Entity, scene: Scene) => {
    const currentTime = getCurrentTimeSeconds();
    if (currentTime >= getNextUpdateTime(shooter)) {
      const playerShip = getPlayerShip(scene);
      const distanceToPlayer = Coordinates.distance(
        shooter.getCenterCoordinates(),
        playerShip.getCenterCoordinates()
      );
      if (distanceToPlayer <= VISION_DISTANCE) {
        const angle = Angle.between(
          shooter.getCenterCoordinates(),
          playerShip.getCenterCoordinates()
        );
        shooter.setAngle(angle);
        shooter.setSpeed(Vector.fromAngle(angle, randInt(MIN_SPEED, MAX_SPEED)));
      }
      setNextUpdateTime(
        shooter,
        currentTime + randFloat(MIN_UPDATE_INTERVAL, MAX_UPDATE_INTERVAL)
      );
    }

    const playerShip = checkNotNull(scene.getEntitiesByName(ENTITY_NAME_PLAYER_SHIP)[0]);
    if (isCollidingWith(shooter, playerShip)) {
      gameOver();
    }

    const nextShotTime = getNextShotTime(shooter);
    if (nextShotTime === null || currentTime >= nextShotTime) {
      const distanceToPlayer = distance(
        shooter.getCenterCoordinates(),
        playerShip.getCenterCoordinates()
      );
      if (distanceToPlayer <= SHOOT_DISTANCE) {
        const bullet = createBullet({
          color: '#00ffff',
          centerCoordinates: shooter.getCenterCoordinates(),
          angle: shooter.getAngle(),
          targetNames: [ENTITY_NAME_PLAYER_SHIP]
        });
        scene.addEntity(bullet);
        setNextShotTime(
          shooter,
          nextShotTime + randFloat(MIN_SHOOT_INTERVAL, MAX_SHOOT_INTERVAL)
        );
      }
    }
  }
};

export const createShooter = ({ centerCoordinates }: Props): Entity => {
  const angleOfMovement = Angle.ofDegrees(Math.random() * 360);
  const shooter = Entity.create({
    name: ENTITY_NAME_SHOOTER,
    centerCoordinates,
    angle: Angle.ofDegrees(0),
    speed: Vector.fromAngle(angleOfMovement, MIN_SPEED),
    sprite: createTargetSprite({ color: '#ffff00' }),
    behaviors: [BounceOffEdgesBehavior.create({ coefficient: 1.0 })],
    script
  });
  const currentTime = getCurrentTimeSeconds();
  setNextUpdateTime(
    shooter,
    currentTime + randFloat(MIN_UPDATE_INTERVAL, MAX_UPDATE_INTERVAL)
  );
  setNextShotTime(
    shooter,
    currentTime + randFloat(MIN_SHOOT_INTERVAL, MAX_SHOOT_INTERVAL)
  );
  return shooter;
};

const getNextUpdateTime = (shooter: Entity): number => {
  const variable = checkNotNull(shooter.getStringVariable(NEXT_UPDATE_KEY));
  return parseFloat(variable);
};

const setNextUpdateTime = (shooter: Entity, timeSeconds: number): void => {
  shooter.setStringVariable(NEXT_UPDATE_KEY, `${timeSeconds}`);
};

const getNextShotTime = (shooter: Entity): number => {
  const variable = checkNotNull(shooter.getStringVariable(NEXT_SHOT_KEY));
  return parseFloat(variable);
};

const setNextShotTime = (shooter: Entity, timeSeconds: number): void => {
  shooter.setStringVariable(NEXT_SHOT_KEY, `${timeSeconds}`);
};
