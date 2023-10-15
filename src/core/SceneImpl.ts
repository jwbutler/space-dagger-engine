import { Graphics } from '../graphics/Graphics';
import { Dimensions } from '../geometry/Dimensions';
import { Camera } from '../geometry/Camera';
import { Entity } from '../entities/Entity';
import { check } from '../utils/preconditions';
import { Scene } from './Scene';
import { Arrays } from '../utils';
import { EntityImpl } from '../entities/EntityImpl';
import { ImageType } from '../graphics/ImageType';

type Props = Readonly<{
  name: string;
  graphics: Graphics;
  dimensions: Dimensions;
  backgroundColor?: string;
  backgroundImage?: ImageType;
  camera: Camera;
}>;

export class SceneImpl implements Scene {
  private readonly name: string;
  private readonly graphics: Graphics;
  private readonly dimensions: Dimensions;
  private backgroundColor: string | null;
  private backgroundImage: ImageType | null;
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

  getBackgroundImage = (): ImageType | null => this.backgroundImage;

  setBackgroundImage = (image: ImageType | null) => {
    this.backgroundImage = image;
  };

  getDimensions = (): Dimensions => this.dimensions;

  getCamera = (): Camera => this.camera;

  getEntities = (): Entity[] => this.entities;

  addEntity = (entity: Entity) => {
    check((entity as EntityImpl).isInitialized());
    this.entities.push(entity);
  };

  removeEntity = (entity: Entity) => {
    check(this.entities.includes(entity));
    Arrays.filterInPlace(this.entities, e => e !== entity);
  };

  getEntitiesByName = (name: string): Entity[] => {
    return this.entities.filter(entity => entity.getName() === name);
  };

  getEntityById = (id: string): Entity | null => {
    return this.entities.find(entity => entity.getId() === id) ?? null;
  };
}
