import { MouseButton } from '../input/Mouse';
import { Pixel } from '../geometry/Pixel';

export type MouseDownEvent = Readonly<{
  button: MouseButton;
  pixel: Pixel;
}>;
