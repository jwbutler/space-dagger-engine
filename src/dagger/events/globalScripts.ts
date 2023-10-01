import { GlobalScript } from '../../events/GlobalScript.ts';
import { TickEvent } from '../../events/TickEvent.ts';
import {
  ENTITY_NAME_MOVING_TARGET,
  ENTITY_NAME_SEEKER,
  ENTITY_NAME_SHOOTER,
  ENTITY_NAME_TARGET,
  MOVING_TARGETS_COUNT,
  SCENE_HEIGHT,
  SCENE_WIDTH,
  SEEKERS_COUNT,
  SHOOTERS_COUNT,
  TARGETS_COUNT
} from '../../core/constants.ts';
import { createMovingTarget } from '../movingTargets.ts';
import { createTarget } from '../targets.ts';
import { createSeeker } from '../seeker.ts';
import { createShooter } from '../shooter.ts';

export const maintainEnemies: GlobalScript = {
  onTick: (event: TickEvent) => {
    const { scene } = event;

    const targets = scene.getEntitiesByName(ENTITY_NAME_TARGET);
    if (targets.length < TARGETS_COUNT) {
      const x = Math.random() * SCENE_WIDTH;
      const y = Math.random() * SCENE_HEIGHT;
      const target = createTarget({
        color: 'lime',
        centerCoordinates: { x, y }
      });
      scene.addEntity(target);
    }

    const movingTargets = scene.getEntitiesByName(ENTITY_NAME_MOVING_TARGET);
    if (movingTargets.length < MOVING_TARGETS_COUNT) {
      const x = Math.random() * SCENE_WIDTH;
      const y = Math.random() * SCENE_HEIGHT;
      const target = createMovingTarget({
        color: 'blue',
        centerCoordinates: { x, y }
      });
      scene.addEntity(target);
    }

    const seekers = scene.getEntitiesByName(ENTITY_NAME_SEEKER);
    if (seekers.length < SEEKERS_COUNT) {
      const x = Math.random() * SCENE_WIDTH;
      const y = Math.random() * SCENE_HEIGHT;
      const target = createSeeker({
        centerCoordinates: { x, y }
      });
      scene.addEntity(target);
    }

    const shooters = scene.getEntitiesByName(ENTITY_NAME_SHOOTER);
    if (shooters.length < SHOOTERS_COUNT) {
      const x = Math.random() * SCENE_WIDTH;
      const y = Math.random() * SCENE_HEIGHT;
      const target = createShooter({
        centerCoordinates: { x, y }
      });
      scene.addEntity(target);
    }
  }
};
