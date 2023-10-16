import { test, expect, vi } from 'vitest';
import { loadImage } from '../../../src/graphics';

test('loadImage', async () => {
  const mockImage = {
    addEventListener: (_: string, callback: () => void) => {
      callback();
    }
  };
  const mockDocument = {
    createElement: () => mockImage
  };
  vi.stubGlobal('document', mockDocument);
  expect(await loadImage('test')).toBe(mockImage);
  vi.unstubAllGlobals();
});
