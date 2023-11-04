import { Engine, EngineProps } from './Engine';
import { Scene } from './Scene';
import { update } from './update';
import { GlobalScript } from '../events/GlobalScript';
import { Keyboard } from '../input/Keyboard';
import { Graphics } from '../graphics/Graphics';
import { renderScene } from '../graphics/renderScene';
import { renderUserInterface } from '../graphics/renderUserInterface';
import { Arrays, checkNotNull, getCurrentTimeSeconds } from '../utils';
import { SoundPlayer } from '../audio';
import { KeyDownEvent } from '../events/KeyDownEvent';
import { KeyUpEvent } from '../events/KeyUpEvent';

export class EngineImpl implements Engine {
  private readonly scenes: Scene[];
  private scene: Scene;
  private readonly globalScripts: GlobalScript[];
  private readonly keyboard: Keyboard;
  private readonly soundPlayer: SoundPlayer;
  private readonly viewport: Graphics;
  private readonly stringVariables: Record<string, string | null>;
  private lastUpdateTime: number;
  /**
   * This is used when stopping the game loop (see {@link #stopGameLoop}
   * to delay further actions until the current loop has terminated.
   * TODO naming
   */
  private stopLoopCallback: (() => void) | null;

  constructor({ keyboard, soundPlayer, scenes, initialScene, viewport }: EngineProps) {
    this.keyboard = keyboard;
    this.soundPlayer = soundPlayer;
    this.scenes = scenes;
    this.scene = this._getSceneByName(initialScene);
    this.viewport = viewport;
    this.globalScripts = [];
    this.stringVariables = {};
    this.lastUpdateTime = getCurrentTimeSeconds();
    this.stopLoopCallback = null;
  }

  getScene = (): Scene => this.scene;

  addScene = (scene: Scene): void => {
    this.scenes.push(scene);
  };

  setScene = (name: string): void => {
    this.scene = this._getSceneByName(name);
  };

  /** non-override, exported for testing */
  getScenes = (): Scene[] => this.scenes;

  private _getSceneByName = (name: string): Scene =>
    checkNotNull(this.scenes.find(scene => scene.getName() === name));

  getGlobalScripts = (): GlobalScript[] => this.globalScripts;

  addGlobalScript = (script: GlobalScript) => {
    this.globalScripts.push(script);
  };

  clearGlobalScripts = (): void => Arrays.clear(this.globalScripts);

  getKeyboard = (): Keyboard => this.keyboard;

  getSoundPlayer = (): SoundPlayer => this.soundPlayer;

  getViewport = () => this.viewport;

  startGameLoop = (): void => {
    const timestampMillis = getCurrentTimeSeconds() * 1000;
    this.doGameLoop(timestampMillis);
  };

  stopGameLoop = async (): Promise<void> => {
    await new Promise<void>(resolve => {
      this.stopLoopCallback = resolve;
    });
  };

  /**
   * non-override
   */
  doGameLoop = (timestampMillis: number) => {
    const timestampSeconds = timestampMillis / 1000;
    const dt = timestampSeconds - this.lastUpdateTime;
    this.lastUpdateTime = timestampSeconds;
    this.update(dt);
    this.render();

    if (this.stopLoopCallback) {
      this.stopLoopCallback();
      this.stopLoopCallback = null;
    } else {
      window.requestAnimationFrame(this.doGameLoop);
    }
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
    const { scene, viewport } = this;
    viewport.fill('#000000');
    renderScene(scene);
    scene.getGraphics().drawOnto(viewport);
    renderUserInterface(scene, viewport);
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

  keyDown = (event: KeyDownEvent): void => {
    for (const script of this.globalScripts) {
      script.onKeyDown?.(event);
    }
  };

  keyUp = (event: KeyUpEvent): void => {
    for (const script of this.globalScripts) {
      script.onKeyUp?.(event);
    }
  };
}
