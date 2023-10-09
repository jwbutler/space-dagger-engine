import { Graphics } from '../graphics';
import { Layer, Parallax } from './Layer';

type Props = Readonly<{
  name: string;
  graphics: Graphics;
  backgroundColor?: string | null;
  backgroundImage?: ImageBitmap | null;
  depth: number;
  parallax?: Parallax | null;
}>;

export class LayerImpl implements Layer {
  private readonly name: string;
  private readonly graphics: Graphics;
  private readonly depth: number;
  private readonly parallax: Parallax;
  private backgroundColor: string | null;
  private backgroundImage: ImageBitmap | null;

  constructor(props: Props) {
    this.name = props.name;
    this.graphics = props.graphics;
    this.depth = props.depth;
    this.parallax = props.parallax ?? { horizontal: 1, vertical: 1 };
    this.backgroundColor = props.backgroundColor ?? null;
    this.backgroundImage = props.backgroundImage ?? null;
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

  getDepth = (): number => this.depth;
  getParallax = (): Parallax => this.parallax;
}
