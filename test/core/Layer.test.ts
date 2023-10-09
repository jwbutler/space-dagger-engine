import { test, describe, expect } from 'vitest';
import { LayerImpl } from '../../src/core/LayerImpl';
import { Graphics } from '../../src/graphics';

describe('Layer', () => {
  test('layer', () => {
    const image = {} as ImageBitmap;
    const graphics = {} as Graphics;
    const layer = new LayerImpl({
      backgroundColor: 'red',
      backgroundImage: image,
      depth: 3,
      graphics: graphics,
      name: 'test',
      parallax: { horizontal: 0.5, vertical: 0.75 }
    });

    expect(layer.getBackgroundColor()).toBe('red');
    expect(layer.getBackgroundImage()).toBe(image);
    expect(layer.getGraphics()).toBe(graphics);
    expect(layer.getName()).toBe('test');
    expect(layer.getParallax()).toEqual({ horizontal: 0.5, vertical: 0.75 });
    expect(layer.getDepth()).toEqual(3);

    layer.setBackgroundColor('blue');
    expect(layer.getBackgroundColor()).toBe('blue');
    layer.setBackgroundImage(null);
    expect(layer.getBackgroundImage()).toBe(null);
  });
});
