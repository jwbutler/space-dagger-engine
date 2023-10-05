import { UIElement } from './UIElement';
import { Graphics } from '../Graphics';
import { Coordinates } from '../../geometry/Coordinates';

type Props = Readonly<{
  text: string;
  color: string;
  font: string;
  topLeft: Coordinates;
}>;

interface TextElement extends UIElement {
  getText: () => string;
  setText: (value: string) => void;
}

class TextElementImpl implements TextElement {
  private text: string;
  private readonly color: string;
  private readonly font: string;
  private readonly topLeft: Coordinates;

  constructor({ text, color, font, topLeft }: Props) {
    this.text = text;
    this.color = color;
    this.font = font;
    this.topLeft = topLeft;
  }

  render = (graphics: Graphics) => {
    const { text, color, font, topLeft } = this;
    graphics.drawText(text, font, color, topLeft);
  };

  setText = (value: string) => {
    this.text = value;
  };
  getText = (): string => this.text;
}

export namespace TextElement {
  export const create = (props: Props): TextElement => new TextElementImpl(props);
}
