import { Graphics } from '../Graphics';

export interface UIElement {
  render: (graphics: Graphics) => void;
}
