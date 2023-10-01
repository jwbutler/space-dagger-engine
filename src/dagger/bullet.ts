import { Entity } from '../entities/Entity';
import { Angle } from '../geometry/Angle';
import { Vector } from '../geometry/Vector';
import { Coordinates } from '../geometry/Coordinates';
import { createBulletSprite } from './bulletSprite.ts';
import { BULLET_SPEED, ENTITY_NAME_PLAYER_SHIP } from '../core/constants';
import { EntityScript } from '../entities/EntityScript';
import { Scene } from '../core/Scene';
import { getEntitiesOverlappingRect } from '../entities/functions/getEntitiesOverlappingRect';
import { getPlayerShip, getScore, setScore } from './playerShip.ts';
import { checkNotNull } from '../utils/preconditions.ts';
import { gameOver } from './gameOver.ts';

type Props = Readonly<{
  color: string;
  centerCoordinates: Coordinates;
  angle: Angle;
  targetNames: string[];
}>;

const createBulletScript = (): EntityScript => ({
  update: (bullet: Entity, scene: Scene) => {
    const bulletRect = bullet.getSprite().getBoundingRect(bullet);
    const overlappingEntities = getEntitiesOverlappingRect(bulletRect, scene);
    const targetNames = getTargetNames(bullet);
    for (const overlappingEntity of overlappingEntities) {
      if (targetNames.has(overlappingEntity.getName())) {
        scene.removeEntity(overlappingEntity);
        scene.removeEntity(bullet);

        // HACK HACK HACK
        if (overlappingEntity.getName() === ENTITY_NAME_PLAYER_SHIP) {
          gameOver();
        } else {
          const playerShip = getPlayerShip(scene);
          setScore(playerShip, getScore(playerShip) + 1);
        }
        break;
      }
    }
  }
});

export const createBullet = ({ color, centerCoordinates, angle, targetNames }: Props): Entity => {
  const bullet = Entity.create({
    name: 'bullet',
    centerCoordinates,
    angle,
    speed: Vector.fromAngle(angle, BULLET_SPEED),
    sprite: createBulletSprite({ color }),
    script: createBulletScript()
  });
  bullet.setStringVariable('target_names', targetNames.join(','));
  return bullet;
};

export const getTargetNames = (bullet: Entity): Set<string> => {
  return new Set(checkNotNull(bullet.getStringVariable('target_names')).split(','));
};
