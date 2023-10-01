import { Vector } from './Vector';

export type Coordinates = Readonly<{
  x: number;
  y: number;
}>;

export namespace Coordinates {
  export const plus = (coordinates: Coordinates, vector: Vector): Coordinates => {
    return {
      x: coordinates.x + vector.x,
      y: coordinates.y + vector.y
    };
  };

  export const zero = (): Coordinates => ({ x: 0, y: 0 });

  export const distance = (first: Coordinates, second: Coordinates): number => {
    const dx = second.x - first.x;
    const dy = second.y - first.y;
    return Math.hypot(dx, dy);
  };
}
