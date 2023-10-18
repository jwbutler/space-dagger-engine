import { Angle } from './Angle';
import { Coordinates } from './Coordinates';
import { Entity } from '../entities';

export type Vector = Readonly<{
  x: number;
  y: number;
}>;

export namespace Vector {
  export const magnitude = (vector: Vector): number => Math.hypot(vector.x, vector.y);

  export const zero = (): Vector => ({ x: 0, y: 0 });

  export const fromAngle = (angle: Angle, magnitude: number): Vector => {
    return {
      x: magnitude * Math.cos(angle.radians),
      y: magnitude * Math.sin(angle.radians)
    };
  };

  export const plus = (first: Vector, second: Vector): Vector => {
    return {
      x: first.x + second.x,
      y: first.y + second.y
    };
  };

  export const multiply = (vector: Vector, multiplier: number): Vector => ({
    x: vector.x * multiplier,
    y: vector.y * multiplier
  });

  export const withMagnitude = (vector: Vector, magnitude: number): Vector => {
    const currentMagnitude = Vector.magnitude(vector);
    if (currentMagnitude === 0) {
      return vector;
    }
    const ratio = magnitude / currentMagnitude;
    return {
      x: vector.x * ratio,
      y: vector.y * ratio
    };
  };

  export const rotate = (vector: Vector, angle: Angle): Vector => {
    const currentAngle = Angle.fromVector(vector);
    const magnitude = Vector.magnitude(vector);
    return Vector.fromAngle(
      Angle.ofRadians(currentAngle.radians + angle.radians),
      magnitude
    );
  };

  export const between = (start: Coordinates, end: Coordinates): Vector => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    return { x: dx, y: dy };
  };

  export const betweenEntities = (start: Entity, end: Entity): Vector => {
    return Vector.between(start.getCenterCoordinates(), end.getCenterCoordinates());
  };
}
