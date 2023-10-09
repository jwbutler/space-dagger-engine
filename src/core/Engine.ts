import { Scene } from './Scene';
import { Keyboard } from '../input/Keyboard';
import { UserInterface } from '../graphics/ui/UserInterface';
import { GlobalScript } from '../events/GlobalScript';
import { EngineImpl } from './EngineImpl';
import { Graphics } from '../graphics/Graphics';

export interface Engine {
  getScene: () => Scene;
  getKeyboard: () => Keyboard;
  getUserInterface: () => UserInterface;
  getGlobalScripts: () => GlobalScript[];
  addGlobalScript: (script: GlobalScript) => void;
  getViewport: () => Graphics;
  getStringVariable: (key: string) => string | null;
  setStringVariable: (key: string, value: string | null) => void;

  startGameLoop: () => void;
}

export type EngineProps = Readonly<{
  keyboard: Keyboard;
  scene: Scene;
  userInterface: UserInterface;
  viewport: Graphics;
}>;

export namespace Engine {
  export const create = (props: EngineProps): Engine => new EngineImpl(props);
}
