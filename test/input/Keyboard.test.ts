import { Keyboard } from '../../src/input/Keyboard';
import { expect, test } from 'vitest';

test('input state', () => {
  const keyboard = Keyboard.create();
  expect(keyboard.getHeldKeys()).toEqual([]);
  keyboard.keyDown({ code: 'ArrowUp', timeStamp: 1000 } as KeyboardEvent);
  keyboard.keyDown({ code: 'ArrowDown', timeStamp: 1000 } as KeyboardEvent);
  keyboard.keyDown({ code: 'ArrowLeft', timeStamp: 1000 } as KeyboardEvent);
  keyboard.keyDown({ code: 'ArrowRight', timeStamp: 1000 } as KeyboardEvent);
  {
    const expected = [
      { code: 'ArrowUp', isDoubleTap: false },
      { code: 'ArrowDown', isDoubleTap: false },
      { code: 'ArrowLeft', isDoubleTap: false },
      { code: 'ArrowRight', isDoubleTap: false }
    ];
    expect(keyboard.getHeldKeys()).toEqual(expected);
  }
  keyboard.keyUp({ code: 'ArrowLeft', timeStamp: 1100 } as KeyboardEvent);
  keyboard.keyUp({ code: 'ArrowRight', timeStamp: 1100 } as KeyboardEvent);
  {
    const expected = [
      { code: 'ArrowUp', isDoubleTap: false },
      { code: 'ArrowDown', isDoubleTap: false }
    ];
    expect(keyboard.getHeldKeys()).toEqual(expected);
  }
});

test('register', () => {
  const listeners: Record<string, unknown> = {};
  const mockWindow = {
    addEventListener: (event: string, listener: unknown) => {
      listeners[event] = listener;
    }
  } as Window;
  const keyboard = Keyboard.create();
  keyboard.registerEventHandlers(mockWindow);
  expect(listeners['keydown']).toBe(keyboard.keyDown);
  expect(listeners['keyup']).toBe(keyboard.keyUp);
});

test('double tap', () => {
  const keyboard = Keyboard.create();
  expect(keyboard.getHeldKeys()).toEqual([]);

  keyboard.keyDown({ code: 'ArrowUp', timeStamp: 1000 } as KeyboardEvent);
  {
    const expected = [{ code: 'ArrowUp', isDoubleTap: false }];
    expect(keyboard.getHeldKeys()).toEqual(expected);
  }

  keyboard.keyUp({ code: 'ArrowUp', timeStamp: 1100 } as KeyboardEvent);
  {
    expect(keyboard.getHeldKeys()).toEqual([]);
  }

  keyboard.keyDown({ code: 'ArrowUp', timeStamp: 1200 } as KeyboardEvent);
  {
    const expected = [{ code: 'ArrowUp', isDoubleTap: true }];
    expect(keyboard.getHeldKeys()).toEqual(expected);
  }
});

test('ignores repeating event', () => {
  const keyboard = Keyboard.create();
  const event = { repeat: true } as KeyboardEvent;
  keyboard.keyDown(event);
  expect(keyboard.getHeldKeys().length).toBe(0);
});
