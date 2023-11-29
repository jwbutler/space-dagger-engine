import { getMouseButtons, Mouse, MouseButton } from '../../src/input/Mouse';
import { Engine } from '../../src';
import { test, expect, describe, vi } from 'vitest';

describe('Mouse', () => {
  const mouse = Mouse.create();
  const window = {
    addEventListener: vi.fn(() => {})
  } as unknown as Window;
  const engine = {
    mouseDown: vi.fn(() => {}),
    mouseUp: vi.fn(() => {})
  } as unknown as Engine;

  test('init', () => {
    expect(mouse.getHeldButtons()).toEqual([]);
  });

  test('register', () => {
    mouse.registerEventHandlers(window, engine);
  });

  test('mouseDown', () => {
    mouse.mouseDown({ buttons: 2, x: 123, y: 456 } as MouseEvent);
    expect(mouse.getHeldButtons()).toEqual([MouseButton.RIGHT]);
    expect(engine.mouseDown).toHaveBeenCalledWith({
      button: MouseButton.RIGHT,
      pixel: { x: 123, y: 456 }
    });
  });

  test('mouseUp (ignored)', () => {
    mouse.mouseUp({ buttons: 1, x: 234, y: 567 } as MouseEvent);
    expect(mouse.getHeldButtons()).toEqual([MouseButton.RIGHT]);
    expect(engine.mouseUp).toHaveBeenCalledWith({
      button: MouseButton.LEFT,
      pixel: { x: 234, y: 567 }
    });
  });

  test('mouseUp', () => {
    vi.resetAllMocks();
    mouse.mouseUp({ buttons: 3, x: 67, y: 89 } as MouseEvent);
    expect(mouse.getHeldButtons()).toEqual([]);
    expect(engine.mouseUp).toHaveBeenCalledWith({
      button: MouseButton.LEFT,
      pixel: { x: 67, y: 89 }
    });
    expect(engine.mouseUp).toHaveBeenCalledWith({
      button: MouseButton.RIGHT,
      pixel: { x: 67, y: 89 }
    });
  });

  test('touchStart', () => {
    mouse.touchStart({
      touches: [{ pageX: 33, pageY: 44 }]
    } as unknown as TouchEvent);
    expect(engine.mouseDown).toHaveBeenCalledWith({
      button: MouseButton.LEFT,
      pixel: { x: 33, y: 44 }
    });
  });

  test('touchEnd', () => {
    mouse.touchEnd({
      touches: [{ pageX: 55, pageY: 66 }]
    } as unknown as TouchEvent);
    expect(engine.mouseUp).toHaveBeenCalledWith({
      button: MouseButton.LEFT,
      pixel: { x: 55, y: 66 }
    });
  });
});

describe('getMouseButtons', () => {
  test('left', () => {
    const event = { buttons: 1 } as MouseEvent;
    expect(getMouseButtons(event)).toEqual(new Set([MouseButton.LEFT]));
  });

  test('right', () => {
    const event = { buttons: 2 } as MouseEvent;
    expect(getMouseButtons(event)).toEqual(new Set([MouseButton.RIGHT]));
  });

  test('midddle', () => {
    const event = { buttons: 4 } as MouseEvent;
    expect(getMouseButtons(event)).toEqual(new Set([MouseButton.MIDDLE]));
  });

  test('left + right', () => {
    const event = { buttons: 3 } as MouseEvent;
    expect(getMouseButtons(event)).toEqual(
      new Set([MouseButton.LEFT, MouseButton.RIGHT])
    );
  });

  test('ctrl + left = right', () => {
    const event = { buttons: 1, ctrlKey: true } as MouseEvent;
    expect(getMouseButtons(event)).toEqual(new Set([MouseButton.RIGHT]));
  });
});
