import { MouseButton } from '../input/Mouse';
import { Coordinates } from '../geometry';

export type MouseUpEvent = Readonly<{
  button: MouseButton;
  coordinates: Coordinates;
}>;
