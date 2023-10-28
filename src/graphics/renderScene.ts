import { Scene } from '../core/Scene';
import { Rect } from '../geometry/Rect';
import { Coordinates } from '../geometry';

export const renderScene = (scene: Scene) => {
  const graphics = scene.getGraphics();
  const cameraRect = scene.getCamera().getRect();
  graphics.translate(Rect.getTopLeft(cameraRect));

  const backgroundColor = scene.getBackgroundColor();
  if (backgroundColor) {
    graphics.fillRect(Rect.fromDimensions(scene.getDimensions()), backgroundColor);
  }
  const backgroundImage = scene.getBackgroundImage();
  if (backgroundImage) {
    graphics.drawImage(backgroundImage, Coordinates.zero());
  }

  const sceneRect = Rect.fromDimensions(scene.getDimensions());

  for (const entity of scene.getEntities()) {
    if (Rect.overlaps(sceneRect, entity.getSprite().getBoundingRect(entity))) {
      entity.getSprite().render(entity, graphics);
    }
  }
};
