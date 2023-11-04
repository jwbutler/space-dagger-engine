import { Graphics } from './Graphics';
import { Scene } from '../core/Scene';

export const renderUserInterface = (scene: Scene, graphics: Graphics): void => {
  for (const uiElement of scene.getElements()) {
    uiElement.render(graphics);
  }
};
