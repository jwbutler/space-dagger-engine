import { Seconds } from '../utils/time';

export type RenderEvent = Readonly<{
  renderTime: Seconds;
}>;
