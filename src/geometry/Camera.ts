import { Coordinates } from './Coordinates';
import { Rect } from './Rect';
import { Dimensions } from './Dimensions';

export interface Camera {
  getCenterCoordinates: () => Coordinates;
  setCenterCoordinates: (coordinates: Coordinates) => void;
  getDimensions: () => Dimensions;
  setDimensions: (dimensions: Dimensions) => void;
  getRect: () => Rect;
}

type Props = Readonly<{
  centerCoordinates: Coordinates;
  dimensions: Dimensions;
}>;

class CameraImpl implements Camera {
  private centerCoordinates: Coordinates;
  private dimensions: Dimensions;

  constructor({ centerCoordinates, dimensions }: Props) {
    this.centerCoordinates = centerCoordinates;
    this.dimensions = dimensions;
  }

  getCenterCoordinates = (): Coordinates => this.centerCoordinates;

  getRect = (): Rect => ({
    left: this.centerCoordinates.x - this.dimensions.width / 2,
    top: this.centerCoordinates.y - this.dimensions.height / 2,
    width: this.dimensions.width,
    height: this.dimensions.height
  });

  setCenterCoordinates = (coordinates: Coordinates): void => {
    this.centerCoordinates = coordinates;
  };

  getDimensions = (): Dimensions => this.dimensions;

  setDimensions = (dimensions: Dimensions): void => {
    this.dimensions = dimensions;
  };
}

export namespace Camera {
  export const create = (props: Props) => new CameraImpl(props);
}
