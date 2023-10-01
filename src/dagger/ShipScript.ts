import { Vector } from '../geometry/Vector';
import { Angle } from '../geometry/Angle';
import {
  ENTITY_NAME_MOVING_TARGET,
  ENTITY_NAME_SEEKER,
  ENTITY_NAME_SHOOTER,
  ENTITY_NAME_TARGET,
  SHIP_ACCELERATION,
  SHIP_ACCELERATION_BOOSTED,
  SHIP_MAX_SPEED,
  SHIP_MAX_SPEED_BOOSTED,
  SHIP_ROTATE_ANGLE,
  SHIP_ROTATE_ANGLE_BOOSTED
} from '../core/constants.ts';
import { HeldKey, Keyboard } from '../input/Keyboard.ts';
import { rotateCounterClockwise } from '../entities/functions/rotateCounterClockwise';
import { rotateClockwise } from '../entities/functions/rotateClockwise';
import { accelerate } from '../entities/functions/accelerate';
import { EntityScript } from '../entities/EntityScript';
import { Entity } from '../entities/Entity';
import { Scene } from '../core/Scene';
import { createBullet } from './bullet.ts';
import { BULLET_COOLDOWN, getNoseCoordinates, spendFuel } from './playerShip.ts';
import { getCurrentTimeSeconds } from '../utils/getCurrentTimeMillis.ts';

type ParsedInput = Readonly<{
  shift: boolean;
  up: boolean;
  doubleUp: boolean;
  down: boolean;
  doubleDown: boolean;
  left: boolean;
  doubleLeft: boolean;
  right: boolean;
  doubleRight: boolean;
  spacebar: boolean;
  strafeLeft: boolean;
  doubleStrafeLeft: boolean;
  strafeRight: boolean;
  doubleStrafeRight: boolean;
}>;

const parseInput = (heldKeys: HeldKey[]): ParsedInput => {
  const _isTapped = (...codes: string[]) =>
    codes.some(code => heldKeys.some(heldKey => heldKey.code === code));
  const _isDoubleTapped = (...codes: string[]) =>
    codes.some(code => heldKeys.some(heldKey => heldKey.code === code && heldKey.isDoubleTap));

  return {
    shift: _isTapped('ShiftLeft', 'ShiftRight'),
    up: _isTapped('ArrowUp', 'KeyW'),
    doubleUp: _isDoubleTapped('ArrowUp', 'KeyW'),
    down: _isTapped('ArrowDown', 'KeyS'),
    doubleDown: _isDoubleTapped('ArrowDown', 'KeyS'),
    left: _isTapped('ArrowLeft', 'KeyA'),
    doubleLeft: _isDoubleTapped('ArrowLeft', 'KeyA'),
    right: _isTapped('ArrowRight', 'KeyD'),
    doubleRight: _isDoubleTapped('ArrowRight', 'KeyD'),
    spacebar: _isTapped('Space'),
    strafeLeft: _isTapped('KeyQ'),
    doubleStrafeLeft: _isDoubleTapped('KeyQ'),
    strafeRight: _isTapped('KeyE'),
    doubleStrafeRight: _isDoubleTapped('KeyE')
  };
};

interface IEntityScript extends EntityScript {}

class ShipScriptImpl implements IEntityScript {
  private lastBulletFiredTime: number | null = null;

  update = (ship: Entity, scene: Scene, keyboard: Keyboard, dt: number) => {
    const inputState = parseInput(keyboard.getHeldKeys());

    if (inputState.shift || inputState.doubleUp) {
      ship.setMaxSpeed(SHIP_MAX_SPEED_BOOSTED);
    } else {
      ship.setMaxSpeed(SHIP_MAX_SPEED);
    }
    if (inputState.doubleUp) {
      const acceleration = Vector.fromAngle(ship.getAngle(), SHIP_ACCELERATION_BOOSTED);
      accelerate(ship, acceleration, dt);
      spendFuel(ship, dt);
    } else if (inputState.up) {
      const acceleration = Vector.fromAngle(ship.getAngle(), SHIP_ACCELERATION);
      accelerate(ship, acceleration, dt);
      spendFuel(ship, dt);
    }
    if (inputState.doubleDown) {
      const angle = Angle.rotateClockwise(ship.getAngle(), Angle.ofDegrees(180));
      const acceleration = Vector.fromAngle(angle, SHIP_ACCELERATION_BOOSTED);
      accelerate(ship, acceleration, dt);
      spendFuel(ship, dt);
    } else if (inputState.down) {
      const angle = Angle.rotateClockwise(ship.getAngle(), Angle.ofDegrees(180));
      const acceleration = Vector.fromAngle(angle, SHIP_ACCELERATION);
      accelerate(ship, acceleration, dt);
      spendFuel(ship, dt);
    }
    if (inputState.doubleLeft) {
      rotateCounterClockwise(ship, Angle.ofDegrees(SHIP_ROTATE_ANGLE_BOOSTED.degrees * dt));
      spendFuel(ship, dt);
    } else if (inputState.left) {
      rotateCounterClockwise(ship, Angle.ofDegrees(SHIP_ROTATE_ANGLE.degrees * dt));
      spendFuel(ship, dt);
    }

    if (inputState.doubleRight) {
      rotateClockwise(ship, Angle.ofDegrees(SHIP_ROTATE_ANGLE_BOOSTED.degrees * dt));
      spendFuel(ship, dt);
    } else if (inputState.right) {
      rotateClockwise(ship, Angle.ofDegrees(SHIP_ROTATE_ANGLE.degrees * dt));
      spendFuel(ship, dt);
    }

    if (inputState.doubleStrafeLeft) {
      const angle = Angle.rotateCounterClockwise(ship.getAngle(), Angle.ofDegrees(90));
      const acceleration = Vector.fromAngle(angle, SHIP_ACCELERATION_BOOSTED);
      accelerate(ship, acceleration, dt);
      spendFuel(ship, dt);
    } else if (inputState.strafeLeft) {
      const angle = Angle.rotateCounterClockwise(ship.getAngle(), Angle.ofDegrees(90));
      const acceleration = Vector.fromAngle(angle, SHIP_ACCELERATION);
      accelerate(ship, acceleration, dt);
      spendFuel(ship, dt);
    }

    if (inputState.doubleStrafeRight) {
      const angle = Angle.rotateClockwise(ship.getAngle(), Angle.ofDegrees(90));
      const acceleration = Vector.fromAngle(angle, SHIP_ACCELERATION_BOOSTED);
      accelerate(ship, acceleration, dt);
      spendFuel(ship, dt);
    } else if (inputState.strafeRight) {
      const angle = Angle.rotateClockwise(ship.getAngle(), Angle.ofDegrees(90));
      const acceleration = Vector.fromAngle(angle, SHIP_ACCELERATION);
      accelerate(ship, acceleration, dt);
      spendFuel(ship, dt);
    }

    if (inputState.spacebar) {
      const currentTime = getCurrentTimeSeconds();
      const { lastBulletFiredTime } = this;
      if (lastBulletFiredTime === null || currentTime >= lastBulletFiredTime + BULLET_COOLDOWN) {
        const bullet = createBullet({
          color: 'magenta',
          centerCoordinates: getNoseCoordinates(ship),
          angle: ship.getAngle(),
          targetNames: [
            ENTITY_NAME_TARGET,
            ENTITY_NAME_MOVING_TARGET,
            ENTITY_NAME_SEEKER,
            ENTITY_NAME_SHOOTER
          ]
        });
        scene.addEntity(bullet);
        this.lastBulletFiredTime = currentTime;
      }
    }
  };
}

export namespace ShipScript {
  export const create = (): EntityScript => new ShipScriptImpl();
}
