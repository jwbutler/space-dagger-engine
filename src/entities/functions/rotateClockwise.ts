import { Angle } from '../../geometry/Angle';
import { Entity } from '../Entity';

type PartialEntity = Pick<Entity, 'getAngle' | 'setAngle'>;

export const rotateClockwise = (entity: PartialEntity, angle: Angle): void => {
  const rotated = Angle.rotateClockwise(entity.getAngle(), angle);
  entity.setAngle(rotated);
};
