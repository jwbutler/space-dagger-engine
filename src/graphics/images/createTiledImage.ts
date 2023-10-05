import { Dimensions } from '../../geometry/Dimensions';

export const createTiledImage = (
  image: ImageBitmap,
  dimensions: Dimensions
): Promise<ImageBitmap> => {
  const canvas = document.createElement('canvas');
  canvas.width = dimensions.width;
  canvas.height = dimensions.height;
  const context = canvas.getContext('2d')!;
  for (let y = 0; y < dimensions.height; y += image.height) {
    for (let x = 0; x < dimensions.width; x += image.width) {
      context.drawImage(image, x, y);
    }
  }
  return createImageBitmap(canvas);
};
