import { Coordinates } from '../geometry/Coordinates';
import { Angle } from '../geometry/Angle';
import { Vector } from '../geometry/Vector';
import { Entity } from './Entity';
import { Sprite } from '../graphics/Sprite';
import { EntityScript } from './EntityScript';
import { EntityProps } from './EntityProps';
import { EntityBehavior } from './behaviors/EntityBehavior';

export class EntityImpl implements Entity {
  private readonly name: string;
  private centerCoordinates: Coordinates;
  private angle: Angle;
  private speed: Vector;
  private maxSpeed: number | null;
  private readonly sprite: Sprite;
  private readonly script: EntityScript | null;
  private readonly behaviors: EntityBehavior[];
  private readonly stringVariables: Record<string, string | null>;

  constructor(props: EntityProps) {
    this.name = props.name;
    this.centerCoordinates = props.centerCoordinates;
    this.angle = props.angle;
    this.speed = props.speed ?? Vector.zero();
    this.maxSpeed = props.maxSpeed ?? null;
    this.sprite = props.sprite;
    this.script = props.script ?? null;
    this.behaviors = props.behaviors ?? [];
    this.stringVariables = {};
  }

  getName = (): string => this.name;

  getAngle = (): Angle => this.angle;

  setAngle = (angle: Angle): void => {
    this.angle = angle;
  };

  getCenterCoordinates = (): Coordinates => this.centerCoordinates;
  setCenterCoordinates = (coordinates: Coordinates): void => {
    this.centerCoordinates = coordinates;
  };

  getSpeed = (): Vector => this.speed;
  setSpeed = (speed: Vector) => {
    this.speed = speed;
  };

  getMaxSpeed = (): number | null => this.maxSpeed;
  setMaxSpeed = (maxSpeed: number | null) => {
    this.maxSpeed = maxSpeed;
  };

  getSprite = (): Sprite => this.sprite;

  getScript = (): EntityScript | null => this.script;

  getBehaviors = (): EntityBehavior[] => this.behaviors;

  addBehavior = (behavior: EntityBehavior): void => {
    this.behaviors.push(behavior);
  };

  getStringVariable = (key: string): string | null => {
    return this.stringVariables[key] ?? null;
  };
  setStringVariable = (key: string, value: string | null): void => {
    this.stringVariables[key] = value;
  };
}
