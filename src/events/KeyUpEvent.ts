import { KeyCode } from '../input/Keyboard';

export type KeyUpEvent = Readonly<{
  code: KeyCode;
  timestamp: number;
}>;
