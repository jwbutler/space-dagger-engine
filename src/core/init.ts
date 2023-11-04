import { Engine } from './Engine';
import { Scene } from './Scene';
import { Keyboard } from '../input/Keyboard';
import { Graphics } from '../graphics/Graphics';
import { Camera } from '../geometry/Camera';
import { Dimensions } from '../geometry';
import { SoundPlayer } from '../audio';

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
  const soundPlayer = SoundPlayer.create();

  const engine = Engine.create({
    scene,
    keyboard,
    soundPlayer,
    viewport
  });
  keyboard.registerEventHandlers(window, engine);

  return engine;
};
