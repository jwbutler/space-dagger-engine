import { Entity } from '../Entity';
import { Vector } from '../../geometry';

/**
 * Thanks for nothing ChatGPT
 */
export const applyFriction = (entity: Entity, dt: number): void => {
  const friction = entity.getFriction();
  const multiplier = Math.exp(Math.log(1 - friction) * dt);
  const multipliedSpeed = Vector.magnitude(entity.getSpeed()) * multiplier;
  entity.setSpeed(Vector.withMagnitude(entity.getSpeed(), multipliedSpeed));
};
