import { Engine, EngineProps } from './Engine.ts';
import { GlobalScript } from '../events/GlobalScript.ts';
import { Keyboard } from '../input/Keyboard.ts';
import { Scene } from './Scene.ts';
import { UserInterface } from '../graphics/ui/UserInterface.ts';
import { Graphics } from '../graphics/Graphics.ts';
import { update } from './update.ts';
import { renderScene } from './renderScene.ts';
import { renderUserInterface } from './renderUserInterface.ts';
import { getCurrentTimeSeconds } from '../utils/getCurrentTimeSeconds.ts';

const MIN_DT = 0.0001;

export class EngineImpl implements Engine {
  private readonly globalScripts: GlobalScript[];
  private readonly keyboard: Keyboard;
  private readonly scene: Scene;
  private readonly userInterface: UserInterface;
  private readonly viewport: Graphics;

  constructor({ keyboard, scene, userInterface, viewport }: EngineProps) {
    this.keyboard = keyboard;
    this.scene = scene;
    this.userInterface = userInterface;
    this.viewport = viewport;
    this.globalScripts = [];
  }

  getGlobalScripts = (): GlobalScript[] => this.globalScripts;

  addGlobalScript = (script: GlobalScript) => {
    this.globalScripts.push(script);
  };

  getKeyboard = (): Keyboard => this.keyboard;

  getScene = (): Scene => this.scene;

  getUserInterface = (): UserInterface => this.userInterface;

  getViewport = () => this.viewport;

  startGameLoop = (frameDurationMillis: number): void => {
    let lastTime = getCurrentTimeSeconds();
    setInterval(() => {
      const time = getCurrentTimeSeconds();
      const dt = time - lastTime;
      lastTime = time;
      const { scene, globalScripts, keyboard, userInterface, viewport } = this;
      update(scene, globalScripts, keyboard, Math.max(dt, MIN_DT));
      renderScene(scene);
      viewport.fill('#000000');
      scene.getGraphics().drawOnto(viewport, { sourceRect: scene.getCamera().getRect() });
      renderUserInterface(userInterface);
    }, frameDurationMillis);
  };
}
