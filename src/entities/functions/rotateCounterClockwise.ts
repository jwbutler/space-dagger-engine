import { Angle } from '../../geometry/Angle';
import { Entity } from '../Entity';

type PartialEntity = Pick<Entity, 'getAngle' | 'setAngle'>;

export const rotateCounterClockwise = (entity: PartialEntity, angle: Angle): void => {
  const rotated = Angle.rotateCounterClockwise(entity.getAngle(), angle);
  entity.setAngle(rotated);
};
