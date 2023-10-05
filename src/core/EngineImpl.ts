import { Engine, EngineProps } from './Engine.ts';
import { GlobalScript } from '../events/GlobalScript.ts';
import { Keyboard } from '../input/Keyboard.ts';
import { Scene } from './Scene.ts';
import { UserInterface } from '../graphics/ui/UserInterface.ts';
import { Graphics } from '../graphics/Graphics.ts';
import { update } from './update.ts';
import { renderScene } from '../graphics/renderScene.ts';
import { renderUserInterface } from '../graphics/renderUserInterface.ts';
import { CollisionHandler } from './CollisionHandler.ts';
import { getCurrentTimeSeconds } from '../utils/time.ts';

const MIN_DT = 0.0001;

export class EngineImpl implements Engine {
  private readonly globalScripts: GlobalScript[];
  private readonly keyboard: Keyboard;
  private readonly scene: Scene;
  private readonly userInterface: UserInterface;
  private readonly viewport: Graphics;
  private readonly stringVariables: Record<string, string | null>;
  private readonly collisionHandler: CollisionHandler;
  private lastUpdateTime: number;

  constructor({ keyboard, scene, userInterface, viewport }: EngineProps) {
    this.keyboard = keyboard;
    this.scene = scene;
    this.userInterface = userInterface;
    this.viewport = viewport;
    this.globalScripts = [];
    this.stringVariables = {};
    this.collisionHandler = CollisionHandler.create();
    this.lastUpdateTime = getCurrentTimeSeconds();
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
    setInterval(this.update, frameDurationMillis);
  };

  update = () => {
    const time = getCurrentTimeSeconds();
    const dt = time - this.lastUpdateTime;
    this.lastUpdateTime = time;
    update(this, Math.max(dt, MIN_DT));

    const { scene, userInterface, viewport } = this;
    renderScene(scene);
    viewport.fill('#000000');
    scene.getGraphics().drawOnto(viewport, { sourceRect: scene.getCamera().getRect() });
    renderUserInterface(userInterface);
  };

  getStringVariable = (key: string): string | null => this.stringVariables[key] ?? null;
  setStringVariable = (key: string, value: string | null): void => {
    this.stringVariables[key] = value;
  };

  /**
   * Non-override
   */
  getCollisionHandler = (): CollisionHandler => this.collisionHandler;
}
