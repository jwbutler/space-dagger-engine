import { test, expect, vi } from 'vitest';
import { createTiledImage } from '../../src/graphics';
import { Dimensions } from '../../src/geometry';

test('createTiledImage', async () => {
  const image = {
    width: 20,
    height: 20
  } as unknown;
  const context = {
    drawImage: () => {}
  };
  const mockDocument = {
    createElement: () => {
      return {
        getContext: () => context
      };
    }
  };
  vi.stubGlobal('document', mockDocument);
  let createdImageBitmapDimensions: Dimensions | null = null;
  vi.stubGlobal('createImageBitmap', (canvas: { width: number; height: number }) => {
    createdImageBitmapDimensions = { width: canvas.width, height: canvas.height };
  });
  const drawImageMock = vi.spyOn(context, 'drawImage');

  await createTiledImage(image, { width: 50, height: 50 });

  expect(drawImageMock).toHaveBeenCalledWith(image, 0, 0);
  expect(drawImageMock).toHaveBeenCalledWith(image, 20, 0);
  expect(drawImageMock).toHaveBeenCalledWith(image, 40, 0);
  expect(drawImageMock).toHaveBeenCalledWith(image, 0, 20);
  expect(drawImageMock).toHaveBeenCalledWith(image, 20, 20);
  expect(drawImageMock).toHaveBeenCalledWith(image, 40, 20);
  expect(drawImageMock).toHaveBeenCalledWith(image, 0, 40);
  expect(drawImageMock).toHaveBeenCalledWith(image, 20, 40);
  expect(drawImageMock).toHaveBeenCalledWith(image, 40, 40);
  expect(createdImageBitmapDimensions).toEqual({ width: 50, height: 50 });
  vi.unstubAllGlobals();
});
