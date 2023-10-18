import { Graphics, UIElement, UserInterface } from '../../../src/graphics';
import { test, expect, describe } from 'vitest';

describe('UserInterface', () => {
  test('UI elements', () => {
    const graphics = {} as Graphics;
    const userInterface = UserInterface.create({ graphics });
    expect(userInterface.getUIElements()).toEqual([]);
    const uiElement = {} as UIElement;
    userInterface.addUIElement(uiElement);
    expect(userInterface.getUIElements()).toEqual([uiElement]);
  });
});
