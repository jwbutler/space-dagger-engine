import { Scene } from './Scene';
import { EngineImpl } from './EngineImpl';
import { Keyboard } from '../input/Keyboard';
import { UserInterface } from '../graphics/ui/UserInterface';
import { GlobalScript } from '../events/GlobalScript';
import { Graphics } from '../graphics/Graphics';
import { SoundPlayer } from '../audio';
import { KeyDownEvent } from '../events/KeyDownEvent';
import { KeyUpEvent } from '../events/KeyUpEvent';

export interface Engine {
  getScene: () => Scene;
  getKeyboard: () => Keyboard;
  getSoundPlayer: () => SoundPlayer;
  getUserInterface: () => UserInterface;
  getGlobalScripts: () => GlobalScript[];
  addGlobalScript: (script: GlobalScript) => void;
  clearGlobalScripts: () => void;
  getViewport: () => Graphics;
  getStringVariable: (key: string) => string | null;
  setStringVariable: (key: string, value: string | null) => void;
  keyDown: (event: KeyDownEvent) => void;
  keyUp: (event: KeyUpEvent) => void;

  startGameLoop: () => void;
  stopGameLoop: () => Promise<void>;
}

export type EngineProps = Readonly<{
  keyboard: Keyboard;
  soundPlayer: SoundPlayer;
  scene: Scene;
  userInterface: UserInterface;
  viewport: Graphics;
}>;

export namespace Engine {
  export const create = (props: EngineProps): Engine => new EngineImpl(props);
}
