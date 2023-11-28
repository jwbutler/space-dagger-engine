import { Engine } from './Engine';
import { updatePosition } from '../entities/functions/updatePosition';
import { applyAcceleration } from '../entities/functions/applyAcceleration';
import { applyFriction } from '../entities/functions/applyFriction';

export const update = (engine: Engine, dt: number): void => {
  // Phase 1 - execute global scripts
  // Includes plugins
  for (const script of engine.getGlobalScripts()) {
    script.onTick?.(engine, { dt });
  }

  // Note - `engine.getCurrentScene()` can change during global scripts
  const scene = engine.getCurrentScene();

  // Phase 2 - execute everything's "update" event

  // TODO - need to worry about concurrent modification
  for (const entity of scene.getEntities()) {
    // TODO - think about script/behavior precedence
    for (const script of entity.getScripts()) {
      script.onTick?.(entity, engine, { dt });
    }
    const behaviors = entity.getBehaviors();
    for (const behavior of behaviors) {
      behavior.onTick?.(entity, engine, { dt });
    }
  }

  // Phase 3 - perform physics-based updates

  for (const entity of scene.getEntities()) {
    // TODO: perhaps a combined `applyPhysics` function
    applyAcceleration(entity, dt);
    applyFriction(entity, dt);
    updatePosition(entity, dt);
  }
};
