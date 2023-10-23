import { Polygon } from '../../src/geometry/Polygon';
import { test, expect, describe } from 'vitest';

describe('Polygon', () => {
  test('overlap', () => {
    const first: Polygon = {
      points: [
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 2 },
        { x: 0, y: 2 }
      ]
    };

    const second: Polygon = {
      points: [
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 3, y: 3 },
        { x: 1, y: 3 }
      ]
    };

    expect(Polygon.overlaps(first, second)).toBe(true);
  });

  test('corner-to-corner', () => {
    const first: Polygon = {
      points: [
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 2 },
        { x: 0, y: 2 }
      ]
    };

    const second: Polygon = {
      points: [
        { x: 2, y: 2 },
        { x: 4, y: 2 },
        { x: 4, y: 4 },
        { x: 2, y: 4 }
      ]
    };

    expect(Polygon.overlaps(first, second)).toBe(true);
  });

  test('non-overlap', () => {
    const first: Polygon = {
      points: [
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 2 },
        { x: 0, y: 2 }
      ]
    };

    const second: Polygon = {
      points: [
        { x: 2.1, y: 2 },
        { x: 4, y: 2 },
        { x: 4, y: 4 },
        { x: 2.1, y: 4 }
      ]
    };

    expect(Polygon.overlaps(first, second)).toBe(false);
  });
});
