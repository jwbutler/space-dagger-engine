import { Entity } from '../entities/Entity.ts';
import { Angle } from '../geometry/Angle.ts';
import { Coordinates } from '../geometry/Coordinates.ts';
import { createTargetSprite } from './targetSprite.ts';
import { BounceOffEdgesBehavior } from '../entities/behaviors/BounceOffEdgesBehavior.ts';
import { Vector } from '../geometry/Vector.ts';
import { ENTITY_NAME_MOVING_TARGET, ENTITY_NAME_PLAYER_SHIP } from '../core/constants.ts';
import { EntityScript } from '../entities/EntityScript.ts';
import { Scene } from '../core/Scene.ts';
import { checkNotNull } from '../utils/preconditions.ts';
import { isCollidingWith } from '../entities/functions/isCollidingWith.ts';
import { gameOver } from './gameOver.ts';

type Props = Readonly<{
  color: string;
  centerCoordinates: Coordinates;
}>;

const SPEED = 100;

const script: EntityScript = {
  update: (movingTarget: Entity, scene: Scene) => {
    const playerShip = checkNotNull(scene.getEntitiesByName(ENTITY_NAME_PLAYER_SHIP)[0]);
    if (isCollidingWith(movingTarget, playerShip)) {
      gameOver();
    }
  }
};

export const createMovingTarget = ({ color, centerCoordinates }: Props): Entity => {
  const angleOfMovement = Angle.ofDegrees(Math.random() * 360);
  return Entity.create({
    name: ENTITY_NAME_MOVING_TARGET,
    centerCoordinates,
    angle: Angle.ofDegrees(0),
    speed: Vector.fromAngle(angleOfMovement, SPEED),
    sprite: createTargetSprite({ color }),
    behaviors: [BounceOffEdgesBehavior.create({ coefficient: 1.0 })],
    script
  });
};
