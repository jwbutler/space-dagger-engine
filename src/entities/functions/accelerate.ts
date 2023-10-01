import { Vector } from '../../geometry/Vector';
import { Entity } from '../Entity';

type PartialEntity = Pick<Entity, 'getSpeed' | 'setSpeed' | 'getMaxSpeed'>;

export const accelerate = (entity: PartialEntity, acceleration: Vector, dt: number): void => {
  const currentSpeed = entity.getSpeed();
  const multipliedAcceleration = Vector.multiply(acceleration, dt);
  let newSpeed = Vector.plus(currentSpeed, multipliedAcceleration);
  const maxSpeed = entity.getMaxSpeed();
  if (maxSpeed !== null && Vector.magnitude(newSpeed) > maxSpeed) {
    newSpeed = Vector.withMagnitude(newSpeed, maxSpeed);
  }
  entity.setSpeed(newSpeed);
};
