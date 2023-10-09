import { Graphics } from '../graphics/Graphics';
import { Dimensions } from '../geometry/Dimensions';
import { Camera } from '../geometry/Camera';
import { Entity } from '../entities/Entity';
import { check } from '../utils/preconditions';
import { Scene } from './Scene';
import { Arrays } from '../utils';
import { Layer } from './Layer';

type Props = Readonly<{
  name: string;
  graphics: Graphics;
  dimensions: Dimensions;
  layers: Layer[];
  camera: Camera;
}>;

export class SceneImpl implements Scene {
  private readonly name: string;
  private readonly graphics: Graphics;
  private readonly dimensions: Dimensions;
  private readonly layers: Layer[];
  private readonly camera: Camera;
  private readonly entities: Entity[];

  constructor(props: Props) {
    this.name = props.name;
    this.graphics = props.graphics;
    this.dimensions = props.dimensions;
    this.layers = props.layers;
    this.camera = props.camera;
    this.entities = [];
  }

  getName = (): string => this.name;

  getGraphics = (): Graphics => this.graphics;

  getLayers = (): Layer[] => this.layers;

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

  getEntityById = (id: string): Entity | null => {
    return this.entities.find(entity => entity.getId() === id) ?? null;
  };
}
