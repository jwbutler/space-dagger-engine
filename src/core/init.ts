import { Engine } from './Engine';
import { Scene } from './Scene';
import { Keyboard } from '../input/Keyboard';
import { Graphics } from '../graphics/Graphics';
import { Dimensions } from '../geometry';
import { SoundPlayer } from '../audio';

type Props = Readonly<{
  container: HTMLElement;
  viewportDimensions: Dimensions;
  scenes: Scene[];
  initialScene: string;
}>;

export const init = async ({
  container,
  viewportDimensions,
  scenes,
  initialScene
}: Props): Promise<Engine> => {
  const keyboard = Keyboard.create();

  const viewport = Graphics.create({
    id: 'viewport',
    dimensions: viewportDimensions
  });
  viewport.attach(container);
  const soundPlayer = SoundPlayer.create();

  const engine = Engine.create({
    scenes,
    initialScene,
    keyboard,
    soundPlayer,
    viewport
  });
  keyboard.registerEventHandlers(window, engine);

  return engine;
};
