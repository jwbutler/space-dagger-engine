import { Dimensions } from '../../geometry/Dimensions';
import { ImageType } from '../ImageType';
import { Coordinates } from '../../geometry';

export const createTiledImage = async (
  image: ImageType,
  dimensions: Dimensions
): Promise<ImageType> => {
  const canvas = document.createElement('canvas');
  canvas.width = dimensions.width;
  canvas.height = dimensions.height;
  const context = canvas.getContext('2d')!;
  for (let y = 0; y < dimensions.height; y += image.dimensions.height) {
    for (let x = 0; x < dimensions.width; x += image.dimensions.width) {
      context.drawImage(image.delegate, x, y);
    }
  }
  return {
    delegate: await createImageBitmap(canvas),
    dimensions,
    origin: Coordinates.zero() // hopefully we don't need to rotate this thing
  };
};
