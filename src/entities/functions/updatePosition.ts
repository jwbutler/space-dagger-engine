import { Coordinates } from '../../geometry/Coordinates';
import { Entity } from '../Entity';
import { Vector } from '../../geometry/Vector';

export const updatePosition = (entity: Entity, dt: number): void => {
  const centerCoordinates = Coordinates.plus(
    entity.getCenterCoordinates(),
    Vector.multiply(entity.getSpeed(), dt)
  );
  entity.setCenterCoordinates(centerCoordinates);
};
