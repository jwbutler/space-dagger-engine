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
import { CollisionHandler } from './CollisionHandler.ts';
import { Metric, MetricType } from '../utils/Metric.ts';

const MIN_DT = 0.0001;

export class EngineImpl implements Engine {
  private readonly globalScripts: GlobalScript[];
  private readonly keyboard: Keyboard;
  private readonly scene: Scene;
  private readonly userInterface: UserInterface;
  private readonly viewport: Graphics;
  private readonly stringVariables: Record<string, string | null>;
  private readonly metrics: Partial<Record<MetricType, Metric>>;
  private readonly collisionHandler: CollisionHandler;

  constructor({ keyboard, scene, userInterface, viewport }: EngineProps) {
    this.keyboard = keyboard;
    this.scene = scene;
    this.userInterface = userInterface;
    this.viewport = viewport;
    this.globalScripts = [];
    this.stringVariables = {};
    this.metrics = {};
    this.collisionHandler = CollisionHandler.create();
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
      update(this, Math.max(dt, MIN_DT));

      const startTime = new Date().getTime();
      const { scene, userInterface, viewport } = this;
      renderScene(scene);
      viewport.fill('#000000');
      scene.getGraphics().drawOnto(viewport, { sourceRect: scene.getCamera().getRect() });
      renderUserInterface(userInterface);
      const endTime = new Date().getTime();
      this.getMetric(MetricType.RENDER_TIME).recordValue(endTime - startTime);
    }, frameDurationMillis);
  };

  getStringVariable = (key: string): string | null => this.stringVariables[key] ?? null;
  setStringVariable = (key: string, value: string | null): void => {
    this.stringVariables[key] = value;
  };

  getMetric = (metricType: MetricType): Metric => {
    let metric = this.metrics[metricType];
    if (!metric) {
      metric = Metric.create(metricType);
      this.metrics[metricType] = metric;
    }
    return metric;
  };

  /**
   * Non-override
   */
  getCollisionHandler = (): CollisionHandler => this.collisionHandler;
}
