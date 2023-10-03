import { Entity, isCollidingWith } from '../entities';
import { Arrays } from '../utils';

export type CollisionDetectionPair = Readonly<{
  firstId: string;
  secondId: string;
}>;

// TODO this state needs to be stored somewhere else

export interface CollisionHandler {
  detectCollisions: (entities: Entity[]) => CollisionDetectionPair[];
}

class CollisionHandlerImpl implements CollisionHandler {
  private readonly collisions: CollisionDetectionPair[];

  constructor() {
    this.collisions = [];
  }

  detectCollisions = (entities: Entity[]): CollisionDetectionPair[] => {
    const updatedCollisions = detectCollisions(entities);
    const newCollisions = findNewCollisions(this.collisions, updatedCollisions);
    Arrays.clear(this.collisions);
    this.collisions.push(...updatedCollisions);
    return newCollisions;
  };
}

const detectCollisions = (entities: Entity[]): CollisionDetectionPair[] => {
  const collisions: CollisionDetectionPair[] = [];
  for (let i = 0; i < entities.length; i++) {
    const first = entities[i];
    for (let j = i + 1; j < entities.length; j++) {
      const second = entities[j];
      if (isCollidingWith(first, second)) {
        collisions.push({ firstId: first.getId(), secondId: second.getId() });
      }
    }
  }
  return collisions;
};

/**
 * TODO massively inefficient
 */
const findNewCollisions = (
  collisions: CollisionDetectionPair[],
  updatedCollisions: CollisionDetectionPair[]
) => {
  const newCollisions: CollisionDetectionPair[] = [];
  for (const { firstId, secondId } of updatedCollisions) {
    if (!collisions.some(c => c.firstId === firstId && c.secondId === secondId)) {
      newCollisions.push({ firstId, secondId });
    }
  }
  return newCollisions;
};

export namespace CollisionHandler {
  export const create = (): CollisionHandler => new CollisionHandlerImpl();
}
