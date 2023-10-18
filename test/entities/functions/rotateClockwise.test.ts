import { Angle } from '../../../src/geometry/Angle';
import { rotateClockwise } from '../../../src/entities/functions/rotateClockwise';
import { test, expect } from 'vitest';

test('rotate clockwise', () => {
  let angle: Angle = Angle.ofDegrees(10);
  const entity = {
    getAngle: () => angle,
    setAngle: (value: Angle) => {
      angle = value;
    }
  };

  rotateClockwise(entity, Angle.ofDegrees(15));
  expect(angle.degrees).toBe(25);
});
