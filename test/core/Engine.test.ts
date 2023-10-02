import { test, expect, vi } from 'vitest';
import { EngineImpl } from '../../src/core/EngineImpl';
import { Camera, Engine, GlobalScript, Keyboard, Scene } from '../../src';
import { Graphics, UserInterface } from '../../src/graphics';
import { Rect } from '../../src/geometry';

test('engine', () => {
  const keyboard = {} as Keyboard;
  const scene = {} as Scene;
  const userInterface = {} as UserInterface;
  const viewport = {} as Graphics;
  const engine: Engine = new EngineImpl({
    keyboard,
    scene,
    userInterface,
    viewport
  });

  const script = {} as GlobalScript;
  engine.addGlobalScript(script);
  expect(engine.getGlobalScripts()).toEqual([script]);
  expect(engine.getKeyboard()).toBe(keyboard);
  expect(engine.getScene()).toBe(scene);
  expect(engine.getViewport()).toBe(viewport);
  expect(engine.getUserInterface()).toBe(userInterface);
});

test('startGameLoop', () => {
  const keyboard = {} as Keyboard;
  const graphics = {
    drawOnto: () => {}
  } as Partial<Graphics> as Graphics;
  const camera = {
    getRect: () => Rect.allBalls()
  } as Camera;
  const scene = {
    getEntities: () => [],
    getGraphics: () => graphics,
    getCamera: () => camera,
    getBackgroundColor: () => null,
    getBackgroundImage: () => null
  } as Partial<Scene> as Scene;
  const uiGraphics = {
    clear: () => {}
  } as Partial<Graphics> as Graphics;
  const userInterface = {
    getGraphics: () => uiGraphics,
    getUIElements: () => []
  } as Partial<UserInterface> as UserInterface;
  const viewport = {
    fill: () => {}
  } as Partial<Graphics> as Graphics;
  const engine: Engine = new EngineImpl({
    keyboard,
    scene,
    userInterface,
    viewport
  });

  const intervalMock = vi.stubGlobal('setInterval', (callback: () => void) => {
    callback();
  });
  engine.startGameLoop(1000);

  intervalMock.clearAllMocks();
});
