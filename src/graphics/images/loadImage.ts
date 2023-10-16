export const loadImage = async (filename: string): Promise<HTMLImageElement> => {
  const img = document.createElement('img');
  return new Promise(resolve => {
    img.addEventListener('load', () => {
      resolve(img);
    });
    img.src = filename;
  });
};
