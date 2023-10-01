import { updatePosition } from '../entities/functions/updatePosition';
import { Keyboard } from '../input/Keyboard.ts';
import { Scene } from './Scene';
import { GlobalScript } from '../events/GlobalScript.ts';

export const update = (
  scene: Scene,
  globalScripts: GlobalScript[],
  keyboard: Keyboard,
  dt: number
): void => {
  // Phase 1 - execute global scripts
  // TODO - consider order of phases 1 and 2
  for (const script of globalScripts) {
    script.onTick({ scene, keyboard, dt });
  }

  // Phase 2 - execute everything's "update" event

  // TODO - need to worry about concurrent modification
  for (const entity of scene.getEntities()) {
    // TODO - think about script/behavior precedence
    const script = entity.getScript();
    if (script) {
      script.update(entity, scene, keyboard, dt);
    }
    const behaviors = entity.getBehaviors();
    for (const behavior of behaviors) {
      behavior.update(entity, scene, keyboard, dt);
    }
  }

  // Phase 3 - perform physics-based updates

  for (const entity of scene.getEntities()) {
    updatePosition(entity, dt);
  }
};
