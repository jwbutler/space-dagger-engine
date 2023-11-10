import { CollisionHandler, Overlap } from './CollisionHandler';
import { Engine } from '../../core/Engine';
import type { Plugin } from '../Plugin';

export class CollisionDetectionPluginImpl implements Plugin {
  constructor(private readonly collisionHandler: CollisionHandler) {}

  onTick = (engine: Engine) => {
    const { collisionHandler } = this;
    const scene = engine.getCurrentScene();
    // Phase 1 - detect and fire collision events
    const { collisions, overlaps } = collisionHandler.detectCollisions(
      scene.getEntities()
    );

    setCachedOverlaps(engine, overlaps);

    for (const { firstId, secondId } of collisions) {
      const first = scene.getEntityById(firstId);
      const second = scene.getEntityById(secondId);
      if (first && second) {
        for (const script of first.getScripts()) {
          script.onCollision?.(first, engine, { entity: first, other: second });
        }
        for (const script of second.getScripts()) {
          script.onCollision?.(second, engine, { entity: second, other: first });
        }
      }
    }
  };
}

const VAR_KEY_OVERLAPS = 'overlaps';

const serializeOverlaps = (overlaps: Overlap[]): string => {
  return JSON.stringify(overlaps);
};

const deserializeOverlaps = (serialized: string): Overlap[] => JSON.parse(serialized);

export const getCachedOverlaps = (engine: Engine): Overlap[] => {
  const value = engine.getStringVariable(VAR_KEY_OVERLAPS);
  if (!value) {
    return [];
  }

  return deserializeOverlaps(value);
};

export const setCachedOverlaps = (engine: Engine, overlaps: Overlap[]): void => {
  const value = serializeOverlaps(overlaps);
  engine.setStringVariable(VAR_KEY_OVERLAPS, value);
};

type Props = Readonly<{
  /** Ignore possible collisions outside of this range */
  sanityDX: number;
  /** Ignore possible collisions outside of this range */
  sanityDY: number;
  /** Ignore new collisions within X seconds of a previous collision */
  gracePeriod: number;
}>;

export namespace CollisionDetectionPlugin {
  export const create = ({
    sanityDX = 1000,
    sanityDY = 1000,
    gracePeriod = 0.25
  }: Props): Plugin => {
    const collisionHandler = CollisionHandler.create({
      sanityDX,
      sanityDY,
      gracePeriod
    });

    return new CollisionDetectionPluginImpl(collisionHandler);
  };
}
