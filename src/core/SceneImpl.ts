import { Scene } from './Scene';
import { Graphics } from '../graphics/Graphics';
import { Dimensions } from '../geometry/Dimensions';
import { Camera } from '../geometry/Camera';
import { Entity } from '../entities/Entity';
import { check } from '../utils/preconditions';
import { Arrays } from '../utils';
import { EntityImpl } from '../entities/EntityImpl';
import { Element } from '../graphics';

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
  private readonly elements: Element[];

  constructor(props: Props) {
    this.name = props.name;
    this.graphics = props.graphics;
    this.dimensions = props.dimensions;
    this.backgroundColor = props.backgroundColor ?? null;
    this.backgroundImage = props.backgroundImage ?? null;
    this.camera = props.camera;
    this.entities = [];
    this.elements = [];
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
    check((entity as EntityImpl).isInitialized());
    this.entities.push(entity);
  };

  removeEntity = (entity: Entity) => {
    check(this.entities.includes(entity));
    Arrays.filterInPlace(this.entities, e => e !== entity);
  };

  getEntitiesByName = (name: string): Entity[] =>
    this.entities.filter(entity => entity.getName() === name);

  getEntityById = (id: string): Entity | null =>
    this.entities.find(entity => entity.getId() === id) ?? null;

  clearEntities = (): void => Arrays.clear(this.entities);

  addElement = (element: Element): void => {
    this.elements.push(element);
  };

  getElements = (): Element[] => this.elements;

  removeElement = (element: Element) => {
    check(this.elements.includes(element));
    Arrays.filterInPlace(this.elements, e => e !== element);
  };
}
