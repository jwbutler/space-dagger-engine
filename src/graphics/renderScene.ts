import { Scene } from '../core/Scene';
import { Rect } from '../geometry/Rect';
import { Coordinates } from '../geometry';

export const renderScene = (scene: Scene) => {
  const graphics = scene.getGraphics();
  const backgroundColor = scene.getBackgroundColor();
  if (backgroundColor) {
    graphics.fillRect(Rect.fromDimensions(scene.getDimensions()), backgroundColor);
  }
  const backgroundImage = scene.getBackgroundImage();
  if (backgroundImage) {
    graphics.drawImage(backgroundImage, {
      topLeft: Coordinates.zero()
    });
  }

  for (const entity of scene.getEntities()) {
    entity.getSprite().render(entity, graphics);
  }
};
