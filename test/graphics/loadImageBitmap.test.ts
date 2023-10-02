import { test, expect, vi } from 'vitest';
import { loadImageBitmap } from '../../src/graphics';

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
  let imgElementArg: unknown = null;
  vi.stubGlobal('createImageBitmap', (arg: unknown) => {
    imgElementArg = arg;
  });
  await loadImageBitmap('test');
  expect(imgElementArg).toBe(mockImage);
  vi.unstubAllGlobals();
});
