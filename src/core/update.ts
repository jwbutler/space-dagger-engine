import { updatePosition } from '../entities/functions/updatePosition';
import { Engine } from './Engine.ts';

export const update = (engine: Engine, dt: number): void => {
  // Phase 1 - execute global scripts
  // TODO - consider order of phases 1 and 2
  for (const script of engine.getGlobalScripts()) {
    script.onTick({ engine, dt });
  }

  // Phase 2 - execute everything's "update" event

  // TODO - need to worry about concurrent modification
  const scene = engine.getScene();
  for (const entity of scene.getEntities()) {
    // TODO - think about script/behavior precedence
    const script = entity.getScript();
    if (script) {
      script.onTick?.(entity, engine, dt);
    }
    const behaviors = entity.getBehaviors();
    for (const behavior of behaviors) {
      behavior.onTick?.(entity, engine, dt);
    }
  }

  // Phase 3 - perform physics-based updates

  for (const entity of scene.getEntities()) {
    updatePosition(entity, dt);
  }
};
