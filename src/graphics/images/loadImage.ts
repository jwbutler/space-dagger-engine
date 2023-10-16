import { ImageType } from './ImageType';
import { Coordinates, Dimensions } from '../../geometry';

export type LoadImageParams = Readonly<{
  dimensions?: Dimensions;
  origin?: Coordinates;
}>;

export const loadImage = async (
  filename: string,
  params?: LoadImageParams
): Promise<ImageType> => {
  const image = new Image();

  return new Promise(resolve => {
    image.addEventListener('load', () => {
      const dimensions = params?.dimensions ?? {
        width: image.width,
        height: image.height
      };
      resolve({
        delegate: image,
        dimensions,
        origin: params?.origin ?? { x: image.width / 2, y: image.height / 2 }
      });
    });
    image.src = filename;
  });
};
