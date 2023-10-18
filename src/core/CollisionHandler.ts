import { Entity, isCollidingWith } from '../entities';
import { Arrays, getCurrentTimeSeconds } from '../utils';

// TODO - in general this logic is fairly application-specific to Space Dagger.
// Think about how to generalize this and perhaps make collision detection an optional "plugin"

export type Collision = Readonly<{
  firstId: string;
  secondId: string;
}>;

type Overlap = Readonly<{
  firstId: string;
  secondId: string;
}>;

type CollisionEvent = Readonly<
  Collision & {
    /** seconds */
    timestamp: number;
  }
>;

export interface CollisionHandler {
  detectCollisions: (entities: Entity[]) => Collision[];
}

type Props = Readonly<{
  /** seconds */
  gracePeriod: number;
}>;

export class CollisionHandlerImpl implements CollisionHandler {
  private readonly gracePeriod: number;
  /**
   * Stores the set of overlaps from the previous tick
   */
  private readonly overlaps: Overlap[];
  /**
   * Stores "recent" collision events
   */
  private readonly collisionEvents: CollisionEvent[];

  constructor({ gracePeriod }: Props) {
    this.gracePeriod = gracePeriod;
    this.overlaps = [];
    this.collisionEvents = [];
  }

  detectCollisions = (entities: Entity[]): Collision[] => {
    const currentTime = getCurrentTimeSeconds();
    const overlaps = getActiveOverlaps(entities);
    const collisions: Collision[] = [];

    for (const overlap of overlaps) {
      if (!this.overlaps.some(o => matches(o, overlap))) {
        if (
          !this.collisionEvents.some(
            c =>
              matches(c, overlap as Collision) &&
              c.timestamp >= currentTime - this.gracePeriod
          )
        ) {
          collisions.push(overlap as Collision);
          this.collisionEvents.push({
            ...overlap,
            timestamp: currentTime
          });
        }
      }
    }

    Arrays.clear(this.overlaps);
    this.overlaps.push(...overlaps);
    return collisions;
  };
}

const getActiveOverlaps = (entities: Entity[]): Overlap[] => {
  const overlaps: Overlap[] = [];
  for (let i = 0; i < entities.length; i++) {
    const first = entities[i];
    for (let j = i + 1; j < entities.length; j++) {
      const second = entities[j];
      if (isCollidingWith(first, second)) {
        overlaps.push({
          firstId: first.getId(),
          secondId: second.getId()
        });
      }
    }
  }
  return overlaps;
};

export const matches = (first: Overlap, second: Overlap) => {
  return (
    (first.firstId === second.firstId && first.secondId === second.secondId) ||
    (first.secondId === second.firstId && first.firstId === second.secondId)
  );
};

export namespace CollisionHandler {
  export const create = (): CollisionHandler =>
    new CollisionHandlerImpl({ gracePeriod: 0.25 });
}
