import { Entity } from '../entities/Entity.ts';
import { Angle } from '../geometry/Angle.ts';
import { Coordinates } from '../geometry/Coordinates.ts';
import { createTargetSprite } from './targetSprite.ts';
import { ENTITY_NAME_TARGET } from '../core/constants.ts';

type Props = Readonly<{
  color: string;
  centerCoordinates: Coordinates;
}>;

export const createTarget = ({ color, centerCoordinates }: Props): Entity =>
  Entity.create({
    name: ENTITY_NAME_TARGET,
    centerCoordinates,
    angle: Angle.ofDegrees(0),
    sprite: createTargetSprite({ color })
  });
