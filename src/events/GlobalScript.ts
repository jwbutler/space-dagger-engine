import { TickEvent } from './TickEvent';
import { RenderEvent } from './RenderEvent';

export type GlobalScript = Readonly<{
  onTick?: (event: TickEvent) => void;
  onRender?: (event: RenderEvent) => void;
}>;
