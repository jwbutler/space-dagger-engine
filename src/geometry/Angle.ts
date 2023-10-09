import { Coordinates } from './Coordinates';
import { Vector } from './Vector';

export type Angle = Readonly<{
  degrees: number;
  radians: number;
}>;

const degreesToRadians = (degrees: number): number => (degrees * Math.PI) / 180;

const radiansToDegrees = (radians: number): number => (radians * 180) / Math.PI;

export namespace Angle {
  export const ofRadians = (radians: number): Angle => ({
    radians: radians,
    degrees: radiansToDegrees(radians)
  });

  export const ofDegrees = (degrees: number): Angle => ({
    degrees: degrees,
    radians: degreesToRadians(degrees)
  });

  export const rotateClockwise = (first: Angle, second: Angle): Angle =>
    Angle.clamp({
      degrees: first.degrees + second.degrees,
      radians: first.radians + second.radians
    });

  export const rotateCounterClockwise = (first: Angle, second: Angle): Angle =>
    Angle.clamp({
      degrees: first.degrees - second.degrees,
      radians: first.radians - second.radians
    });

  export const between = (source: Coordinates, target: Coordinates): Angle => {
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const radians = Math.atan2(dy, dx);
    return Angle.ofRadians(radians);
  };

  export const fromVector = (vector: Vector): Angle =>
    Angle.ofRadians(Math.atan2(vector.y, vector.x));

  export const clamp = (angle: Angle): Angle => ({
    degrees: clampDegrees(angle.degrees),
    radians: clampRadians(angle.radians)
  });
}

const clampDegrees = (degrees: number) => (degrees + 360) % 360;
const clampRadians = (radians: number) => (radians + Math.PI * 2) % (Math.PI * 2);
