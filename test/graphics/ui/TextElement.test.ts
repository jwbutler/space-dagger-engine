import { Graphics, TextElement } from '../../../src/graphics';
import { test, expect, describe, vi } from 'vitest';

describe('TextElement', () => {
  const textElement = TextElement.create({
    color: 'blue',
    font: '12pt Comic Sans',
    text: 'what',
    topLeft: { x: 10, y: 20 }
  });
  test('init', () => {
    expect(textElement.getText()).toBe('what');
  });
  test('get/set text', () => {
    textElement.setText('no');
    expect(textElement.getText()).toBe('no');
  });

  test('render', () => {
    const mockGraphics = {
      drawText: () => {}
    } as unknown as Graphics;
    const drawText_spy = vi.spyOn(mockGraphics, 'drawText');

    textElement.render(mockGraphics);
    expect(drawText_spy).toHaveBeenCalledWith('no', '12pt Comic Sans', 'blue', {
      x: 10,
      y: 20
    });
  });
});
