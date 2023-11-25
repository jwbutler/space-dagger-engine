import { TickEvent } from '../events/TickEvent';
import { RenderEvent } from '../events/RenderEvent';
import { UpdateEvent } from '../events/UpdateEvent';
import { KeyDownEvent } from '../events/KeyDownEvent';
import { KeyUpEvent } from '../events/KeyUpEvent';
import { Engine } from '../core/Engine';
import { CustomEvent } from '../events/CustomEvent';
import { DestroyEvent } from '../events';
import { MouseUpEvent } from '../events/MouseUpEvent';
import { MouseDownEvent } from '../events/MouseDownEvent';

export type GlobalScript = Readonly<{
  onTick?: (engine: Engine, event: TickEvent) => void;
  onDestroy?: (engine: Engine, event: DestroyEvent) => void;
  onCustomEvent?: (engine: Engine, event: CustomEvent) => void;

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

  onMouseDown?: (event: MouseDownEvent) => void;
  onMouseUp?: (event: MouseUpEvent) => void;
}>;
