import { MouseButton } from '../input/Mouse';

export type MouseDownEvent = Readonly<{
  button: MouseButton;
}>;
