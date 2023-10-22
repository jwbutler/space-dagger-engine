import { Engine, EngineProps } from './Engine';
import { Scene } from './Scene';
import { update } from './update';
import { CollisionHandler } from './CollisionHandler';
import { GlobalScript } from '../events/GlobalScript';
import { Keyboard } from '../input/Keyboard';
import { UserInterface } from '../graphics/ui/UserInterface';
import { Graphics } from '../graphics/Graphics';
import { renderScene } from '../graphics/renderScene';
import { renderUserInterface } from '../graphics/renderUserInterface';
import { Arrays, getCurrentTimeSeconds } from '../utils';
import { SoundPlayer } from '../audio';

export class EngineImpl implements Engine {
  private readonly globalScripts: GlobalScript[];
  private readonly keyboard: Keyboard;
  private readonly soundPlayer: SoundPlayer;
  private readonly scene: Scene;
  private readonly userInterface: UserInterface;
  private readonly viewport: Graphics;
  private readonly stringVariables: Record<string, string | null>;
  private readonly collisionHandler: CollisionHandler;
  private lastUpdateTime: number;
  private isStarted: boolean;

  constructor({ keyboard, soundPlayer, scene, userInterface, viewport }: EngineProps) {
    this.keyboard = keyboard;
    this.soundPlayer = soundPlayer;
    this.scene = scene;
    this.userInterface = userInterface;
    this.viewport = viewport;
    this.globalScripts = [];
    this.stringVariables = {};
    this.collisionHandler = CollisionHandler.create();
    this.lastUpdateTime = getCurrentTimeSeconds();
    this.isStarted = false;
  }

  getGlobalScripts = (): GlobalScript[] => this.globalScripts;

  addGlobalScript = (script: GlobalScript) => {
    this.globalScripts.push(script);
  };

  clearGlobalScripts = (): void => Arrays.clear(this.globalScripts);

  getKeyboard = (): Keyboard => this.keyboard;

  getSoundPlayer = (): SoundPlayer => this.soundPlayer;

  getScene = (): Scene => this.scene;

  getUserInterface = (): UserInterface => this.userInterface;

  getViewport = () => this.viewport;

  startGameLoop = (): void => {
    this.isStarted = true;
    const timestampMillis = getCurrentTimeSeconds() * 1000;
    this.doGameLoop(timestampMillis);
  };

  stopGameLoop = (): void => {
    this.isStarted = false;
  };

  /**
   * non-override
   */
  doGameLoop = (timestampMillis: number) => {
    if (!this.isStarted) {
      return;
    }

    const timestampSeconds = timestampMillis / 1000;
    const dt = timestampSeconds - this.lastUpdateTime;
    this.lastUpdateTime = timestampSeconds;
    this.update(dt);
    this.render();
    window.requestAnimationFrame(this.doGameLoop);
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
