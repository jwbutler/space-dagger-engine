import { describe, test, vi, expect } from 'vitest';
import { CanvasGraphicsImpl } from '../../src/graphics/CanvasGraphicsImpl';
import { Angle } from '../../src/geometry';

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
    fillStyle: undefined,
    font: undefined
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
    ellipseSpy.mockClear();
  });

  test('polygon', () => {
    const lineToSpy = vi.spyOn(mockContext, 'lineTo');
    const points = [
      { x: 10, y: 10 },
      { x: 20, y: 10 },
      { x: 20, y: 20 },
      { x: 10, y: 20 }
    ];
    graphics.drawPolygon(points, 'red');
    for (let i = 0; i < points.length; i++) {
      // toHaveBeenNthCalledWith is 1-indexed (ugh)
      expect(lineToSpy).toHaveBeenNthCalledWith(i + 1, points[i].x, points[i].y);
    }
    expect(lineToSpy).toHaveBeenNthCalledWith(5, points[0].x, points[0].y);
    expect(mockContext.fillStyle).toBe('red');
    lineToSpy.mockClear();
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

  test('drawImage (top-left)', () => {
    const drawImageSpy = vi.spyOn(mockContext, 'drawImage');
    const image = {} as unknown;
    graphics.drawImage(image, {
      topLeft: { x: 10, y: 12 }
    });
    expect(drawImageSpy).toHaveBeenCalledWith(image, 10, 12);
    drawImageSpy.mockClear();
  });

  test('drawImage (rect)', () => {
    const drawImageSpy = vi.spyOn(mockContext, 'drawImage');
    const image = {} as unknown;
    graphics.drawImage(image, {
      rect: { left: 5, top: 6, width: 7, height: 8 }
    });
    expect(drawImageSpy).toHaveBeenCalledWith(image, 5, 6);
    drawImageSpy.mockClear();
  });

  test('drawImage (default position)', () => {
    const drawImageSpy = vi.spyOn(mockContext, 'drawImage');
    const image = {} as unknown;
    graphics.drawImage(image);
    expect(drawImageSpy).toHaveBeenCalledWith(image, 0, 0);
    drawImageSpy.mockClear();
  });

  test('drawImage (rotation)', () => {
    const drawImageSpy = vi.spyOn(mockContext, 'drawImage');
    const translateSpy = vi.spyOn(mockContext, 'translate');
    const image = {
      width: 20,
      height: 20
    } as unknown;
    graphics.drawImage(image, {
      rotation: Angle.ofDegrees(90)
    });
    expect(translateSpy).toHaveBeenCalledWith(10, 10);
    expect(drawImageSpy).toHaveBeenCalledWith(image, -10, -10);
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

  documentStub.clearAllMocks();
});
