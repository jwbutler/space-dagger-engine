import { test, expect, describe, vi } from 'vitest';
import { Graphics, Meter } from '../../../src/graphics';

describe('Meter', () => {
  describe('non-empty border', () => {
    const meter = Meter.create({
      color: 'blue',
      emptyColor: 'black',
      borderColor: 'white',
      maxValue: 100,
      value: 60,
      rect: { left: 1, top: 2, width: 5, height: 4 }
    });

    test('init', () => {
      expect(meter.getValue()).toBe(60);
    });

    test('get/set value', () => {
      meter.setValue(80);
      expect(meter.getValue()).toBe(80);
    });

    test('render', () => {
      const mockGraphics = {
        drawRect: () => {},
        fillRect: () => {}
      } as unknown as Graphics;
      const fillRect_spy = vi.spyOn(mockGraphics, 'fillRect');
      const drawRect_spy = vi.spyOn(mockGraphics, 'drawRect');

      meter.render(mockGraphics);
      expect(fillRect_spy).toHaveBeenCalledTimes(2);
      expect(fillRect_spy).toHaveBeenNthCalledWith(
        1,
        { left: 1, top: 2, width: 5, height: 4 },
        'black'
      );
      expect(fillRect_spy).toHaveBeenNthCalledWith(
        2,
        { left: 1, top: 2, width: 4, height: 4 },
        'blue'
      );
      expect(drawRect_spy).toHaveBeenCalledWith(
        { left: 1, top: 2, width: 5, height: 4 },
        'white'
      );
    });
  });

  describe('empty border', () => {
    const meter = Meter.create({
      color: 'blue',
      emptyColor: 'black',
      maxValue: 100,
      value: 60,
      rect: { left: 1, top: 2, width: 5, height: 4 }
    });

    test('render', () => {
      const mockGraphics = {
        drawRect: () => {},
        fillRect: () => {}
      } as unknown as Graphics;
      const drawRect_spy = vi.spyOn(mockGraphics, 'drawRect');

      meter.render(mockGraphics);
      expect(drawRect_spy).not.toHaveBeenCalled();
    });
  });
});
