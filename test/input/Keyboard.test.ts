import { getModifiers, Keyboard, ModifierKey } from '../../src/input/Keyboard';
import { Engine } from '../../src';
import { expect, test, describe, vi } from 'vitest';

describe('Keyboard', () => {
  const engine = {
    keyDown: () => {},
    keyUp: () => {}
  } as unknown as Engine;
  const keyboard = Keyboard.create();
  const window = {
    addEventListener: () => {}
  } as unknown as Window;

  test('register', () => {
    const addEventListener_spy = vi.spyOn(window, 'addEventListener');
    keyboard.registerEventHandlers(window, engine);
    expect(addEventListener_spy).toHaveBeenCalledWith('keydown', keyboard.keyDown);
    expect(addEventListener_spy).toHaveBeenCalledWith('keyup', keyboard.keyUp);
    addEventListener_spy.mockClear();
  });

  test('4 keys down', () => {
    expect(keyboard.getHeldKeys()).toEqual([]);
    keyboard.keyDown({ code: 'ArrowUp', timeStamp: 1000 } as KeyboardEvent);
    keyboard.keyDown({ code: 'ArrowDown', timeStamp: 1000 } as KeyboardEvent);
    keyboard.keyDown({ code: 'ArrowLeft', timeStamp: 1000 } as KeyboardEvent);
    keyboard.keyDown({ code: 'ArrowRight', timeStamp: 1000 } as KeyboardEvent);
    const expected = [
      { code: 'ArrowUp', isDoubleTap: false },
      { code: 'ArrowDown', isDoubleTap: false },
      { code: 'ArrowLeft', isDoubleTap: false },
      { code: 'ArrowRight', isDoubleTap: false }
    ];
    expect(keyboard.getHeldKeys()).toEqual(expected);
  });

  test('2/4 keys up', () => {
    keyboard.keyUp({ code: 'ArrowLeft', timeStamp: 1100 } as KeyboardEvent);
    keyboard.keyUp({ code: 'ArrowRight', timeStamp: 1100 } as KeyboardEvent);
    const expected = [
      { code: 'ArrowUp', isDoubleTap: false },
      { code: 'ArrowDown', isDoubleTap: false }
    ];
    expect(keyboard.getHeldKeys()).toEqual(expected);
  });

  test('4/4 keys up', () => {
    keyboard.keyUp({ code: 'ArrowUp', timeStamp: 1200 } as KeyboardEvent);
    keyboard.keyUp({ code: 'ArrowDown', timeStamp: 1200 } as KeyboardEvent);
    expect(keyboard.getHeldKeys()).toEqual([]);
  });

  test('double tap', () => {
    expect(keyboard.getHeldKeys()).toEqual([]);

    keyboard.keyDown({ code: 'ArrowUp', timeStamp: 3000 } as KeyboardEvent);
    {
      const expected = [{ code: 'ArrowUp', isDoubleTap: false }];
      expect(keyboard.getHeldKeys()).toEqual(expected);
    }

    keyboard.keyUp({ code: 'ArrowUp', timeStamp: 3100 } as KeyboardEvent);
    {
      expect(keyboard.getHeldKeys()).toEqual([]);
    }

    keyboard.keyDown({ code: 'ArrowUp', timeStamp: 3200 } as KeyboardEvent);
    {
      const expected = [{ code: 'ArrowUp', isDoubleTap: true }];
      expect(keyboard.getHeldKeys()).toEqual(expected);
    }

    keyboard.keyUp({ code: 'ArrowUp', timeStamp: 3300 } as KeyboardEvent);
    {
      expect(keyboard.getHeldKeys()).toEqual([]);
    }
  });

  test('ignores repeating event', () => {
    const event = { repeat: true } as KeyboardEvent;
    keyboard.keyDown(event);
    expect(keyboard.getHeldKeys()).toEqual([]);
  });
});

describe('getModifiers', () => {
  test('alt', () => {
    const event = { altKey: true } as KeyboardEvent;
    expect(getModifiers(event)).toEqual(new Set([ModifierKey.ALT]));
  });

  test('ctrl', () => {
    const event = { ctrlKey: true } as KeyboardEvent;
    expect(getModifiers(event)).toEqual(new Set([ModifierKey.CTRL]));
  });

  test('shift', () => {
    const event = { shiftKey: true } as KeyboardEvent;
    expect(getModifiers(event)).toEqual(new Set([ModifierKey.SHIFT]));
  });

  test('all', () => {
    const event = { altKey: true, ctrlKey: true, shiftKey: true } as KeyboardEvent;
    expect(getModifiers(event)).toEqual(
      new Set([ModifierKey.ALT, ModifierKey.CTRL, ModifierKey.SHIFT])
    );
  });

  test('none', () => {
    const event = {} as KeyboardEvent;
    expect(getModifiers(event)).toEqual(new Set());
  });
});
