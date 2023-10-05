import { Scene } from '../core/Scene.ts';
import { Rect } from '../geometry/Rect.ts';

export const renderScene = (scene: Scene) => {
  const graphics = scene.getGraphics();
  const backgroundColor = scene.getBackgroundColor();
  if (backgroundColor) {
    graphics.fillRect(Rect.fromDimensions(scene.getDimensions()), backgroundColor);
  }
  const backgroundImage = scene.getBackgroundImage();
  if (backgroundImage) {
    graphics.drawImage(backgroundImage, {
      topLeft: { x: 0, y: 0 }
    });
  }

  for (const entity of scene.getEntities()) {
    entity.getSprite().render(entity, graphics);
  }
};
