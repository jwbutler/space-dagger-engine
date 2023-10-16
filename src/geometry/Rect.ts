import { Coordinates } from './Coordinates';
import { Dimensions } from './Dimensions';

export type Rect = Readonly<{
  left: number;
  top: number;
  width: number;
  height: number;
}>;

export namespace Rect {
  export const containingPoints = (points: Coordinates[]): Rect => {
    const left = Math.min(...points.map(point => point.x));
    const top = Math.min(...points.map(point => point.y));
    const right = Math.max(...points.map(point => point.x));
    const bottom = Math.max(...points.map(point => point.y));

    return {
      left,
      top,
      width: right - left,
      height: bottom - top
    };
  };

  export const allBalls = (): Rect => ({
    left: 0,
    top: 0,
    width: 0,
    height: 0
  });

  export const fromDimensions = (dimensions: Dimensions): Rect => ({
    left: 0,
    top: 0,
    ...dimensions
  });

  export const overlaps = (first: Rect, second: Rect): boolean => {
    return (
      second.left < first.left + first.width &&
      first.left < second.left + second.width &&
      second.top < first.top + first.height &&
      first.top < second.top + second.height
    );
  };

  export const contains = (first: Rect, second: Rect): boolean => {
    return (
      second.left >= first.left &&
      second.left + second.width <= first.left + first.width &&
      second.top >= first.top &&
      second.top + second.height <= first.top + first.height
    );
  };

  export const getTopLeft = (rect: Rect): Coordinates => ({
    x: rect.left,
    y: rect.top
  });

  export const getVertices = (rect: Rect): Coordinates[] => {
    const { left, top, width, height } = rect;
    const right = left + width;
    const bottom = top + height;

    return [
      { x: left, y: top },
      { x: right, y: top },
      { x: left, y: bottom },
      { x: right, y: bottom }
    ];
  };
}
