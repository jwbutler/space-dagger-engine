import { Graphics } from '../graphics';
import { Dimensions } from '../geometry';
import { LayerImpl } from './LayerImpl';

export type Parallax = Readonly<{
  horizontal: number;
  vertical: number;
}>;

export interface Layer {
  getName: () => string;
  getGraphics: () => Graphics;
  getBackgroundColor: () => string | null;
  setBackgroundColor: (color: string | null) => void;
  getBackgroundImage: () => ImageBitmap | null;
  setBackgroundImage: (image: ImageBitmap | null) => void;
  /** Basically z-index - higher layers draw on top of lower layers */
  getDepth: () => number;
  getParallax: () => Parallax;
}

type Props = Readonly<{
  name: string;
  dimensions: Dimensions;
  backgroundColor?: string | null;
  backgroundImage?: ImageBitmap | null;
  depth: number;
  parallax?: Parallax | null;
}>;

export namespace Layer {
  export const create = (props: Props) => {
    const graphics = Graphics.create({
      id: `layer_${props.name}`,
      dimensions: props.dimensions
    });
    return new LayerImpl({
      ...props,
      graphics
    });
  };
}
