import { Vector } from '../../geometry/Vector';
import { Entity } from '../Entity';

export const applyAcceleration = (entity: Entity, dt: number): void => {
  const currentSpeed = entity.getSpeed();
  const acceleration = entity.getAcceleration();
  const multipliedAcceleration = Vector.multiply(acceleration, dt);
  let newSpeed = Vector.plus(currentSpeed, multipliedAcceleration);
  const maxSpeed = entity.getMaxSpeed();
  if (maxSpeed !== null && Vector.magnitude(newSpeed) > maxSpeed) {
    newSpeed = Vector.withMagnitude(newSpeed, maxSpeed);
  }
  entity.setSpeed(newSpeed);
};
