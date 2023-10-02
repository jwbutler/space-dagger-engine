import { Engine } from './Engine.ts';
import { Keyboard } from '../input/Keyboard.ts';
import { Graphics } from '../graphics/Graphics.ts';
import { Scene } from './Scene.ts';
import { Camera } from '../geometry/Camera.ts';
import { UserInterface } from '../graphics/ui/UserInterface.ts';
import { Dimensions } from '../geometry';

type Props = Readonly<{
  container: HTMLElement;
  viewportDimensions: Dimensions;
  /**
   * TODO this makes no sense long term.  This method should not be creating a Scene.
   */
  sceneDimensions: Dimensions;
}>;

export const init = async ({
  container,
  viewportDimensions,
  sceneDimensions
}: Props): Promise<Engine> => {
  const keyboard = Keyboard.create();
  keyboard.registerEventHandlers(window);

  const viewport = Graphics.create({
    id: 'viewport',
    dimensions: viewportDimensions
  });
  viewport.attach(container);
  const scene = Scene.create({
    name: 'scene',
    dimensions: sceneDimensions,
    camera: Camera.create({
      centerCoordinates: {
        x: viewportDimensions.width / 2,
        y: viewportDimensions.height / 2
      },
      dimensions: viewportDimensions
    })
  });
  const uiGraphics = Graphics.create({
    id: 'UI',
    dimensions: viewportDimensions
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
