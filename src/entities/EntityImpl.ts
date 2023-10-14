import { Coordinates } from '../geometry/Coordinates';
import { Angle } from '../geometry/Angle';
import { Vector } from '../geometry/Vector';
import { Entity } from './Entity';
import { Sprite } from '../graphics/Sprite';
import { EntityScript } from '../events/EntityScript';
import { EntityProps } from './EntityProps';
import { EntityBehavior } from './behaviors/EntityBehavior';
import { check } from '../utils';

let nextId: number = 1;

export class EntityImpl implements Entity {
  private readonly id: number;
  private readonly name: string;
  private centerCoordinates: Coordinates;
  private angle: Angle;
  private speed: Vector;
  private maxSpeed: number | null;
  private acceleration: Vector;
  private friction: number;
  private readonly sprite: Sprite;
  private readonly scripts: EntityScript[];
  private readonly behaviors: EntityBehavior[];
  private readonly stringVariables: Record<string, string | null>;

  constructor(props: EntityProps) {
    this.id = nextId++;
    this.name = props.name;
    this.centerCoordinates = props.centerCoordinates;
    this.angle = props.angle;
    this.speed = props.speed ?? Vector.zero();
    this.maxSpeed = props.maxSpeed ?? null;
    if (props.friction !== undefined) {
      check(props.friction >= 0 && props.friction <= 1);
    }
    this.friction = props.friction ?? 0;
    this.acceleration = Vector.zero();
    this.sprite = props.sprite;
    this.scripts = props.scripts ?? [];
    this.behaviors = props.behaviors ?? [];
    this.stringVariables = {};
  }

  /**
   * I couldn't decide between numerical and string ids, so... split the difference...
   */
  getId = (): string => `${this.id}`;

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

  getAcceleration = (): Vector => this.acceleration;
  setAcceleration = (acceleration: Vector): void => {
    this.acceleration = acceleration;
  };

  getFriction = (): number => this.friction;
  setFriction = (friction: number): void => {
    check(friction >= 0 && friction <= 1);
    this.friction = friction;
  };

  getSprite = (): Sprite => this.sprite;

  getScripts = (): EntityScript[] => this.scripts;

  addScript = (script: EntityScript): void => {
    this.scripts.push(script);
  };

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
