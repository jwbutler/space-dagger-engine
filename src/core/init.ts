import { Engine } from './Engine.ts';
import { Keyboard } from '../input/Keyboard.ts';
import { Graphics } from '../graphics/Graphics.ts';
import {
  SCENE_DIMENSIONS,
  VIEWPORT_DIMENSIONS,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH
} from './constants.ts';
import { Scene } from './Scene.ts';
import { Camera } from '../geometry/Camera.ts';
import { UserInterface } from '../graphics/ui/UserInterface.ts';

export const init = async (container: HTMLElement): Promise<Engine> => {
  const keyboard = Keyboard.create();
  keyboard.registerEventHandlers(window);

  const viewport = Graphics.create({
    id: 'viewport',
    dimensions: VIEWPORT_DIMENSIONS
  });
  viewport.attach(container);
  const scene = Scene.create({
    name: 'scene',
    dimensions: SCENE_DIMENSIONS,
    camera: Camera.create({
      centerCoordinates: {
        x: VIEWPORT_WIDTH / 2,
        y: VIEWPORT_HEIGHT / 2
      },
      dimensions: { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT }
    })
  });
  const uiGraphics = Graphics.create({
    id: 'UI',
    dimensions: VIEWPORT_DIMENSIONS
  });
  uiGraphics.attach(container);
  const userInterface = UserInterface.create({ graphics: uiGraphics });

  return Engine.create({
    scene,
    userInterface,
    keyboard,
    viewport
  });
};
