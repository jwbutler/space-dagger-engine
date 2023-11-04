import { Graphics } from '../Graphics';

export interface Element {
  render: (graphics: Graphics) => void;
}
