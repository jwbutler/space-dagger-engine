import { Entity } from './Entity';
import { BounceOffEdgesBehavior } from './behaviors/BounceOffEdgesBehavior';
import { ClampToSceneBehavior } from './behaviors/ClampToSceneBehavior';
import { CameraFollowBehavior } from './behaviors/CameraFollowBehavior';
import { rotateClockwise } from './functions/rotateClockwise';
import { rotateCounterClockwise } from './functions/rotateCounterClockwise';
import { destroy } from './functions/destroy';
import { SolidBehavior } from './behaviors/SolidBehavior';
import type { EntityProps } from './EntityProps';
import type { EntityBehavior } from './behaviors/EntityBehavior';

export {
  Entity,
  BounceOffEdgesBehavior,
  CameraFollowBehavior,
  ClampToSceneBehavior,
  SolidBehavior
};
export type { EntityBehavior, EntityProps };

export { rotateClockwise, rotateCounterClockwise, destroy };
