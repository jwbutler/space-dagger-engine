import { Graphics } from '../graphics/Graphics';
import { Sprite } from '../graphics/Sprite';
import { Coordinates } from '../geometry/Coordinates';
import { Angle } from '../geometry/Angle';
import { Rect } from '../geometry/Rect';
import { SHIP_RADIUS } from '../core/constants.ts';
import { Entity } from '../entities/Entity.ts';
import { getNoseCoordinates } from './playerShip.ts';

type Props = Readonly<{
  color: string;
}>;

export const createVectorSprite = (props: Props): Sprite => new VectorSprite(props);

class VectorSprite implements Sprite {
  private readonly color: string;
  constructor({ color }: Props) {
    this.color = color;
  }

  render = (ship: Entity, graphics: Graphics): void => {
    const enginePoints = this._getEnginePoints(ship);
    graphics.drawPolygon(enginePoints, '#c0c0c0');
    const points = this._getPoints(ship);
    graphics.drawPolygon(points, this.color);
    const cockpitPoints = this._getCockpitPoints(ship);
    graphics.drawPolygon(cockpitPoints, '#000000');
  };

  getBoundingRect = (ship: Entity): Rect => {
    return Rect.containingPoints(this._getPoints(ship));
  };

  private _getPoints = (ship: Entity): Coordinates[] => {
    const centerCoordinates = ship.getCenterCoordinates();
    const angle = ship.getAngle();
    const angleDegrees = 180 - 35;
    const center = centerCoordinates;
    const front = getNoseCoordinates(ship);

    const backLeft = (() => {
      const rotatedAngle = Angle.rotateCounterClockwise(
        angle,
        Angle.ofDegrees(angleDegrees)
      );
      return {
        x: center.x + SHIP_RADIUS * Math.cos(rotatedAngle.radians),
        y: center.y + SHIP_RADIUS * Math.sin(rotatedAngle.radians)
      };
    })();

    const backCenter = (() => {
      const rotatedAngle = Angle.rotateClockwise(angle, Angle.ofDegrees(180));
      return {
        x: center.x + SHIP_RADIUS * 0.4 * Math.cos(rotatedAngle.radians),
        y: center.y + SHIP_RADIUS * 0.4 * Math.sin(rotatedAngle.radians)
      };
    })();

    const backRight = (() => {
      const rotatedAngle = Angle.rotateClockwise(angle, Angle.ofDegrees(angleDegrees));
      return {
        x: center.x + SHIP_RADIUS * Math.cos(rotatedAngle.radians),
        y: center.y + SHIP_RADIUS * Math.sin(rotatedAngle.radians)
      };
    })();

    return [front, backLeft, backCenter, backRight];
  };

  private _getCockpitPoints = (ship: Entity): Coordinates[] => {
    const center = ship.getCenterCoordinates();
    const angle = ship.getAngle();

    const front = {
      x: center.x + SHIP_RADIUS * 0.5 * Math.cos(angle.radians),
      y: center.y + SHIP_RADIUS * 0.5 * Math.sin(angle.radians)
    };

    const backLeft = (() => {
      const rotatedAngle = Angle.rotateCounterClockwise(angle, Angle.ofDegrees(60));
      return {
        x: center.x + SHIP_RADIUS * 0.15 * Math.cos(rotatedAngle.radians),
        y: center.y + SHIP_RADIUS * 0.15 * Math.sin(rotatedAngle.radians)
      };
    })();

    const backRight = (() => {
      const rotatedAngle = Angle.rotateClockwise(angle, Angle.ofDegrees(60));
      return {
        x: center.x + SHIP_RADIUS * 0.15 * Math.cos(rotatedAngle.radians),
        y: center.y + SHIP_RADIUS * 0.15 * Math.sin(rotatedAngle.radians)
      };
    })();

    return [front, backLeft, backRight];
  };

  private _getEnginePoints = (ship: Entity): Coordinates[] => {
    const center = ship.getCenterCoordinates();
    const angle = ship.getAngle();

    const frontLeft = (() => {
      const rotatedAngle = Angle.rotateCounterClockwise(angle, Angle.ofDegrees(140));
      return {
        x: center.x + SHIP_RADIUS * 0.2 * Math.cos(rotatedAngle.radians),
        y: center.y + SHIP_RADIUS * 0.2 * Math.sin(rotatedAngle.radians)
      };
    })();
    const frontRight = (() => {
      const rotatedAngle = Angle.rotateClockwise(angle, Angle.ofDegrees(140));
      return {
        x: center.x + SHIP_RADIUS * 0.2 * Math.cos(rotatedAngle.radians),
        y: center.y + SHIP_RADIUS * 0.2 * Math.sin(rotatedAngle.radians)
      };
    })();
    const backLeft = (() => {
      const rotatedAngle = Angle.rotateCounterClockwise(angle, Angle.ofDegrees(172));
      return {
        x: center.x + SHIP_RADIUS * 0.7 * Math.cos(rotatedAngle.radians),
        y: center.y + SHIP_RADIUS * 0.7 * Math.sin(rotatedAngle.radians)
      };
    })();

    const backRight = (() => {
      const rotatedAngle = Angle.rotateClockwise(angle, Angle.ofDegrees(172));
      return {
        x: center.x + SHIP_RADIUS * 0.7 * Math.cos(rotatedAngle.radians),
        y: center.y + SHIP_RADIUS * 0.7 * Math.sin(rotatedAngle.radians)
      };
    })();

    return [frontLeft, frontRight, backRight, backLeft];
  };
}

export const createRasterSprite = ({ image }: { image: ImageBitmap }): Sprite =>
  new RasterSprite(image);

class RasterSprite implements Sprite {
  constructor(private readonly image: ImageBitmap) {}

  getBoundingRect = (entity: Entity): Rect => {
    const coordinates = entity.getCenterCoordinates();
    const { width, height } = this.image;
    return {
      left: coordinates.x - width / 2,
      top: coordinates.y - height / 2,
      width,
      height
    };
  };

  render = (entity: Entity, graphics: Graphics): void => {
    graphics.drawImage(this.image, {
      topLeft: Rect.getTopLeft(this.getBoundingRect(entity)),
      rotation: Angle.ofRadians(entity.getAngle().radians + Math.PI / 2)
    });
  };
}
