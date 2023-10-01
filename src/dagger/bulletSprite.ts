import { Graphics } from '../graphics/Graphics';
import { Sprite } from '../graphics/Sprite';
import { Rect } from '../geometry/Rect';
import { BULLET_RADIUS } from '../core/constants.ts';
import { Entity } from '../entities/Entity.ts';

const RADIUS = BULLET_RADIUS;

type Props = Readonly<{
  color: string;
}>;

export const createBulletSprite = (props: Props): Sprite => new BulletSprite(props);

class BulletSprite implements Sprite {
  private readonly color: string;
  constructor({ color }: Props) {
    this.color = color;
  }

  render = (bullet: Entity, graphics: Graphics): void => {
    graphics.drawCircle(bullet.getCenterCoordinates(), RADIUS, this.color);
  };

  getBoundingRect = (bullet: Entity): Rect => {
    const centerCoordinates = bullet.getCenterCoordinates();
    return {
      left: centerCoordinates.x - RADIUS,
      top: centerCoordinates.y - RADIUS,
      width: 2 * RADIUS,
      height: 2 * RADIUS
    };
  };
}
