import './style.css';
import { Graphics } from './graphics/Graphics';
import { renderScene } from './core/renderScene.ts';
import {
  ENTITY_NAME_PLAYER_SHIP,
  SCENE_DIMENSIONS,
  SCREEN_DIMENSIONS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH
} from './core/constants.ts';
import { update } from './core/update';
import { Scene } from './core/Scene';
import { loadImageBitmap } from './graphics/images/loadImageBitmap.ts';
import { Camera } from './geometry/Camera';
import { createTiledImage } from './graphics/images/createTiledImage.ts';
import { createPlayerShip, getFuel, getScore } from './dagger/playerShip.ts';
import { GlobalScript } from './events/GlobalScript.ts';
import { Keyboard } from './input/Keyboard.ts';
import { UserInterface } from './graphics/ui/UserInterface.ts';
import { renderUserInterface } from './core/renderUserInterface.ts';
import { TextElement } from './graphics/ui/TextElement.ts';
import { maintainEnemies } from './dagger/events/globalScripts.ts';
import { checkNotNull } from './utils/preconditions.ts';
import { getCurrentTimeSeconds } from './utils/getCurrentTimeMillis.ts';

/**
 * TODO - this is just an ad-hoc type to pass info between the two functions in this file
 */
type Engine = Readonly<{
  scene: Scene;
  keyboard: Keyboard;
  userInterface: UserInterface;
  globalScripts: GlobalScript[];
  lastTime: number;
}>;

const MIN_DT = 0.0001;

const initEngine = async (): Promise<Engine> => {
  const keyboard = Keyboard.create();
  keyboard.registerEventHandlers(window);
  const container = document.getElementById('app')!;

  const sceneGraphics = Graphics.create(SCREEN_DIMENSIONS);
  sceneGraphics.attach(container);
  const bufferGraphics = Graphics.create(SCENE_DIMENSIONS);
  const scene = Scene.create({
    buffer: bufferGraphics,
    viewport: sceneGraphics,
    dimensions: SCENE_DIMENSIONS,
    camera: Camera.create({
      centerCoordinates: {
        x: SCREEN_WIDTH / 2,
        y: SCREEN_HEIGHT / 2
      },
      dimensions: { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }
    })
  });
  const uiGraphics = Graphics.create(SCREEN_DIMENSIONS);
  uiGraphics.attach(container);
  const userInterface = UserInterface.create({ graphics: uiGraphics });
  const globalScripts: GlobalScript[] = [];

  return {
    scene,
    userInterface,
    keyboard,
    globalScripts,
    lastTime: getCurrentTimeSeconds()
  };
};

const initGame = async (engine: Engine) => {
  const { scene, userInterface, keyboard, globalScripts } = engine;

  let { lastTime } = engine;

  const ship = await createPlayerShip({
    centerCoordinates: { x: 640, y: 360 }
  });

  const starfield = await (async () => {
    const backgroundImage = await loadImageBitmap('starfield.png');
    return createTiledImage(backgroundImage, SCENE_DIMENSIONS);
  })();
  scene.setBackgroundImage(starfield);

  scene.addEntity(ship);
  scene.getCamera().setCenterCoordinates(ship.getCenterCoordinates());

  const scoreIndicator = TextElement.create({
    color: 'lime',
    font: '12pt Monospace',
    text: '',
    topLeft: { x: 10, y: 20 }
  });
  userInterface.addUIElement(scoreIndicator);

  const fuelIndicator = TextElement.create({
    color: 'lime',
    font: '12pt Monospace',
    text: '',
    topLeft: { x: 10, y: 40 }
  });
  userInterface.addUIElement(fuelIndicator);

  const fpsIndicator = TextElement.create({
    color: 'lime',
    font: '12pt Monospace',
    text: '',
    topLeft: { x: 10, y: 60 }
  });
  userInterface.addUIElement(fpsIndicator);

  globalScripts.push(maintainEnemies);
  const updateFuelIndicator: GlobalScript = {
    onTick: () => {
      const ship = checkNotNull(scene.getEntitiesByName(ENTITY_NAME_PLAYER_SHIP)[0]);
      const fuel = getFuel(ship);
      fuelIndicator.setText(`Fuel: ${fuel.toFixed(2)}`);
    }
  };
  globalScripts.push(updateFuelIndicator);
  const updateScoreIndicator: GlobalScript = {
    onTick: () => {
      const ship = checkNotNull(scene.getEntitiesByName(ENTITY_NAME_PLAYER_SHIP)[0]);
      const score = getScore(ship);
      scoreIndicator.setText(`Score: ${score}`);
    }
  };
  globalScripts.push(updateScoreIndicator);

  const numFrameTimings = 60;
  const frameTimings: number[] = [];
  setInterval(() => {
    const time = getCurrentTimeSeconds();
    const dt = time - lastTime;
    lastTime = time;
    update(scene, globalScripts, keyboard, Math.max(dt, MIN_DT));
    renderScene(scene);
    renderUserInterface(userInterface);
    frameTimings.push(dt);
    if (frameTimings.length > numFrameTimings) {
      frameTimings.splice(0, frameTimings.length - numFrameTimings);
    }
  }, 10);

  const updateFpsIndicator: GlobalScript = {
    onTick: () => {
      if (frameTimings.length === 0) return;

      const avgFrameTiming = frameTimings.reduce((a, b) => a + b) / frameTimings.length;
      const avgFps = 1.0 / avgFrameTiming;
      fpsIndicator.setText(`FPS: ${avgFps.toFixed(0)}`);
    }
  };
  globalScripts.push(updateFpsIndicator);
};

(async () => {
  const engine = await initEngine();
  await initGame(engine);
})().catch(e => {
  console.error(e);
  alert(e);
});
