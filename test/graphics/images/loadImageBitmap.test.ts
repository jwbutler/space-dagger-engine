import { loadImageBitmap } from '../../../src/graphics';
import { test, expect, vi } from 'vitest';

test('loadImageBitmap', async () => {
  const mockImage = {
    addEventListener: (_: string, callback: () => void) => {
      callback();
    }
  };
  const mockDocument = {
    createElement: () => mockImage
  };
  vi.stubGlobal('document', mockDocument);
  const createImageBitmap_mock = vi.fn();
  vi.stubGlobal('createImageBitmap', createImageBitmap_mock);
  await loadImageBitmap('test');
  expect(createImageBitmap_mock).toHaveBeenCalledWith(mockImage);
  vi.unstubAllGlobals();
});
