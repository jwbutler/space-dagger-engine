import { Scene } from './Scene';
import { EngineImpl } from './EngineImpl';
import { Keyboard } from '../input/Keyboard';
import { GlobalScript } from '../scripts/GlobalScript';
import { Graphics } from '../graphics/Graphics';
import { SoundPlayer } from '../audio';
import { KeyDownEvent } from '../events/KeyDownEvent';
import { KeyUpEvent } from '../events/KeyUpEvent';
import { CustomEvent } from '../events/CustomEvent';
import { Mouse } from '../input/Mouse';
import { MouseDownEvent } from '../events/MouseDownEvent';
import { MouseUpEvent } from '../events/MouseUpEvent';

export interface Engine {
  getCurrentScene: () => Scene;
  setCurrentScene: (name: string) => void;
  getScene: (name: string) => Scene;
  addScene: (scene: Scene) => void;
  getKeyboard: () => Keyboard;
  getMouse: () => Mouse;
  getSoundPlayer: () => SoundPlayer;
  getGlobalScripts: () => GlobalScript[];
  addGlobalScript: (script: GlobalScript) => void;
  removeGlobalScript: (script: GlobalScript) => void;
  clearGlobalScripts: () => void;
  getViewport: () => Graphics;
  getStringVariable: (key: string) => string | null;
  setStringVariable: (key: string, value: string | null) => void;
  keyDown: (event: KeyDownEvent) => void;
  keyUp: (event: KeyUpEvent) => void;
  mouseDown: (event: MouseDownEvent) => void;
  mouseUp: (event: MouseUpEvent) => void;
  broadcastCustomEvent: (event: CustomEvent) => void;

  startGameLoop: () => void;
  stopGameLoop: () => Promise<void>;
}

export type EngineProps = Readonly<{
  keyboard: Keyboard;
  mouse: Mouse;
  soundPlayer: SoundPlayer;
  scenes: Scene[];
  initialScene: string;
  viewport: Graphics;
}>;

export namespace Engine {
  export const create = (props: EngineProps): Engine => new EngineImpl(props);
}
