import { test, expect, vi } from 'vitest';
import { Engine, init } from '../../src';

test('init', async () => {
  const container = {
    appendChild: () => {}
  } as unknown as HTMLElement;
  const viewportDimensions = { width: 100, height: 100 };
  const sceneDimensions = { width: 200, height: 200 };
  const mockWindow = vi.stubGlobal('window', {
    addEventListener: () => {}
  });
  const mockDocument = vi.stubGlobal('document', {
    createElement: () => ({
      getContext: () => ({})
    })
  });
  const engine: Engine = await init({
    container,
    viewportDimensions,
    sceneDimensions
  });
  const scene = engine.getScene();
  expect(scene.getDimensions()).toEqual(sceneDimensions);
  const viewport = engine.getViewport();
  expect(viewport.getDimensions()).toEqual(viewportDimensions);
  const userInterface = engine.getUserInterface();
  expect(userInterface.getGraphics().getDimensions()).toEqual(viewportDimensions);

  mockWindow.clearAllMocks();
  mockDocument.clearAllMocks();
});
