import { Entity } from './Entity';
import type { EntityBehavior } from './behaviors/EntityBehavior.ts';
import { BounceOffEdgesBehavior } from './behaviors/BounceOffEdgesBehavior.ts';
import type { EntityProps } from './EntityProps';
import type { EntityScript } from './EntityScript';
import { ClampToSceneBehavior } from './behaviors/ClampToSceneBehavior.ts';
import { CameraFollowBehavior } from './behaviors/CameraFollowBehavior.ts';
import { getEntitiesOverlappingRect } from './functions/getEntitiesOverlappingRect.ts';
import { isCollidingWith } from './functions/isCollidingWith.ts';
import { rotateClockwise } from './functions/rotateClockwise.ts';
import { rotateCounterClockwise } from './functions/rotateCounterClockwise.ts';
import { accelerate } from './functions/accelerate.ts';

export { Entity, BounceOffEdgesBehavior, CameraFollowBehavior, ClampToSceneBehavior };
export type { EntityBehavior, EntityProps, EntityScript };

// TODO: put some thought into how to export these
export {
  accelerate,
  getEntitiesOverlappingRect,
  isCollidingWith,
  rotateClockwise,
  rotateCounterClockwise
};
