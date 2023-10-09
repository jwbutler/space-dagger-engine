import { Scene } from '../core/Scene';
import { Layer } from '../core/Layer';
import { Rect } from '../geometry';

export const renderScene = (scene: Scene) => {
  const graphics = scene.getGraphics();
  graphics.fill('#000000');

  for (const layer of scene.getLayers()) {
    renderLayer(layer, scene);
    layer.getGraphics().drawOnto(graphics); // TODO params
  }
};

const renderLayer = (layer: Layer, scene: Scene): void => {
  const graphics = layer.getGraphics();
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
