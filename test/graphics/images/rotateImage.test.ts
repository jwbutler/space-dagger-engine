import { test, expect, vi, describe, beforeAll, afterAll } from 'vitest';
import { ImageType, rotateImage } from '../../../src/graphics';
import { Angle } from '../../../src/geometry';
import { isWithinEpsilon } from '../../testUtils';

const sqrt_2 = 2 ** 0.5;

describe('rotateImage', () => {
  const createMockContext = () => {
    return {
      save: () => {},
      translate: () => {},
      rotate: () => {},
      drawImage: () => {},
      restore: () => {}
    } as unknown as CanvasRenderingContext2D;
  };

  let mockContext: CanvasRenderingContext2D;

  beforeAll(() => {
    vi.stubGlobal('document', {
      createElement: () =>
        ({
          getContext: () => mockContext
        }) as unknown as HTMLCanvasElement
    });
  });

  test('(50, 10) -> 90 degrees', () => {
    mockContext = createMockContext();
    const imageBitmap = {} as ImageBitmap;
    const image = {
      delegate: imageBitmap,
      dimensions: { width: 50, height: 10 },
      origin: { x: 25, y: 5 }
    } as ImageType;
    const context_drawImage_spy = vi.spyOn(mockContext, 'drawImage');
    const rotated = rotateImage(image, Angle.ofDegrees(90));
    const expectedDimensions = {
      width: 10,
      height: 50
    };
    const epsilon = 0.000001;
    expect(isWithinEpsilon(rotated.dimensions.width, expectedDimensions.width, epsilon));
    expect(
      isWithinEpsilon(rotated.dimensions.height, expectedDimensions.height, epsilon)
    );
    const expectedOrigin = {
      x: expectedDimensions.width / 2,
      y: expectedDimensions.height / 2
    };
    expect(isWithinEpsilon(rotated.origin.x, expectedOrigin.x, epsilon));
    expect(isWithinEpsilon(rotated.origin.y, expectedOrigin.y, epsilon));

    expect(context_drawImage_spy).toHaveBeenCalledWith(imageBitmap, -25, -5);
  });

  test('(50, 10) -> 45 degrees', () => {
    mockContext = createMockContext();
    const imageBitmap = {} as ImageBitmap;
    const image = {
      delegate: imageBitmap,
      dimensions: { width: 50, height: 10 },
      origin: { x: 25, y: 5 }
    } as ImageType;
    const context_drawImage_spy = vi.spyOn(mockContext, 'drawImage');
    const rotated = rotateImage(image, Angle.ofDegrees(45));
    const expectedDimensions = {
      width: 10 / sqrt_2 + 50 / sqrt_2,
      height: 10 / sqrt_2 + 50 / sqrt_2
    };
    const epsilon = 0.000001;
    expect(isWithinEpsilon(rotated.dimensions.width, expectedDimensions.width, epsilon));
    expect(
      isWithinEpsilon(rotated.dimensions.height, expectedDimensions.height, epsilon)
    );
    const expectedOrigin = {
      x: expectedDimensions.width / 2,
      y: expectedDimensions.height / 2
    };
    expect(isWithinEpsilon(rotated.origin.x, expectedOrigin.x, epsilon));
    expect(isWithinEpsilon(rotated.origin.y, expectedOrigin.y, epsilon));

    expect(context_drawImage_spy).toHaveBeenCalledWith(imageBitmap, -25, -5);
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });
});
