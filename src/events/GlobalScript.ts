import { TickEvent } from './TickEvent';
import { RenderEvent } from './RenderEvent';
import { UpdateEvent } from './UpdateEvent';
import { KeyDownEvent } from './KeyDownEvent';
import { KeyUpEvent } from './KeyUpEvent';

export type GlobalScript = Readonly<{
  onTick?: (event: TickEvent) => void;
  /**
   * This is fired after the main render loop, primarily as a timing callback
   */
  onRender?: (event: RenderEvent) => void;
  /**
   * This is fired after the main update loop, primarily as a timing callback
   */
  onUpdate?: (event: UpdateEvent) => void;

  onKeyDown?: (event: KeyDownEvent) => void;
  onKeyUp?: (event: KeyUpEvent) => void;
}>;
