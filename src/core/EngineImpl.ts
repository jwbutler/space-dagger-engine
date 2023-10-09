import { Engine, EngineProps } from './Engine';
import { GlobalScript } from '../events/GlobalScript';
import { Keyboard } from '../input/Keyboard';
import { Scene } from './Scene';
import { UserInterface } from '../graphics/ui/UserInterface';
import { Graphics } from '../graphics/Graphics';
import { update } from './update';
import { renderScene } from '../graphics/renderScene';
import { renderUserInterface } from '../graphics/renderUserInterface';
import { CollisionHandler } from './CollisionHandler';
import { getCurrentTimeSeconds } from '../utils';

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

  startGameLoop = (timestampMillis: number): void => {
    const timestampSeconds = timestampMillis / 1000;
    const dt = this.lastUpdateTime - timestampSeconds;
    this.lastUpdateTime = timestampSeconds;
    this.update(dt);
    this.render();
    window.requestAnimationFrame(this.startGameLoop);
  };

  /** non-override */
  update = (dt: number) => {
    if (dt === 0) return;

    const startTime = getCurrentTimeSeconds();
    update(this, dt);
    const updateTime = getCurrentTimeSeconds() - startTime;

    // TODO: utility function to broadcast global scripts
    for (const globalScript of this.globalScripts) {
      globalScript.onUpdate?.({
        updateTime
      });
    }
  };

  /** non-override */
  render = () => {
    const startTime = getCurrentTimeSeconds();
    const { scene, userInterface, viewport } = this;
    renderScene(scene);
    viewport.fill('#000000');
    scene.getGraphics().drawOnto(viewport, { sourceRect: scene.getCamera().getRect() });
    renderUserInterface(userInterface);
    const endTime = getCurrentTimeSeconds();

    // TODO: utility function to broadcast global scripts
    for (const globalScript of this.globalScripts) {
      globalScript.onRender?.({
        renderTime: endTime - startTime
      });
    }
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
