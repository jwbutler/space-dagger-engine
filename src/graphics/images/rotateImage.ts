import type { ImageType } from './ImageType';
import { Angle } from '../../geometry';
import { rotateVector } from '../../geometry/functions/rotateVector';

export const rotateImage = (image: ImageType, angle: Angle): ImageType => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;

  /*const boundingRect = (() => {
    const imageRect = Rect.fromDimensions(image.dimensions);
    const vertices = Rect.getVertices(imageRect);
    const transformedVertices = vertices
      .map(vertex => Coordinates.minus(vertex, image.origin))
      .map(vertex => rotateVector(vertex, angle));
    return Rect.containingPoints(transformedVertices);
  })();*/
  canvas.width = image.dimensions.width;
  canvas.height = image.dimensions.height;

  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate#examples
  context.save();
  const { origin } = image;
  context.translate(image.origin.x, image.origin.y);
  context.rotate(angle.radians);
  context.drawImage(image.delegate, -image.origin.x, -image.origin.y);
  context.restore();
  return {
    delegate: canvas,
    dimensions: { width: canvas.width, height: canvas.height },
    origin: rotateVector(origin, angle)
  };
};
