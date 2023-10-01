import { test, expect } from 'vitest';
import { Graphics } from '../../src/graphics/Graphics';
import { renderScene } from '../../src/core/renderScene';
import { Sprite } from '../../src/graphics/Sprite';
import { Coordinates } from '../../src/geometry/Coordinates';
import { Angle } from '../../src/geometry/Angle';
import { Rect } from '../../src/geometry/Rect';
import { Camera } from '../../src/geometry/Camera';
import { Scene } from '../../src/core/Scene';

/**
 * There is a TON of jank in this method, think about how to write more effective tests for this
 */
test('render', () => {
  let fillRectArgs: unknown[] = [];
  let drawImageArgs: unknown[] = [];
  const graphics = {
    fillRect: (rect: Rect, color: string) => {
      fillRectArgs = [rect, color];
    },
    drawImage: (image: unknown, coordinates: Coordinates) => {
      drawImageArgs = [image, coordinates];
    },
    fill: () => {},
    scroll: () => {},
    renderOther: () => {}
  } as Partial<Graphics> as Graphics;
  let _arguments: unknown[] = [];
  const sprite = {
    render: (entity, graphics) => {
      _arguments = [entity, graphics];
    }
  } as Sprite;
  const backgroundImage = {} as unknown;
  const entity = {
    getSprite: () => sprite,
    getCenterCoordinates: () => Coordinates.zero(),
    getAngle: () => Angle.ofDegrees(0)
  };
  const scene = {
    // TODO these should probably be different references
    getBuffer: () => graphics,
    getViewport: () => graphics,
    getBackgroundColor: () => 'red',
    getBackgroundImage: () => backgroundImage,
    getCamera: () =>
      ({
        getRect: () => Rect.allBalls()
      }) as Camera,
    getDimensions: () => ({ width: 200, height: 300 }),
    getEntities: () => [entity]
  } as Scene;
  renderScene(scene);
  expect(_arguments).toEqual([entity, graphics]);
  expect(fillRectArgs).toEqual([{ left: 0, top: 0, width: 200, height: 300 }, 'red']);
  expect(drawImageArgs[0]).toBe(scene.getBackgroundImage());
});
