import { Scene } from '../core/Scene';
import { Layer } from '../core/Layer';
import { Rect } from '../geometry';

export const renderScene = (scene: Scene) => {
  const graphics = scene.getGraphics();
  graphics.fill('#000000');

  const cameraRect = scene.getCamera().getRect();
  for (const layer of scene.getLayers()) {
    renderLayer(layer, scene);
    const sourceRect = {
      left: cameraRect.left * layer.getParallax().horizontal,
      top: cameraRect.top * layer.getParallax().vertical,
      width: cameraRect.width * layer.getParallax().horizontal,
      height: cameraRect.height * layer.getParallax().vertical
    };
    layer.getGraphics().drawOnto(graphics, {
      sourceRect
    });
  }
};

const renderLayer = (layer: Layer, scene: Scene): void => {
  const graphics = layer.getGraphics();
  graphics.clear();
  const backgroundColor = layer.getBackgroundColor();
  if (backgroundColor) {
    // TODO should layers have their own dimensions?
    graphics.fillRect(Rect.fromDimensions(scene.getDimensions()), backgroundColor);
  }
  const backgroundImage = layer.getBackgroundImage();
  if (backgroundImage) {
    graphics.drawImage(backgroundImage, {
      topLeft: { x: 0, y: 0 }
    });
  }

  for (const entity of scene.getEntities()) {
    if (entity.getLayer() === layer) {
      entity.getSprite().render(entity, layer.getGraphics());
    }
  }
};
