import { Coordinates } from '../Coordinates';
import { Angle } from '../Angle';
import { Vector } from '../Vector';

export const rotateVector = (vector: Vector, rotationAngle: Angle): Coordinates => {
  const currentAngle = Angle.fromVector(vector);
  const newAngle = Angle.rotateClockwise(currentAngle, rotationAngle);
  return Vector.fromAngle(newAngle, Vector.magnitude(vector));
};
