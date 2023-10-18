import { renderUserInterface } from '../../src/graphics/renderUserInterface';
import { Graphics, UIElement, UserInterface } from '../../src/graphics';
import { test, expect } from 'vitest';

test('render user interface', () => {
  const graphics = {
    clear: () => {}
  } as Graphics;
  let rendered = false;
  const uiElement = {
    render: () => {
      rendered = true;
    }
  } as UIElement;
  const userInterface = {
    getGraphics: () => graphics,
    getUIElements: () => [uiElement]
  } as Partial<UserInterface> as UserInterface;
  renderUserInterface(userInterface);
  expect(rendered).toBe(true);
});
