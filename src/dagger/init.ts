import { Engine } from '../core/Engine.ts';
import { createPlayerShip, getFuel, getScore } from './playerShip.ts';
import { loadImageBitmap } from '../graphics/images/loadImageBitmap.ts';
import { createTiledImage } from '../graphics/images/createTiledImage.ts';
import { ENTITY_NAME_PLAYER_SHIP, SCENE_DIMENSIONS } from '../core/constants.ts';
import { TextElement } from '../graphics/ui/TextElement.ts';
import { maintainEnemies } from './events/globalScripts.ts';
import { GlobalScript } from '../events/GlobalScript.ts';
import { checkNotNull } from '../utils/preconditions.ts';

export const init = async (engine: Engine) => {
  const ship = await createPlayerShip({
    centerCoordinates: { x: 640, y: 360 }
  });

  const starfield = await (async () => {
    const backgroundImage = await loadImageBitmap('starfield.png');
    return createTiledImage(backgroundImage, SCENE_DIMENSIONS);
  })();
  const scene = engine.getScene();
  scene.setBackgroundImage(starfield);

  scene.addEntity(ship);
  scene.getCamera().setCenterCoordinates(ship.getCenterCoordinates());

  const userInterface = engine.getUserInterface();
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

  const globalScripts = engine.getGlobalScripts();
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
};
