import { describe, test, vi, expect } from 'vitest';
import { CanvasGraphicsImpl } from '../../src/graphics/CanvasGraphicsImpl';

describe('CanvasGraphicsImpl', () => {
  const mockContext = {
    beginPath: () => {},
    ellipse: () => {},
    stroke: () => {},
    fill: () => {},
    closePath: () => {}
  };
  const documentStub = vi.stubGlobal('document', {
    createElement: () => ({
      getContext: () => mockContext
    })
  });

  const graphics = new CanvasGraphicsImpl({
    id: 'test',
    dimensions: { width: 100, height: 100 }
  });

  test('circle', () => {
    const ellipseSpy = vi.spyOn(mockContext, 'ellipse');
    graphics.drawCircle({ x: 20, y: 20 }, 10, 'red');
    expect(ellipseSpy).toHaveBeenCalledWith(20, 20, 10, 10, 0, 0, Math.PI * 2);
  });

  documentStub.clearAllMocks();
});
