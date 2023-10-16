import { test, expect, vi } from 'vitest';
import { loadSvgImage } from '../../../src/graphics';

test('loadSvgImage', async () => {
  const mockImage = {
    addEventListener: (_: string, callback: () => void) => {
      callback();
    }
  } as HTMLImageElement;
  const mockDocument = {
    createElement: () => mockImage
  };
  vi.stubGlobal('document', mockDocument);
  expect(await loadSvgImage('test', { width: 2, height: 3 })).toBe(mockImage);
  expect(mockImage.width).toBe(2);
  expect(mockImage.height).toBe(3);
  vi.unstubAllGlobals();
});
