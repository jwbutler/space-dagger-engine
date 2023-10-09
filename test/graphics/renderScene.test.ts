import { describe, expect, test, vi } from 'vitest';
import { Graphics } from '../../src/graphics/Graphics';
import { renderScene } from '../../src/graphics/renderScene';
import { Sprite } from '../../src/graphics/Sprite';
import { Coordinates } from '../../src/geometry/Coordinates';
import { Angle } from '../../src/geometry/Angle';
import { Rect } from '../../src/geometry/Rect';
import { Camera } from '../../src/geometry/Camera';
import { Scene } from '../../src/core/Scene';
import { Layer } from '../../src/core/Layer';

describe('renderScene', () => {
  const graphics = {
    fill: () => {}
  } as unknown as Graphics;
  const backgroundImage = {} as ImageBitmap;
  const camera = {
    getRect: () => Rect.allBalls()
  } as Camera;
  const layerGraphics = {
    fillRect: () => {},
    drawImage: () => {},
    fill: () => {},
    drawOnto: () => {}
  } as unknown as Graphics;
  const layer = {
    getGraphics: () => layerGraphics,
    getBackgroundColor: () => 'red',
    getBackgroundImage: () => backgroundImage
  } as Layer;
  const sprite = {
    render: () => {}
  } as unknown as Sprite;
  const entity = {
    getSprite: () => sprite,
    getLayer: () => layer,
    getCenterCoordinates: () => Coordinates.zero(),
    getAngle: () => Angle.ofDegrees(0)
  };
  const scene = {
    getGraphics: () => graphics,
    getLayers: () => [layer],
    getCamera: () => camera,
    getDimensions: () => ({ width: 200, height: 300 }),
    getEntities: () => [entity]
  } as Scene;

  /**
   * There is a TON of jank in this method, think about how to write more effective tests for this
   */
  test('render', () => {
    const fillRectSpy = vi.spyOn(layerGraphics, 'fillRect');
    const renderSpy = vi.spyOn(sprite, 'render');
    const drawImageSpy = vi.spyOn(layerGraphics, 'drawImage');
    renderScene(scene);
    expect(renderSpy).toHaveBeenCalledWith(entity, layerGraphics);
    expect(fillRectSpy).toHaveBeenCalledWith(
      { left: 0, top: 0, width: 200, height: 300 },
      'red'
    );
    expect(drawImageSpy).toHaveBeenCalledWith(layer.getBackgroundImage(), {
      topLeft: { x: 0, y: 0 }
    });
  });
});
