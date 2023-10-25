import { Entity } from '../../entities';
import { Arrays, getCurrentTimeSeconds } from '../../utils';
import { Polygon } from '../../geometry';

export type Collision = Readonly<{
  firstId: string;
  secondId: string;
}>;

export type Overlap = Readonly<{
  firstId: string;
  secondId: string;
}>;

type CollisionEvent = Readonly<
  Collision & {
    /** seconds */
    timestamp: number;
  }
>;

export type CollisionResult = Readonly<{
  collisions: Collision[];
  overlaps: Overlap[];
}>;

export interface CollisionHandler {
  detectCollisions: (entities: Entity[]) => CollisionResult;
}

type Props = Readonly<{
  /** seconds */
  gracePeriod: number;
  sanityDX?: number | null;
  sanityDY?: number | null;
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
  private readonly sanityDX: number | null;
  private readonly sanityDY: number | null;

  constructor({ gracePeriod, sanityDX, sanityDY }: Props) {
    this.gracePeriod = gracePeriod;
    this.overlaps = [];
    this.collisionEvents = [];
    this.sanityDX = sanityDX ?? null;
    this.sanityDY = sanityDY ?? null;
  }

  detectCollisions = (entities: Entity[]): CollisionResult => {
    console.time('detectCollisions');
    const currentTime = getCurrentTimeSeconds();
    const overlaps = this.getActiveOverlaps(entities);
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
    console.timeEnd('detectCollisions');
    return { collisions, overlaps };
  };

  getActiveOverlaps = (entities: Entity[]): Overlap[] => {
    const { sanityDX, sanityDY } = this;
    const overlaps: Overlap[] = [];
    for (let i = 0; i < entities.length; i++) {
      const first = entities[i];
      for (let j = i + 1; j < entities.length; j++) {
        const second = entities[j];
        if (
          isMaybeOverlapping(first, second, sanityDX, sanityDY) &&
          isOverlapping(first, second)
        ) {
          overlaps.push({
            firstId: first.getId(),
            secondId: second.getId()
          });
        }
      }
    }
    return overlaps;
  };
}

/** exported for testing */
export const isMaybeOverlapping = (
  first: Entity,
  second: Entity,
  sanityDX: number | null,
  sanityDY: number | null
): boolean => {
  if (sanityDX !== null && sanityDY !== null) {
    const { x: x1, y: y1 } = first.getCenterCoordinates();
    const { x: x2, y: y2 } = second.getCenterCoordinates();
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    if (dx > sanityDX || dy > sanityDY) {
      return false;
    }
  }
  return true;
};

/** exported for testing */
export const isOverlapping = (first: Entity, second: Entity): boolean => {
  return Polygon.overlaps(
    first.getSprite().getCollisionPolygon(first),
    second.getSprite().getCollisionPolygon(second)
  );
};

export const matches = (first: Overlap, second: Overlap) => {
  return (
    (first.firstId === second.firstId && first.secondId === second.secondId) ||
    (first.secondId === second.firstId && first.firstId === second.secondId)
  );
};

export namespace CollisionHandler {
  export const create = (props: Props): CollisionHandler =>
    new CollisionHandlerImpl(props);
}
