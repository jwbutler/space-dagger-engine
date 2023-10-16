import { describe, expect, test } from 'vitest';
import { Rect } from '../../src/geometry/Rect';

describe('Rect', () => {
  test('containingPoints', () => {
    const points = [
      { x: 1, y: 2 },
      { x: 3, y: 4 }
    ];
    const rect = Rect.containingPoints(points);
    const expected = {
      left: 1,
      top: 2,
      width: 2,
      height: 2
    };
    expect(rect).toEqual(expected);
  });

  test('overlaps', () => {
    const first = {
      left: 1,
      top: 1,
      width: 2,
      height: 1
    };
    const second = {
      left: 2,
      top: 1,
      width: 1,
      height: 1
    };
    expect(Rect.overlaps(first, second)).toBe(true);
  });

  test('edge-to-edge rectangles do not overlap', () => {
    const first = {
      left: 1,
      top: 1,
      width: 2,
      height: 1
    };
    const second = {
      left: 3,
      top: 1,
      width: 1,
      height: 1
    };
    expect(Rect.overlaps(first, second)).toBe(false);
  });

  test('contains', () => {
    const first = {
      left: 1,
      top: 1,
      width: 2,
      height: 2
    };
    const second = {
      left: 2,
      top: 2,
      width: 1,
      height: 1
    };
    expect(Rect.contains(first, second)).toBe(true);
  });

  test('getVertices', () => {
    const rect = { left: 1, top: 2, width: 3, height: 4 };

    const expected = [
      { x: 1, y: 2 },
      { x: 4, y: 2 },
      { x: 4, y: 6 },
      { x: 1, y: 6 }
    ];
    const actual = Rect.getVertices(rect);
    for (const vertex of expected) {
      expect(actual).toContainEqual(vertex);
    }
  });
});
