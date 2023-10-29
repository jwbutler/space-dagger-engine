import * as Arrays from '../utils/Arrays';
import { Engine } from '../core/Engine';
import { check, checkNotNull } from '../utils';

// TODO:
// There are basically two input systems in here - one using HeldKey (old)
// and one using the event-based system (new).
// Need to think about how to convert HeldKey stuff to the new system,
// especially the double-tap system.

/** Corresponds to {@link KeyboardEvent.code} */
export type KeyCode = string;

export enum ModifierKey {
  ALT,
  CTRL,
  SHIFT
}

const enum KeyEventType {
  KEY_UP,
  KEY_DOWN
}

type KeyPressEvent = Readonly<{
  code: KeyCode;
  type: KeyEventType;
  timestamp: number;
}>;

export type HeldKey = Readonly<{
  code: KeyCode;
  isDoubleTap: boolean;
}>;

export interface Keyboard {
  keyDown: (event: KeyboardEvent) => void;
  keyUp: (event: KeyboardEvent) => void;
  registerEventHandlers: (window: Window, engine: Engine) => void;
  getHeldKeys: () => HeldKey[];
}

type Props = Readonly<{
  /** seconds */
  doubleTapThreshold: number;
}>;

class KeyboardImpl implements Keyboard {
  private readonly keyHistory: KeyPressEvent[];
  private readonly doubleTapThreshold: number;
  private engine: Engine | null;

  constructor({ doubleTapThreshold }: Props) {
    this.keyHistory = [];
    this.doubleTapThreshold = doubleTapThreshold;
    this.engine = null;
  }

  keyDown = (event: KeyboardEvent) => {
    if (event.repeat) {
      return;
    }

    const engine = checkNotNull(this.engine);
    engine.keyDown({
      code: event.code,
      modifiers: getModifiers(event),
      timestamp: event.timeStamp / 1000
    });

    this.keyHistory.push({
      code: event.code,
      type: KeyEventType.KEY_DOWN,
      timestamp: event.timeStamp / 1000
    });
  };

  keyUp = (event: KeyboardEvent) => {
    const engine = checkNotNull(this.engine);
    engine.keyUp({
      code: event.code,
      timestamp: event.timeStamp / 1000
    });

    this.keyHistory.push({
      code: event.code,
      type: KeyEventType.KEY_UP,
      timestamp: event.timeStamp / 1000
    });
  };

  registerEventHandlers = (window: Window, engine: Engine) => {
    check(this.engine === null);
    this.engine = engine;
    window.addEventListener('keydown', this.keyDown);
    window.addEventListener('keyup', this.keyUp);
  };

  /** TODO really inefficient */
  getHeldKeys = (): HeldKey[] => {
    const indexedKeyEvents: Record<string, KeyPressEvent[]> = {};
    for (const event of this.keyHistory) {
      const { code } = event;
      indexedKeyEvents[code] = indexedKeyEvents[code] ?? [];
      indexedKeyEvents[code].push(event);
    }

    const heldKeys: Record<string, HeldKey> = {};
    for (const [code, events] of Object.entries(indexedKeyEvents)) {
      const latestEvent = Arrays.max(events, event => event.timestamp);
      if (latestEvent.type === KeyEventType.KEY_DOWN) {
        const isDoubleTap = events.some(
          event =>
            event.type === KeyEventType.KEY_DOWN &&
            event.timestamp < latestEvent.timestamp &&
            event.timestamp >= latestEvent.timestamp - this.doubleTapThreshold
        );
        heldKeys[code] = {
          code,
          isDoubleTap
        };
      }
    }
    return Object.values(heldKeys);
  };
}

export namespace Keyboard {
  export const create = (): Keyboard =>
    new KeyboardImpl({
      doubleTapThreshold: 0.25
    });
}

/** exported for testing */
export const getModifiers = (event: KeyboardEvent): Set<ModifierKey> => {
  const modifiers = new Set<ModifierKey>();
  if (event.altKey) {
    modifiers.add(ModifierKey.ALT);
  }
  if (event.ctrlKey) {
    modifiers.add(ModifierKey.CTRL);
  }
  if (event.shiftKey) {
    modifiers.add(ModifierKey.SHIFT);
  }
  return modifiers;
};
