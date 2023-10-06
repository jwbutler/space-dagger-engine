import { Coordinates } from './Coordinates';

export type Angle = Readonly<{
  degrees: number;
  radians: number;
}>;

const degreesToRadians = (degrees: number): number => (degrees * Math.PI) / 180;

const radiansToDegrees = (radians: number): number => (radians * 180) / Math.PI;

export namespace Angle {
  export const ofRadians = (radians: number): Angle => ({
    radians: clampRadians(radians),
    degrees: clampDegrees(radiansToDegrees(radians))
  });

  export const ofDegrees = (degrees: number): Angle => ({
    degrees: clampDegrees(degrees),
    radians: clampRadians(degreesToRadians(degrees))
  });

  export const rotateClockwise = (first: Angle, second: Angle): Angle => ({
    degrees: clampDegrees(first.degrees + second.degrees),
    radians: clampRadians(first.radians + second.radians)
  });

  export const rotateCounterClockwise = (first: Angle, second: Angle): Angle => ({
    degrees: clampDegrees(first.degrees - second.degrees),
    radians: clampRadians(first.radians - second.radians)
  });

  export const between = (source: Coordinates, target: Coordinates): Angle => {
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const radians = Math.atan2(dy, dx);
    return Angle.ofRadians(radians);
  };
}

const clampDegrees = (degrees: number) => (degrees + 360) % 360;
const clampRadians = (radians: number) => (radians + Math.PI * 2) % (Math.PI * 2);
