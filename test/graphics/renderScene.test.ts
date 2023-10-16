import { describe, expect, test, vi } from 'vitest';
import { Graphics } from '../../src/graphics/Graphics';
import { renderScene } from '../../src/graphics/renderScene';
import { Sprite } from '../../src/graphics/Sprite';
import { Coordinates } from '../../src/geometry/Coordinates';
import { Angle } from '../../src/geometry/Angle';
import { Rect } from '../../src/geometry/Rect';
import { Camera } from '../../src/geometry/Camera';
import { Scene } from '../../src/core/Scene';

describe('renderScene', () => {
  const graphics = {
    fillRect: () => {},
    drawImage: () => {},
    fill: () => {},
    scroll: () => {},
    renderOther: () => {}
  } as Partial<Graphics> as Graphics;
  const sprite = {
    render: () => {}
  } as Partial<Sprite> as Sprite;
  const backgroundImage = {} as unknown;
  const entity = {
    getSprite: () => sprite,
    getCenterCoordinates: () => Coordinates.zero(),
    getAngle: () => Angle.ofDegrees(0)
  };
  const camera = {
    getRect: () => Rect.allBalls()
  } as Camera;
  const scene = {
    getGraphics: () => graphics,
    getBackgroundColor: () => 'red',
    getBackgroundImage: () => backgroundImage,
    getCamera: () => camera,
    getDimensions: () => ({ width: 200, height: 300 }),
    getEntities: () => [entity]
  } as Scene;

  /**
   * There is a TON of jank in this method, think about how to write more effective tests for this
   */
  test('render', () => {
    const fillRectSpy = vi.spyOn(graphics, 'fillRect');
    const renderSpy = vi.spyOn(sprite, 'render');
    const drawImageSpy = vi.spyOn(graphics, 'drawImage');
    renderScene(scene);
    expect(renderSpy).toHaveBeenCalledWith(entity, graphics);
    expect(fillRectSpy).toHaveBeenCalledWith(
      { left: 0, top: 0, width: 200, height: 300 },
      'red'
    );
    expect(drawImageSpy).toHaveBeenCalledWith(scene.getBackgroundImage(), { x: 0, y: 0 });
  });
});
