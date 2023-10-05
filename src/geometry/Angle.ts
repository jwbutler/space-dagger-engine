import { Coordinates } from './Coordinates';

export type Angle = Readonly<{
  degrees: number;
  radians: number;
}>;

const degreesToRadians = (degrees: number): number => (degrees * Math.PI) / 180;

const radiansToDegrees = (radians: number): number => (radians * 180) / Math.PI;

export namespace Angle {
  export const ofRadians = (radians: number): Angle => ({
    radians,
    degrees: radiansToDegrees(radians)
  });

  export const ofDegrees = (degrees: number): Angle => ({
    degrees,
    radians: degreesToRadians(degrees)
  });

  export const rotateClockwise = (first: Angle, second: Angle): Angle => ({
    degrees: (first.degrees + second.degrees + 360) % 360,
    radians: (first.radians + second.radians + Math.PI * 2) % (Math.PI * 2)
  });

  export const rotateCounterClockwise = (first: Angle, second: Angle): Angle => ({
    degrees: (first.degrees - second.degrees + 360) % 360,
    radians: (first.radians - second.radians + Math.PI * 2) % (Math.PI * 2)
  });

  export const between = (source: Coordinates, target: Coordinates): Angle => {
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const radians = Math.atan2(dy, dx);
    return Angle.ofRadians(radians);
  };
}
