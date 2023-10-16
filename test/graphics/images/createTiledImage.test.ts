import { test, expect, vi } from 'vitest';
import { createTiledImage } from '../../../src/graphics';
import { Dimensions } from '../../../src/geometry';
import { ImageType } from '../../../src/graphics/images/ImageType';

test('createTiledImage', async () => {
  const imageBitmap = {} as ImageBitmap;
  const image = {
    delegate: imageBitmap,
    dimensions: {
      width: 20,
      height: 20
    }
  } as ImageType;
  const context = {
    drawImage: () => {}
  } as unknown as CanvasRenderingContext2D;
  const mockDocument = {
    createElement: () => {
      return {
        getContext: () => context
      } as unknown as HTMLCanvasElement;
    }
  };
  vi.stubGlobal('document', mockDocument);
  let createdImageBitmapDimensions: Dimensions | null = null;
  vi.stubGlobal('createImageBitmap', (canvas: { width: number; height: number }) => {
    createdImageBitmapDimensions = { width: canvas.width, height: canvas.height };
  });
  const drawImageMock = vi.spyOn(context, 'drawImage');

  await createTiledImage(image, { width: 50, height: 50 });

  expect(drawImageMock).toHaveBeenCalledWith(imageBitmap, 0, 0);
  expect(drawImageMock).toHaveBeenCalledWith(imageBitmap, 20, 0);
  expect(drawImageMock).toHaveBeenCalledWith(imageBitmap, 40, 0);
  expect(drawImageMock).toHaveBeenCalledWith(imageBitmap, 0, 20);
  expect(drawImageMock).toHaveBeenCalledWith(imageBitmap, 20, 20);
  expect(drawImageMock).toHaveBeenCalledWith(imageBitmap, 40, 20);
  expect(drawImageMock).toHaveBeenCalledWith(imageBitmap, 0, 40);
  expect(drawImageMock).toHaveBeenCalledWith(imageBitmap, 20, 40);
  expect(drawImageMock).toHaveBeenCalledWith(imageBitmap, 40, 40);
  expect(createdImageBitmapDimensions).toEqual({ width: 50, height: 50 });
  vi.unstubAllGlobals();
});
