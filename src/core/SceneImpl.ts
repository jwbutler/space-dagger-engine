import { Graphics } from '../graphics/Graphics.ts';
import { Dimensions } from '../geometry/Dimensions.ts';
import { Camera } from '../geometry/Camera.ts';
import { Entity } from '../entities/Entity.ts';
import { check } from '../utils/preconditions.ts';
import * as Arrays from '../utils/Arrays.ts';
import { Scene } from './Scene.ts';

type Props = Readonly<{
  name: string;
  graphics: Graphics;
  dimensions: Dimensions;
  backgroundColor?: string;
  backgroundImage?: ImageBitmap;
  camera: Camera;
}>;

export class SceneImpl implements Scene {
  private readonly name: string;
  private readonly graphics: Graphics;
  private readonly dimensions: Dimensions;
  private backgroundColor: string | null;
  private backgroundImage: ImageBitmap | null;
  private readonly camera: Camera;
  private readonly entities: Entity[];

  constructor(props: Props) {
    this.name = props.name;
    this.graphics = props.graphics;
    this.dimensions = props.dimensions;
    this.backgroundColor = props.backgroundColor ?? null;
    this.backgroundImage = props.backgroundImage ?? null;
    this.camera = props.camera;
    this.entities = [];
  }

  getName = (): string => this.name;

  getGraphics = (): Graphics => this.graphics;

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
