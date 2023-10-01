import { Angle } from '../geometry/Angle';
import { Rect } from '../geometry/Rect';
import { Dimensions } from '../geometry/Dimensions';

export const SHIP_RADIUS = 30;
export const SHIP_ACCELERATION = 500;
export const SHIP_ACCELERATION_BOOSTED = 1500;
export const SHIP_ROTATE_ANGLE = Angle.ofDegrees(180);
export const SHIP_ROTATE_ANGLE_BOOSTED = Angle.ofDegrees(540);
export const SHIP_MAX_SPEED = 400;
export const SHIP_MAX_SPEED_BOOSTED = 400;
export const BULLET_SPEED = 800;
export const STARTING_FUEL = 100;

export const SCREEN_WIDTH = 1280;
export const SCREEN_HEIGHT = 720;

export const SCENE_WIDTH = 1280 * 3;
export const SCENE_HEIGHT = 720 * 3;
export const SCENE_DIMENSIONS = { width: SCENE_WIDTH, height: SCENE_HEIGHT };

export const SCREEN_DIMENSIONS: Dimensions = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT
};
export const SCREEN_RECT: Rect = { left: 0, top: 0, width: SCREEN_WIDTH, height: SCREEN_HEIGHT };

export const BULLET_RADIUS = 5;
export const TARGET_RADIUS = 20;

export const ENTITY_NAME_PLAYER_SHIP = 'ship';
export const ENTITY_NAME_TARGET = 'target';
export const ENTITY_NAME_MOVING_TARGET = 'moving_target';
export const ENTITY_NAME_SEEKER = 'seeker';
export const ENTITY_NAME_SHOOTER = 'shooter';

export const TARGETS_COUNT = 10;
export const MOVING_TARGETS_COUNT = 15;
export const SEEKERS_COUNT = 7;
export const SHOOTERS_COUNT = 3;
