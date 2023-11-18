import { EngineImpl } from '../../src/core/EngineImpl';
import { Camera, Engine, Keyboard, ModifierKey, Scene } from '../../src';
import { Graphics } from '../../src/graphics';
import { Dimensions, Rect } from '../../src/geometry';
import { SceneImpl } from '../../src/core/SceneImpl';
import { EntityScript, GlobalScript } from '../../src/scripts';
import { SoundPlayer } from '../../src/audio';
import { Entity } from '../../src/entities';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';

describe('Engine', () => {
  beforeAll(() => {
    vi.stubGlobal('window', {
      requestAnimationFrame: () => {}
    });
  });

  const graphics = {
    drawOnto: () => {},
    translate: () => {}
  } as unknown as Graphics;
  const camera = {
    getRect: () => Rect.allBalls()
  } as Camera;
  const keyboard = {} as Keyboard;
  const soundPlayer = {} as SoundPlayer;
  const scene = {
    getName: () => 'what',
    getEntities: () => [],
    getElements: () => [],
    getGraphics: () => graphics,
    getCamera: () => camera,
    getBackgroundColor: () => null,
    getBackgroundImage: () => null,
    getDimensions: () => Dimensions.allBalls()
  } as unknown as Scene;
  const viewport = {
    fill: () => {}
  } as unknown as Graphics;
  const engine: Engine = new EngineImpl({
    keyboard,
    soundPlayer,
    scenes: [scene],
    initialScene: 'what',
    viewport
  });

  test('init', () => {
    expect(engine.getKeyboard()).toBe(keyboard);
    expect(engine.getSoundPlayer()).toBe(soundPlayer);
    expect(engine.getCurrentScene()).toBe(scene);
    expect(engine.getViewport()).toBe(viewport);
  });

  test('global scripts', () => {
    const script = {} as GlobalScript;
    engine.addGlobalScript(script);
    expect(engine.getGlobalScripts()).toEqual([script]);
    engine.removeGlobalScript(script);
    expect(engine.getGlobalScripts()).toEqual([]);
  });

  test('string variables', () => {
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
    const scene = {
      getName: () => 'what',
      getGraphics: () => sceneGraphics,
      getCamera: () => camera,
      getBackgroundColor: () => null,
      getBackgroundImage: () => null,
      getEntities: () => [],
      getElements: () => [],
      getDimensions: () => Dimensions.allBalls()
    } as unknown as Scene;
    const engine = new EngineImpl({
      keyboard: {} as Keyboard,
      soundPlayer: {} as SoundPlayer,
      scenes: [scene],
      initialScene: 'what',
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

    const scene = new SceneImpl({
      graphics: {} as Graphics,
      name: 'test',
      camera: {} as Camera,
      dimensions: { width: 640, height: 480 }
    });
    const engine = new EngineImpl({
      keyboard: {} as Keyboard,
      soundPlayer: {} as SoundPlayer,
      scenes: [scene],
      initialScene: 'test',
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
    const scene = {
      getName: () => 'what'
    } as Scene;
    const engine = new EngineImpl({
      keyboard: {} as Keyboard,
      soundPlayer: {} as SoundPlayer,
      scenes: [scene],
      initialScene: 'what',
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
    const scene = {
      getName: () => 'what',
      getEntities: () => [],
      getGraphics: () => ({}) as Graphics,
      getBackgroundColor: () => null,
      getBackgroundImage: () => null,
      getCamera: () => ({}) as Camera
    } as unknown as Scene;
    const engine = new EngineImpl({
      keyboard: {} as Keyboard,
      soundPlayer: {} as SoundPlayer,
      scenes: [scene],
      initialScene: 'what',
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
    const scene = {
      getName: () => 'what'
    } as Scene;
    const engine = new EngineImpl({
      keyboard: {} as Keyboard,
      soundPlayer: {} as SoundPlayer,
      scenes: [scene],
      initialScene: 'what',
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
    const scene = {
      getName: () => 'what'
    } as Scene;
    const engine = new EngineImpl({
      keyboard: {} as Keyboard,
      soundPlayer: {} as SoundPlayer,
      scenes: [scene],
      initialScene: 'what',
      viewport: {} as Graphics
    });

    const script = {} as GlobalScript;
    engine.addGlobalScript(script);
    expect(engine.getGlobalScripts()).toEqual([script]);
    engine.clearGlobalScripts();
    expect(engine.getGlobalScripts()).toEqual([]);
  });

  test('addScene', () => {
    const scene2 = {
      getName: () => 'scene2'
    } as Scene;
    engine.addScene(scene2);
    expect((engine as EngineImpl).getScenes()).toEqual([scene, scene2]);
    engine.setCurrentScene('scene2');
    expect(engine.getCurrentScene()).toEqual(scene2);
  });

  test('broadcastCustomEvent', () => {
    const globalScript = {
      onCustomEvent: vi.fn(() => {})
    } as GlobalScript;
    const entityScript = {
      onCustomEvent: vi.fn(() => {})
    } as EntityScript;

    engine.addGlobalScript(globalScript);

    const entity = {
      getScripts: () => [entityScript]
    } as Entity;

    const scene3 = {
      getName: () => 'scene3',
      getEntities: () => [entity]
    } as Scene;
    engine.addScene(scene3);
    engine.setCurrentScene('scene3');

    const event = { type: 'TEST', foo: 'bar' };
    engine.broadcastCustomEvent(event);

    expect(globalScript.onCustomEvent).toHaveBeenCalledWith(engine, event);
    expect(entityScript.onCustomEvent).toHaveBeenCalledWith(entity, engine, event);
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });
});
