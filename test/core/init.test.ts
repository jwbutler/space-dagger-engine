import { test, expect, vi } from 'vitest';
import { Engine, init, Scene } from '../../src';

test('init', async () => {
  const container = {
    appendChild: () => {}
  } as unknown as HTMLElement;
  const viewportDimensions = { width: 100, height: 100 };
  const mockWindow = vi.stubGlobal('window', {
    addEventListener: () => {}
  });
  const mockDocument = vi.stubGlobal('document', {
    createElement: () => ({
      getContext: () => ({})
    })
  });
  const scene = {} as Scene;
  const engine: Engine = await init({
    container,
    viewportDimensions,
    scene
  });
  expect(engine.getScene()).toBe(scene);
  const viewport = engine.getViewport();
  expect(viewport.getDimensions()).toEqual(viewportDimensions);
  const userInterface = engine.getUserInterface();
  expect(userInterface.getGraphics().getDimensions()).toEqual(viewportDimensions);

  mockWindow.clearAllMocks();
  mockDocument.clearAllMocks();
});
