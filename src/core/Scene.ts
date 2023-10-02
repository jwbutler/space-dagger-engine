import { Dimensions } from '../geometry/Dimensions';
import { Camera } from '../geometry/Camera';
import { Entity } from '../entities/Entity';
import { Graphics } from '../graphics/Graphics';
import { SceneImpl } from './SceneImpl.ts';

export interface Scene {
  getName: () => string;
  getGraphics: () => Graphics;
  getDimensions: () => Dimensions;
  getBackgroundColor: () => string | null;
  setBackgroundColor: (color: string | null) => void;
  getBackgroundImage: () => ImageBitmap | null;
  setBackgroundImage: (image: ImageBitmap | null) => void;
  getCamera: () => Camera;
  getEntities: () => Entity[];
  addEntity: (entity: Entity) => void;
  removeEntity: (entity: Entity) => void;
  getEntitiesByName: (name: string) => Entity[];
}

type Props = Readonly<{
  name: string;
  dimensions: Dimensions;
  backgroundColor?: string;
  backgroundImage?: ImageBitmap;
  camera: Camera;
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
