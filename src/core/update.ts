import { updatePosition } from '../entities/functions/updatePosition';
import { Engine } from './Engine';
import { EngineImpl } from './EngineImpl';
import { applyAcceleration } from '../entities/functions/applyAcceleration';
import { applyFriction } from '../entities/functions/applyFriction';

export const update = (engine: Engine, dt: number): void => {
  const scene = engine.getScene();

  // Phase 1 - detect and fire collision events
  const collisions = (engine as EngineImpl)
    .getCollisionHandler()
    .detectCollisions(scene.getEntities());

  for (const { firstId, secondId } of collisions) {
    const first = scene.getEntityById(firstId);
    const second = scene.getEntityById(secondId);
    if (first && second) {
      for (const script of first.getScripts()) {
        script.onCollision?.(first, { other: second, engine, dt });
      }
      for (const script of second.getScripts()) {
        script.onCollision?.(second, { other: first, engine, dt });
      }
    }
  }

  // Phase 2 - execute global scripts
  // TODO - consider order of phases 1 and 2
  for (const script of engine.getGlobalScripts()) {
    script.onTick?.({ engine, dt });
  }

  // Phase 3 - execute everything's "update" event

  // TODO - need to worry about concurrent modification
  for (const entity of scene.getEntities()) {
    // TODO - think about script/behavior precedence
    for (const script of entity.getScripts()) {
      script.onTick?.(entity, { engine, dt });
    }
    const behaviors = entity.getBehaviors();
    for (const behavior of behaviors) {
      behavior.onTick?.(entity, { engine, dt });
    }
  }

  // Phase 4 - perform physics-based updates

  for (const entity of scene.getEntities()) {
    // TODO: perhaps a combined `applyPhysics` function
    applyAcceleration(entity, dt);
    applyFriction(entity, dt);
    updatePosition(entity, dt);
  }
};
