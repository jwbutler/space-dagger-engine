import { Coordinates } from './Coordinates';
import { Rect } from './Rect';
import { Dimensions } from './Dimensions';

export interface Camera {
  getCenterCoordinates: () => Coordinates;
  setCenterCoordinates: (coordinates: Coordinates) => void;
  getRect: () => Rect;
}

type Props = Readonly<{
  centerCoordinates: Coordinates;
  dimensions: Dimensions;
}>;

class CameraImpl implements Camera {
  private centerCoordinates: Coordinates;
  private readonly dimensions: Dimensions;

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

  setCenterCoordinates = (coordinates: Coordinates) => {
    this.centerCoordinates = coordinates;
  };
}

export namespace Camera {
  export const create = (props: Props) => new CameraImpl(props);
}
