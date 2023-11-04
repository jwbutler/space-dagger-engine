import { Camera, Engine, init, Scene } from '../../src';
import { test, expect, vi } from 'vitest';

test('init', async () => {
  const container = {
    appendChild: () => {}
  } as unknown as HTMLElement;
  const mockWindow = vi.stubGlobal('window', {
    addEventListener: () => {}
  });
  const mockDocument = vi.stubGlobal('document', {
    createElement: () => ({
      getContext: () => ({})
    })
  });
  class MockAudioContext {
    createGain = () => ({
      gain: {},
      connect: () => {}
    });
  }
  const mockAudioContext = vi.stubGlobal('AudioContext', MockAudioContext);

  const viewportDimensions = { width: 100, height: 100 };
  const scene = Scene.create({
    name: 'scene',
    dimensions: { width: 200, height: 200 },
    camera: Camera.create({
      centerCoordinates: {
        x: viewportDimensions.width / 2,
        y: viewportDimensions.height / 2
      },
      dimensions: viewportDimensions
    })
  });
  const engine: Engine = await init({
    container,
    viewportDimensions,
    scenes: [scene],
    initialScene: 'scene'
  });
  expect(engine.getCurrentScene()).toBe(scene);
  const viewport = engine.getViewport();
  expect(viewport.getDimensions()).toEqual(viewportDimensions);

  mockWindow.clearAllMocks();
  mockDocument.clearAllMocks();
  mockAudioContext.clearAllMocks();
});
