import { Graphics } from '../graphics/Graphics';
import { Sprite } from '../graphics/Sprite';
import { Rect } from '../geometry/Rect';
import { TARGET_RADIUS } from '../core/constants.ts';
import { Entity } from '../entities/Entity.ts';

const RADIUS = TARGET_RADIUS;

type Props = Readonly<{
  color: string;
}>;

export const createTargetSprite = (props: Props): Sprite => new TargetSprite(props);

class TargetSprite implements Sprite {
  private readonly color: string;
  constructor({ color }: Props) {
    this.color = color;
  }

  render = (entity: Entity, graphics: Graphics): void => {
    graphics.drawCircle(entity.getCenterCoordinates(), RADIUS, this.color);
  };

  getBoundingRect = (entity: Entity): Rect => {
    const centerCoordinates = entity.getCenterCoordinates();
    return {
      left: centerCoordinates.x - RADIUS,
      top: centerCoordinates.y - RADIUS,
      width: 2 * RADIUS,
      height: 2 * RADIUS
    };
  };
}
