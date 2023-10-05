import { Dimensions } from '../geometry/Dimensions';
import { Coordinates } from '../geometry/Coordinates';
import { Rect } from '../geometry/Rect';
import { CanvasGraphicsImpl } from './CanvasGraphicsImpl';
import { Angle } from '../geometry/Angle';

export type DrawImageParams = Readonly<{
  rect?: Rect;
  topLeft?: Coordinates;
  rotation?: Angle;
}>;

export type DrawOntoParams = Readonly<{
  sourceRect?: Rect;
  destRect?: Rect;
}>;

export type GraphicsProps = Readonly<{
  id: string;
  dimensions: Dimensions;
}>;

export interface Graphics {
  attach: (root: HTMLElement) => void;
  getDimensions: () => Dimensions;
  drawCircle: (centerCoordinates: Coordinates, radius: number, color: string) => void;
  drawPolygon: (points: Coordinates[], color: string) => void;
  drawImage: (image: ImageBitmap, params?: DrawImageParams) => void;
  drawText: (text: string, font: string, color: string, topLeft: Coordinates) => void;
  fill: (color: string) => void;
  fillRect: (rect: Rect, color: string) => void;
  clear: () => void;
  drawOnto: (target: Graphics, params?: DrawOntoParams) => void;
}

export namespace Graphics {
  export const create = ({ id, dimensions }: GraphicsProps): Graphics =>
    new CanvasGraphicsImpl({ id, dimensions });
}
