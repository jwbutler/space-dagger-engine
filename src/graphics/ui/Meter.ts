import { Element } from './Element';
import { Rect } from '../../geometry';
import { check } from '../../utils';
import { Graphics } from '../Graphics';

interface Meter extends Element {
  getValue: () => number;
  setValue: (value: number) => void;
  getMaxValue: () => number;
  setMaxValue: (value: number) => void;
}

type Props = Readonly<{
  color: string;
  emptyColor: string;
  borderColor?: string;
  value: number;
  maxValue: number;
  rect: Rect;
}>;

class MeterImpl implements Meter {
  private readonly color: string;
  private readonly emptyColor: string;
  private readonly borderColor: string | null;
  private value: number;
  private maxValue: number;
  private readonly rect: Rect;

  constructor(props: Props) {
    this.color = props.color;
    this.emptyColor = props.emptyColor;
    this.borderColor = props.borderColor ?? null;
    check(props.value >= 0 && props.value <= props.maxValue);
    this.value = props.value;
    this.maxValue = props.maxValue;
    this.rect = props.rect;
  }

  render = (graphics: Graphics): void => {
    graphics.fillRect(this.rect, this.emptyColor);
    const fullRect = {
      ...this.rect,
      width: (this.rect.width * this.value) / this.maxValue
    };
    graphics.fillRect(fullRect, this.color);
    if (this.borderColor) {
      graphics.drawRect(this.rect, this.borderColor);
    }
  };

  getValue = (): number => this.value;

  setValue = (value: number): void => {
    check(value >= 0 && value <= this.maxValue);
    this.value = value;
  };

  getMaxValue = (): number => this.maxValue;

  setMaxValue = (value: number): void => {
    check(value > 0);
    this.maxValue = value;
  };
}

export namespace Meter {
  export const create = (props: Props): Meter => new MeterImpl(props);
}
