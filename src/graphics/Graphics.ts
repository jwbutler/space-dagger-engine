import { Dimensions } from '../geometry/Dimensions';
import { Coordinates } from '../geometry/Coordinates.ts';
import { Rect } from '../geometry/Rect.ts';
import { CanvasGraphicsImpl } from './CanvasGraphicsImpl.ts';
import { Angle } from '../geometry/Angle.ts';

export type DrawImageParams = Readonly<{
  rotation: Angle;
}>;

export interface Graphics {
  attach: (root: HTMLElement) => void;
  drawCircle: (centerCoordinates: Coordinates, radius: number, color: string) => void;
  drawPolygon: (points: Coordinates[], color: string) => void;
  drawImage: (image: ImageBitmap, topLeft: Coordinates, params?: DrawImageParams) => void;
  drawText: (text: string, font: string, color: string, topLeft: Coordinates) => void;
  fill: (color: string) => void;
  fillRect: (rect: Rect, color: string) => void;
  clear: () => void;
}

export namespace Graphics {
  export const create = (dimensions: Dimensions): Graphics => new CanvasGraphicsImpl(dimensions);
}
