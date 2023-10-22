import { Graphics, UIElement, UserInterface } from '../../../src/graphics';
import { test, expect, describe } from 'vitest';

describe('UserInterface', () => {
  const graphics = {} as Graphics;
  const userInterface = UserInterface.create({ graphics });

  test('init', () => {
    expect(userInterface.getUIElements()).toEqual([]);
  });

  test('addUIElement', () => {
    const uiElement = {} as UIElement;
    userInterface.addUIElement(uiElement);
    expect(userInterface.getUIElements()).toEqual([uiElement]);
  });

  test('clear', () => {
    userInterface.clear();
    expect(userInterface.getUIElements()).toEqual([]);
  });
});
