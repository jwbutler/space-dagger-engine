import { Dimensions } from '../geometry/Dimensions';
import { Camera } from '../geometry/Camera';
import { Entity } from '../entities/Entity';
import { Graphics } from '../graphics/Graphics';
import { SceneImpl } from './SceneImpl';
import { Layer } from './Layer';

export interface Scene {
  getName: () => string;
  getGraphics: () => Graphics;
  getLayers: () => Layer[];
  getDimensions: () => Dimensions;
  getCamera: () => Camera;
  getEntities: () => Entity[];
  addEntity: (entity: Entity) => void;
  removeEntity: (entity: Entity) => void;
  getEntitiesByName: (name: string) => Entity[];
  getEntityById: (id: string) => Entity | null;
}

type Props = Readonly<{
  name: string;
  dimensions: Dimensions;
  camera: Camera;
  layers: Layer[];
}>;

export namespace Scene {
  export const create = (props: Props): Scene => {
    const graphics = Graphics.create({
      dimensions: props.dimensions,
      id: `graphics_${props.name}`
    });
    return new SceneImpl({
      ...props,
      graphics
    });
  };
}
