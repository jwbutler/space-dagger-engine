import { EngineImpl } from '../../src/core/EngineImpl';
import { Camera, Engine, Keyboard, ModifierKey, Scene } from '../../src';
import { Graphics, UserInterface } from '../../src/graphics';
import { Dimensions, Rect } from '../../src/geometry';
import { SceneImpl } from '../../src/core/SceneImpl';
import { GlobalScript } from '../../src/events';
import { SoundPlayer } from '../../src/audio';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';

describe('Engine', () => {
  beforeAll(() => {
    vi.stubGlobal('window', {
      requestAnimationFrame: () => {}
    });
  });

  test('engine', () => {
    const keyboard = {} as Keyboard;
    const soundPlayer = {} as SoundPlayer;
    const scene = {} as Scene;
    const userInterface = {} as UserInterface;
    const viewport = {} as Graphics;
    const engine: Engine = new EngineImpl({
      keyboard,
      soundPlayer,
      scene,
      userInterface,
      viewport
    });

    const script = {} as GlobalScript;
    engine.addGlobalScript(script);
    expect(engine.getGlobalScripts()).toEqual([script]);
    expect(engine.getKeyboard()).toBe(keyboard);
    expect(engine.getSoundPlayer()).toBe(soundPlayer);
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
    const soundPlayer = {} as SoundPlayer;
    const graphics = {
      drawOnto: () => {},
      translate: () => {}
    } as unknown as Graphics;
    const camera = {
      getRect: () => Rect.allBalls()
    } as Camera;
    const scene = {
      getEntities: () => [],
      getGraphics: () => graphics,
      getCamera: () => camera,
      getBackgroundColor: () => null,
      getBackgroundImage: () => null,
      getDimensions: () => Dimensions.allBalls()
    } as unknown as Scene;
    const uiGraphics = {
      clear: () => {}
    } as unknown as Graphics;
    const userInterface = {
      getGraphics: () => uiGraphics,
      getUIElements: () => []
    } as unknown as UserInterface;
    const viewport = {
      fill: () => {}
    } as unknown as Graphics;
    const engine: Engine = new EngineImpl({
      keyboard,
      soundPlayer,
      scene,
      userInterface,
      viewport
    });

    const intervalMock = vi.stubGlobal('setInterval', (callback: () => void) => {
      callback();
    });
    engine.startGameLoop();

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
      },
      translate: () => {}
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
      getEntities: () => [],
      getDimensions: () => Dimensions.allBalls()
    } as unknown as Scene;
    const engine = new EngineImpl({
      keyboard: {} as Keyboard,
      soundPlayer: {} as SoundPlayer,
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
      soundPlayer: {} as SoundPlayer,
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
    engine.update(0.05);
    expect(spyScript.onUpdate).toHaveBeenCalledWith({ updateTime: 0.01 });

    vi.useRealTimers();
  });

  test('no-op update', () => {
    const engine = new EngineImpl({
      keyboard: {} as Keyboard,
      soundPlayer: {} as SoundPlayer,
      scene: {} as Scene,
      userInterface: {} as UserInterface,
      viewport: {} as Graphics
    });
    const spyScript = {
      onUpdate: vi.fn(() => {})
    };
    engine.addGlobalScript(spyScript);
    engine.update(0);
    expect(spyScript.onUpdate).not.toHaveBeenCalled();
  });

  test('stopGameLoop', async () => {
    const engine = new EngineImpl({
      keyboard: {} as Keyboard,
      soundPlayer: {} as SoundPlayer,
      scene: {
        getEntities: () => [],
        getGraphics: () => ({}) as Graphics,
        getBackgroundColor: () => null,
        getBackgroundImage: () => null,
        getCamera: () => ({}) as Camera
      } as unknown as Scene,
      userInterface: {} as UserInterface,
      viewport: {
        fill: () => {}
      } as unknown as Graphics
    });

    let stopCallbackInvoked = false;
    const waitForInvoke = engine.stopGameLoop().then(() => {
      stopCallbackInvoked = true;
    });

    vi.spyOn(engine, 'update').mockImplementation(() => {});
    vi.spyOn(engine, 'render').mockImplementation(() => {});

    engine.doGameLoop(0);
    await waitForInvoke;
    expect(stopCallbackInvoked).toBe(true);
    vi.clearAllMocks();
  });

  describe('key handlers', () => {
    const engine = new EngineImpl({
      keyboard: {} as Keyboard,
      soundPlayer: {} as SoundPlayer,
      scene: {} as Scene,
      userInterface: {} as UserInterface,
      viewport: {} as Graphics
    });

    const script = {
      onKeyDown: () => {},
      onKeyUp: () => {}
    } as GlobalScript;
    engine.addGlobalScript(script);

    test('keyDown', () => {
      const onKeyDown_spy = vi.spyOn(script, 'onKeyDown');
      const event = {
        code: 'Enter',
        modifiers: new Set([ModifierKey.CTRL]),
        timestamp: 1234
      };
      engine.keyDown(event);
      expect(onKeyDown_spy).toHaveBeenCalledWith(event);
      onKeyDown_spy.mockClear();
    });
    test('keyUp', () => {
      const onKeyUp_spy = vi.spyOn(script, 'onKeyUp');
      const event = {
        code: 'Enter',
        timestamp: 1234
      };
      engine.keyUp(event);
      expect(onKeyUp_spy).toHaveBeenCalledWith(event);
      onKeyUp_spy.mockClear();
    });
  });

  test('clearGlobalScripts', () => {
    const engine = new EngineImpl({
      keyboard: {} as Keyboard,
      soundPlayer: {} as SoundPlayer,
      scene: {} as Scene,
      userInterface: {} as UserInterface,
      viewport: {} as Graphics
    });

    const script = {} as GlobalScript;
    engine.addGlobalScript(script);
    expect(engine.getGlobalScripts()).toEqual([script]);
    engine.clearGlobalScripts();
    expect(engine.getGlobalScripts()).toEqual([]);
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });
});
