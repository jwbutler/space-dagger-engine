import { Coordinates } from './Coordinates';
import * as SAT from 'sat';

export type Polygon = Readonly<{
  points: Coordinates[];
}>;

export namespace Polygon {
  export const overlaps = (first: Polygon, second: Polygon): boolean => {
    return SAT.testPolygonPolygon(toSATPolygon(first), toSATPolygon(second));
  };
}

const toSATPolygon = (polygon: Polygon): SAT.Polygon =>
  new SAT.Polygon(
    new SAT.Vector(0, 0),
    polygon.points.map(point => new SAT.Vector(point.x, point.y))
  );
