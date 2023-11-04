import { SceneImpl } from './SceneImpl';
import { Dimensions } from '../geometry/Dimensions';
import { Camera } from '../geometry/Camera';
import { Entity } from '../entities/Entity';
import { Graphics } from '../graphics/Graphics';
import { Element } from '../graphics';

export interface Scene {
  /**
   * This must be unique
   */
  getName: () => string;
  getGraphics: () => Graphics;
  getDimensions: () => Dimensions;
  getBackgroundColor: () => string | null;
  setBackgroundColor: (color: string | null) => void;
  getBackgroundImage: () => ImageBitmap | null;
  setBackgroundImage: (image: ImageBitmap | null) => void;
  getCamera: () => Camera;

  // Entities

  getEntities: () => Entity[];
  addEntity: (entity: Entity) => void;
  removeEntity: (entity: Entity) => void;
  getEntitiesByName: (name: string) => Entity[];
  getEntityById: (id: string) => Entity | null;
  clearEntities: () => void;

  // Elements

  getElements: () => Element[];
  addElement: (element: Element) => void;
  removeElement: (element: Element) => void;
  clearElements: () => void;
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
    const { width, height } = props.camera.getRect();

    const graphics = Graphics.create({
      dimensions: { width, height },
      id: `graphics_${props.name}`
    });

    return new SceneImpl({
      ...props,
      graphics
    });
  };
}
