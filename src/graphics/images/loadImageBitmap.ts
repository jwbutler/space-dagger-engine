export const loadImageBitmap = async (filename: string): Promise<ImageBitmap> => {
  const img = document.createElement('img');
  return new Promise(resolve => {
    img.addEventListener('load', () => {
      resolve(createImageBitmap(img));
    });
    img.src = filename;
  });
};
