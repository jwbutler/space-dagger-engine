import { test, expect, vi, describe } from 'vitest';
import { EngineImpl } from '../../src/core/EngineImpl';
import { Camera, Engine, GlobalScript, Keyboard, Scene } from '../../src';
import { Graphics, UserInterface } from '../../src/graphics';
import { Rect } from '../../src/geometry';
import { SceneImpl } from '../../src/core/SceneImpl';

describe('Engine', () => {
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

    expect(engine.getStringVariable('key')).toBe(null);
    engine.setStringVariable('key', 'value');
    expect(engine.getStringVariable('key')).toBe('value');
    engine.setStringVariable('key', null);
    expect(engine.getStringVariable('key')).toBe(null);
  });

  /**
   * TODO this sucks and is not testing anything
   */
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

  test('render', () => {
    vi.useFakeTimers({
      toFake: ['performance']
    });
    const renderTime = 0.0123;
    const sceneGraphics = {
      drawOnto: () => {
        vi.advanceTimersByTime(renderTime * 1000);
      }
    } as unknown as Graphics;
    const viewport = {
      fill: () => {}
    } as unknown as Graphics;
    const camera = {
      getRect: () => Rect.allBalls()
    } as Camera;
    const uiGraphics = {
      clear: () => {}
    } as Graphics;
    const userInterface = {
      getGraphics: () => uiGraphics,
      getUIElements: () => []
    } as unknown as UserInterface;
    const scene = {
      getGraphics: () => sceneGraphics,
      getCamera: () => camera,
      getBackgroundColor: () => null,
      getBackgroundImage: () => null,
      getEntities: () => []
    } as unknown as Scene;
    const engine = new EngineImpl({
      keyboard: {} as Keyboard,
      scene,
      userInterface,
      viewport
    });
    const script = {
      onRender: () => {}
    };
    const script_spy = vi.spyOn(script, 'onRender');
    engine.addGlobalScript(script);

    engine.render();
    expect(script_spy).toHaveBeenCalledWith({ renderTime: 0.0123 });

    vi.useRealTimers();
  });

  test('update', () => {
    vi.useFakeTimers({
      toFake: ['performance']
    });

    const engine = new EngineImpl({
      keyboard: {} as Keyboard,
      scene: new SceneImpl({
        graphics: {} as Graphics,
        name: 'test',
        camera: {} as Camera,
        dimensions: { width: 640, height: 480 }
      }),
      userInterface: {} as UserInterface,
      viewport: {} as Graphics
    });
    const delayScript = {
      onTick: () => {
        vi.advanceTimersByTime(10);
      }
    };
    const spyScript: GlobalScript = {
      onUpdate: vi.fn(() => {})
    };
    engine.addGlobalScript(delayScript);
    engine.addGlobalScript(spyScript);
    vi.advanceTimersByTime(10);
    engine.update();
    expect(spyScript.onUpdate).toHaveBeenCalledWith({ updateTime: 0.01 });

    vi.useRealTimers();
  });

  test('no-op update', () => {
    vi.useFakeTimers({
      toFake: ['performance']
    });

    const engine = new EngineImpl({
      keyboard: {} as Keyboard,
      scene: {} as Scene,
      userInterface: {} as UserInterface,
      viewport: {} as Graphics
    });
    const spyScript = {
      onUpdate: vi.fn(() => {})
    };
    engine.addGlobalScript(spyScript);
    engine.update();
    expect(spyScript.onUpdate).not.toHaveBeenCalled();

    vi.useRealTimers();
  });
});
