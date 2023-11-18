import { Scene } from './Scene';
import { EngineImpl } from './EngineImpl';
import { Keyboard } from '../input/Keyboard';
import { GlobalScript } from '../scripts/GlobalScript';
import { Graphics } from '../graphics/Graphics';
import { SoundPlayer } from '../audio';
import { KeyDownEvent } from '../events/KeyDownEvent';
import { KeyUpEvent } from '../events/KeyUpEvent';
import { CustomEvent } from '../events/CustomEvent';

export interface Engine {
  getCurrentScene: () => Scene;
  setCurrentScene: (name: string) => void;
  getScene: (name: string) => Scene;
  addScene: (scene: Scene) => void;
  getKeyboard: () => Keyboard;
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
  broadcastCustomEvent: (event: CustomEvent) => void;

  startGameLoop: () => void;
  stopGameLoop: () => Promise<void>;
}

export type EngineProps = Readonly<{
  keyboard: Keyboard;
  soundPlayer: SoundPlayer;
  scenes: Scene[];
  initialScene: string;
  viewport: Graphics;
}>;

export namespace Engine {
  export const create = (props: EngineProps): Engine => new EngineImpl(props);
}
