import { Scene } from './Scene.ts';
import { Keyboard } from '../input/Keyboard.ts';
import { UserInterface } from '../graphics/ui/UserInterface.ts';
import { GlobalScript } from '../events/GlobalScript.ts';
import { EngineImpl } from './EngineImpl.ts';
import { Graphics } from '../graphics/Graphics.ts';
import { Metric, MetricType } from '../utils/Metric.ts';

export interface Engine {
  /**
   * TODO: multiple scenes
   */
  getScene: () => Scene;
  getKeyboard: () => Keyboard;
  getUserInterface: () => UserInterface;
  getGlobalScripts: () => GlobalScript[];
  addGlobalScript: (script: GlobalScript) => void;
  getViewport: () => Graphics;
  getStringVariable: (key: string) => string | null;
  setStringVariable: (key: string, value: string | null) => void;
  getMetric: (metric: MetricType) => Metric;

  startGameLoop: (frameDurationMillis: number) => void;
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
