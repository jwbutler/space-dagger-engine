import { Engine } from './Engine';
import { Keyboard } from '../input/Keyboard';
import { Graphics } from '../graphics/Graphics';
import { Scene } from './Scene';
import { UserInterface } from '../graphics/ui/UserInterface';
import { Dimensions } from '../geometry';

type Props = Readonly<{
  container: HTMLElement;
  viewportDimensions: Dimensions;
  scene: Scene;
}>;

export const init = async ({
  container,
  viewportDimensions,
  scene
}: Props): Promise<Engine> => {
  const keyboard = Keyboard.create();
  keyboard.registerEventHandlers(window);

  const viewport = Graphics.create({
    id: 'viewport',
    dimensions: viewportDimensions
  });
  viewport.attach(container);
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
