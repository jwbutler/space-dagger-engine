import { CanvasGraphicsImpl } from './CanvasGraphicsImpl';
import { ImageType } from './images/ImageType';
import { Dimensions } from '../geometry/Dimensions';
import { Coordinates } from '../geometry/Coordinates';
import { Rect } from '../geometry/Rect';
import { Angle } from '../geometry/Angle';

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
  fillCircle: (centerCoordinates: Coordinates, radius: number, color: string) => void;
  fillOval: (rect: Rect, color: string) => void;
  fillPolygon: (points: Coordinates[], color: string) => void;
  drawImage: (image: ImageType, topLeft: Coordinates) => void;
  drawScaledImage: (image: ImageType, rect: Rect) => void;
  drawRotatedImage: (
    image: ImageType,
    centerCoordinates: Coordinates,
    angle: Angle,
    origin: Coordinates
  ) => void;
  drawRect: (rect: Rect, color: string) => void;
  drawText: (text: string, font: string, color: string, topLeft: Coordinates) => void;
  fill: (color: string) => void;
  fillRect: (rect: Rect, color: string) => void;
  clear: () => void;
  drawOnto: (target: Graphics, params?: DrawOntoParams) => void;
}

export namespace Graphics {
  export const create = (props: GraphicsProps): Graphics => new CanvasGraphicsImpl(props);
}
