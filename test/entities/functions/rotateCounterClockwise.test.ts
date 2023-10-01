import { test, expect } from 'vitest';
import { Angle } from '../../../src/geometry/Angle';
import { rotateCounterClockwise } from '../../../src/entities/functions/rotateCounterClockwise';

test('rotate counterclockwise', () => {
  let angle: Angle = Angle.ofDegrees(10);
  const entity = {
    getAngle: () => angle,
    setAngle: (value: Angle) => {
      angle = value;
    }
  };

  rotateCounterClockwise(entity, Angle.ofDegrees(15));
  expect(angle.degrees).toBe(355);
});
