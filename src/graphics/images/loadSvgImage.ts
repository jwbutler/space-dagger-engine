import { Dimensions } from '../../geometry';

export const loadSvgImage = async (
  filename: string,
  dimensions: Dimensions
): Promise<HTMLImageElement> => {
  const img = document.createElement('img');
  return new Promise(resolve => {
    img.addEventListener('load', () => {
      img.width = dimensions.width;
      img.height = dimensions.height;
      resolve(img);
    });
    img.src = filename;
  });
};
