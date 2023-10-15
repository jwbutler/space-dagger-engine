import { ImageType } from '../ImageType';
import { Coordinates } from '../../geometry';

export type LoadImageParams = Readonly<{
  origin?: Coordinates;
}>;

export const loadImage = async (
  filename: string,
  params?: LoadImageParams
): Promise<ImageType> => {
  const image = new Image();

  return new Promise(resolve => {
    image.addEventListener('load', () => {
      resolve({
        delegate: image,
        dimensions: { width: image.width, height: image.height },
        origin: params?.origin ?? { x: image.width / 2, y: image.height / 2 }
      });
    });
    image.src = filename;
  });
};
