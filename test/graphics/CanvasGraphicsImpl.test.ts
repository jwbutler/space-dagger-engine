import { CanvasGraphicsImpl } from '../../src/graphics/CanvasGraphicsImpl';
import { Angle } from '../../src/geometry';
import { afterAll, describe, expect, test, vi } from 'vitest';

/**
 * This file consists of some extreme "white-box testing" - just stepping through
 * the implementation and asserting that it's calling the functions it's defined to call.
 * But I think that's still good?
 */
describe('CanvasGraphicsImpl', () => {
  const mockContext = {
    beginPath: () => {},
    ellipse: () => {},
    stroke: () => {},
    fill: () => {},
    closePath: () => {},
    lineTo: () => {},
    fillRect: () => {},
    drawImage: () => {},
    save: () => {},
    translate: () => {},
    rotate: () => {},
    restore: () => {},
    fillText: () => {},
    clearRect: () => {},
    putImageData: () => {},
    strokeRect: () => {}
  } as unknown as CanvasRenderingContext2D;
  const mockCanvas = {
    getContext: () => mockContext
  };
  const documentStub = vi.stubGlobal('document', {
    createElement: () => mockCanvas
  });

  const graphics = new CanvasGraphicsImpl({
    id: 'test',
    dimensions: { width: 100, height: 100 }
  });

  test('fillCircle', () => {
    const ellipseSpy = vi.spyOn(mockContext, 'ellipse');
    graphics.fillCircle({ x: 20, y: 20 }, 10, 'red');
    expect(ellipseSpy).toHaveBeenCalledWith(20, 20, 10, 10, 0, 0, Math.PI * 2);
    ellipseSpy.mockClear();
  });

  test('fillOval', () => {
    const ellipseSpy = vi.spyOn(mockContext, 'ellipse');
    graphics.fillOval({ left: 10, top: 20, width: 30, height: 40 }, 'red');
    expect(ellipseSpy).toHaveBeenCalledWith(25, 40, 15, 20, 0, 0, Math.PI * 2);
    ellipseSpy.mockClear();
  });

  test('fillPolygon', () => {
    const lineTo_spy = vi.spyOn(mockContext, 'lineTo');
    const fill_spy = vi.spyOn(mockContext, 'fill');
    const points = [
      { x: 10, y: 10 },
      { x: 20, y: 10 },
      { x: 20, y: 20 },
      { x: 10, y: 20 }
    ];
    graphics.fillPolygon(points, 'red');
    for (let i = 0; i < points.length; i++) {
      // toHaveBeenNthCalledWith is 1-indexed (ugh)
      expect(lineTo_spy).toHaveBeenNthCalledWith(i + 1, points[i].x, points[i].y);
    }
    expect(lineTo_spy).toHaveBeenNthCalledWith(5, points[0].x, points[0].y);
    expect(mockContext.fillStyle).toBe('red');
    expect(fill_spy).toHaveBeenCalled();
    lineTo_spy.mockClear();
    fill_spy.mockClear();
  });

  test('fillRect', () => {
    const fillRectSpy = vi.spyOn(mockContext, 'fillRect');
    const rect = { left: 30, top: 10, width: 10, height: 20 };
    graphics.fillRect(rect, 'blue');
    expect(fillRectSpy).toHaveBeenCalledWith(30, 10, 10, 20);
    expect(mockContext.fillStyle).toBe('blue');
    fillRectSpy.mockClear();
  });

  test('fill', () => {
    const fillRectSpy = vi.spyOn(mockContext, 'fillRect');
    graphics.fill('yellow');
    expect(fillRectSpy).toHaveBeenCalledWith(0, 0, 100, 100);
    expect(mockContext.fillStyle).toBe('yellow');
    fillRectSpy.mockClear();
  });

  test('drawImage', () => {
    const drawImageSpy = vi.spyOn(mockContext, 'drawImage');
    const image = {} as ImageBitmap;
    graphics.drawImage(image, { x: 10, y: 12 });
    expect(drawImageSpy).toHaveBeenCalledWith(image, 10, 12);
    drawImageSpy.mockClear();
  });

  test('drawScaledImage', () => {
    const drawImageSpy = vi.spyOn(mockContext, 'drawImage');
    const image = {} as ImageBitmap;
    graphics.drawScaledImage(image, { left: 5, top: 6, width: 7, height: 8 });
    expect(drawImageSpy).toHaveBeenCalledWith(image, 5, 6, 7, 8);
    drawImageSpy.mockClear();
  });

  test('drawRotatedImage', () => {
    const drawImageSpy = vi.spyOn(mockContext, 'drawImage');
    const translateSpy = vi.spyOn(mockContext, 'translate');
    const image = {
      width: 20,
      height: 20
    } as ImageBitmap;
    graphics.drawRotatedImage(image, { x: 2, y: 3 }, Angle.ofDegrees(90), {
      x: 10,
      y: 10
    });
    expect(translateSpy).toHaveBeenCalledWith(2, 3);
    expect(drawImageSpy).toHaveBeenCalledWith(image, -10, -10, 20, 20);
    drawImageSpy.mockClear();
    translateSpy.mockClear();
  });

  test('drawText', () => {
    const fillTextSpy = vi.spyOn(mockContext, 'fillText');
    graphics.drawText('what', '12pt Arial', 'magenta', { x: 30, y: 40 });
    expect(fillTextSpy).toHaveBeenCalledWith('what', 30, 40);
    expect(mockContext.fillStyle).toBe('magenta');
    expect(mockContext.font).toBe('12pt Arial');
    fillTextSpy.mockClear();
  });

  test('drawRect', () => {
    const strokeRectSpy = vi.spyOn(mockContext, 'strokeRect');
    graphics.drawRect({ left: 1, top: 2, width: 3, height: 4 }, '#00ffff');
    expect(mockContext.strokeStyle).toBe('#00ffff');
    expect(mockContext.lineWidth).toBe(1);
    expect(strokeRectSpy).toHaveBeenCalledWith(1, 2, 3, 4);
  });

  test('drawPolygon', () => {
    const lineTo_Spy = vi.spyOn(mockContext, 'lineTo');
    const fill_spy = vi.spyOn(mockContext, 'fill');
    const points = [
      { x: 10, y: 10 },
      { x: 20, y: 10 },
      { x: 20, y: 20 },
      { x: 10, y: 20 }
    ];
    graphics.drawPolygon(points, '#808000');
    for (let i = 0; i < points.length; i++) {
      // toHaveBeenNthCalledWith is 1-indexed (ugh)
      expect(lineTo_Spy).toHaveBeenNthCalledWith(i + 1, points[i].x, points[i].y);
    }
    expect(lineTo_Spy).toHaveBeenNthCalledWith(5, points[0].x, points[0].y);
    expect(fill_spy).not.toHaveBeenCalled();
    expect(mockContext.fillStyle).toBe('#808000');
    lineTo_Spy.mockClear();
    fill_spy.mockClear();
  });

  test('clear', () => {
    const clearRectSpy = vi.spyOn(mockContext, 'clearRect');
    graphics.clear();
    expect(clearRectSpy).toHaveBeenCalledWith(0, 0, 100, 100);
    clearRectSpy.mockClear();
  });

  describe('drawOnto', () => {
    const otherContext = {
      drawImage: () => {}
    };
    const other = {
      context: otherContext,
      getDimensions: () => ({ width: 32, height: 48 })
    } as unknown as CanvasGraphicsImpl;
    const drawImageSpy = vi.spyOn(otherContext, 'drawImage');

    const sourceRect = { left: 10, top: 11, width: 12, height: 13 };
    const destRect = { left: 14, top: 15, width: 16, height: 17 };

    test('both rects', () => {
      graphics.drawOnto(other, {
        sourceRect,
        destRect
      });
      expect(drawImageSpy).toHaveBeenCalledWith(
        mockCanvas,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17
      );
      drawImageSpy.mockClear();
    });
    test('default rects', () => {
      graphics.drawOnto(other);
      expect(drawImageSpy).toHaveBeenCalledWith(mockCanvas, 0, 0, 100, 100, 0, 0, 32, 48);
    });
    drawImageSpy.mockClear();
  });

  test('putImageData', () => {
    const putImageData_spy = vi.spyOn(mockContext, 'putImageData');
    const imageData = {} as ImageData;
    graphics.putImageData(imageData);
    expect(putImageData_spy).toHaveBeenCalledWith(imageData, 0, 0);
    putImageData_spy.mockClear();
  });

  afterAll(() => {
    documentStub.clearAllMocks();
  });
});
