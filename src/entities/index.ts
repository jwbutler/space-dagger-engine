import { Entity } from './Entity';
import type { EntityBehavior } from './behaviors/EntityBehavior';
import { BounceOffEdgesBehavior } from './behaviors/BounceOffEdgesBehavior';
import type { EntityProps } from './EntityProps';
import { ClampToSceneBehavior } from './behaviors/ClampToSceneBehavior';
import { CameraFollowBehavior } from './behaviors/CameraFollowBehavior';
import { getEntitiesOverlappingRect } from './functions/getEntitiesOverlappingRect';
import { isCollidingWith } from './functions/isCollidingWith';
import { rotateClockwise } from './functions/rotateClockwise';
import { rotateCounterClockwise } from './functions/rotateCounterClockwise';
import { destroy } from './functions/destroy';

export { Entity, BounceOffEdgesBehavior, CameraFollowBehavior, ClampToSceneBehavior };
export type { EntityBehavior, EntityProps };

// TODO: put some thought into how to export these
export {
  getEntitiesOverlappingRect,
  isCollidingWith,
  rotateClockwise,
  rotateCounterClockwise,
  destroy
};
