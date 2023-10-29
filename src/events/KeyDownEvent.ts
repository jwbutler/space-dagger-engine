import { KeyCode, ModifierKey } from '../input/Keyboard';

export type KeyDownEvent = Readonly<{
  code: KeyCode;
  modifiers: Set<ModifierKey>;
  timestamp: number;
}>;
