import { renderUserInterface } from '../../src/graphics/renderUserInterface';
import { Graphics, Element } from '../../src/graphics';
import { Scene } from '../../src';
import { test, expect, vi } from 'vitest';

test('renderUserInterface', () => {
  const graphics = {
    clear: () => {}
  } as Graphics;
  const element = {
    render: () => {}
  } as Element;

  const scene = {
    getElements: () => [element]
  } as Scene;
  const element_render_spy = vi.spyOn(element, 'render');
  renderUserInterface(scene, graphics);
  expect(element_render_spy).toHaveBeenCalledWith(graphics);
});
