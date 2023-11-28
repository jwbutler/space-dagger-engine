import { MouseButton } from '../input/Mouse';
import { Coordinates } from '../geometry';

export type MouseDownEvent = Readonly<{
  button: MouseButton;
  coordinates: Coordinates;
}>;
