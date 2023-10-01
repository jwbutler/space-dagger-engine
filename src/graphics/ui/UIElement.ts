import { Graphics } from '../Graphics.ts';

export interface UIElement {
  render: (graphics: Graphics) => void;
}
