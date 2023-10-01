import { Scene } from './Scene';
import { Rect } from '../geometry/Rect.ts';
import { CanvasGraphicsImpl } from '../graphics/CanvasGraphicsImpl.ts';

export const renderScene = (scene: Scene) => {
  const buffer = scene.getBuffer();
  const backgroundColor = scene.getBackgroundColor();
  if (backgroundColor) {
    buffer.fillRect(Rect.fromDimensions(scene.getDimensions()), backgroundColor);
  }
  const backgroundImage = scene.getBackgroundImage();
  if (backgroundImage) {
    buffer.drawImage(backgroundImage, { x: 0, y: 0 });
  }

  for (const entity of scene.getEntities()) {
    entity.getSprite().render(entity, buffer);
  }

  scene.getViewport().fill('#000000');
  // TODO THIS WILL BREAK
  (scene.getViewport() as CanvasGraphicsImpl).renderOther(buffer, scene.getCamera().getRect());
};
