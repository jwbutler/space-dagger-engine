import { MouseButton } from '../input/Mouse';
import { Pixel } from '../geometry/Pixel';

export type MouseUpEvent = Readonly<{
  button: MouseButton;
  pixel: Pixel;
}>;
