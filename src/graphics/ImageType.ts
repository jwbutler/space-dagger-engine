// Badly named to avoid collision with native type
import { Coordinates, Dimensions } from '../geometry';

export type ImageType = Readonly<{
  delegate: ImageBitmap | HTMLImageElement | HTMLCanvasElement;
  dimensions: Dimensions;
  origin: Coordinates;
}>;
