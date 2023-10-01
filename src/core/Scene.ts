import { Dimensions } from '../geometry/Dimensions';
import { Camera } from '../geometry/Camera';
import { Entity } from '../entities/Entity';
import * as Arrays from '../utils/Arrays';
import { check } from '../utils/preconditions.ts';
import { Graphics } from '../graphics/Graphics.ts';

export interface Scene {
  getBuffer: () => Graphics;
  getViewport: () => Graphics;
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
  buffer: Graphics;
  viewport: Graphics;
  dimensions: Dimensions;
  backgroundColor?: string;
  backgroundImage?: ImageBitmap;
  camera: Camera;
}>;

class SceneImpl implements Scene {
  private readonly buffer: Graphics;
  private readonly viewport: Graphics;
  private readonly dimensions: Dimensions;
  private backgroundColor: string | null;
  private backgroundImage: ImageBitmap | null;
  private readonly camera: Camera;
  private readonly entities: Entity[];

  constructor(props: Props) {
    this.buffer = props.buffer;
    this.viewport = props.viewport;
    this.dimensions = props.dimensions;
    this.backgroundColor = props.backgroundColor ?? null;
    this.backgroundImage = props.backgroundImage ?? null;
    this.camera = props.camera;
    this.entities = [];
  }

  getBuffer = (): Graphics => this.buffer;

  getViewport = (): Graphics => this.viewport;

  getBackgroundColor = (): string | null => this.backgroundColor;

  setBackgroundColor = (color: string | null) => {
    this.backgroundColor = color;
  };

  getBackgroundImage = (): ImageBitmap | null => this.backgroundImage;

  setBackgroundImage = (image: ImageBitmap | null) => {
    this.backgroundImage = image;
  };

  getDimensions = (): Dimensions => this.dimensions;

  getCamera = (): Camera => this.camera;

  getEntities = (): Entity[] => this.entities;

  addEntity = (entity: Entity) => {
    this.entities.push(entity);
  };

  removeEntity = (entity: Entity) => {
    check(this.entities.includes(entity));
    Arrays.filterInPlace(this.entities, e => e !== entity);
  };

  getEntitiesByName = (name: string): Entity[] => {
    return this.entities.filter(entity => entity.getName() === name);
  };
}

export namespace Scene {
  export const create = (props: Props) => new SceneImpl(props);
}
