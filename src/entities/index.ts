import { Entity } from './Entity';
import type { EntityBehavior } from './behaviors/EntityBehavior.ts';
import { BounceOffEdgesBehavior } from './behaviors/BounceOffEdgesBehavior.ts';
import type { EntityProps } from './EntityProps';
import type { EntityScript } from './EntityScript';
import { ClampToSceneBehavior } from './behaviors/ClampToSceneBehavior.ts';
import { CameraFollowBehavior } from './behaviors/CameraFollowBehavior.ts';

export { Entity, BounceOffEdgesBehavior, CameraFollowBehavior, ClampToSceneBehavior };
export type { EntityBehavior, EntityProps, EntityScript };
