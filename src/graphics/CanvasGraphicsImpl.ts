import { DrawImageParams, DrawOntoParams, Graphics } from './Graphics';
import { Coordinates } from '../geometry/Coordinates';
import { Rect } from '../geometry/Rect';
import { Dimensions } from '../geometry/Dimensions';
import { check } from '../utils/preconditions';
import getTopLeft = Rect.getTopLeft;

type GraphicsProps = Readonly<{
  id: string;
  dimensions: Dimensions;
  pixelGraphics?: boolean;
}>;

export class CanvasGraphicsImpl implements Graphics {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly pixelGraphics: boolean;

  constructor({ id, dimensions, pixelGraphics }: GraphicsProps) {
    this.canvas = document.createElement('canvas')!;
    this.canvas.width = dimensions.width;
    this.canvas.height = dimensions.height;
    this.canvas.id = id;
    this.context = this.canvas.getContext('2d', { willReadFrequently: true })!;
    this.context.imageSmoothingEnabled = false;
    this.pixelGraphics = pixelGraphics ?? false;
  }

  attach = (root: HTMLElement): void => {
    root.appendChild(this.canvas);
  };

  getDimensions = (): Dimensions => ({
    width: this.canvas.width,
    height: this.canvas.height
  });

  fillCircle = (centerCoordinates: Coordinates, radius: number, color: string): void => {
    const { context } = this;
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = 1;

    if (this.pixelGraphics) {
      for (
        let y = Math.floor(centerCoordinates.y - radius);
        y <= Math.ceil(centerCoordinates.y + radius);
        y++
      ) {
        const width = Math.floor(
          Math.sqrt(radius ** 2 - (y - centerCoordinates.y) ** 2) * 2
        );
        const left = Math.round(centerCoordinates.x - width / 2);
        context.fillRect(left, y, width, 1);
      }
      return;
    }
    context.beginPath();
    context.ellipse(
      centerCoordinates.x,
      centerCoordinates.y,
      radius,
      radius,
      0,
      0,
      Math.PI * 2
    );
    context.stroke();
    context.fill();
    context.closePath();
  };

  fillOval = (rect: Rect, color: string) => {
    const { context } = this;
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = 1;
    context.beginPath();
    context.ellipse(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      rect.width / 2,
      rect.height / 2,
      0,
      0,
      Math.PI * 2
    );
    context.stroke();
    context.fill();
    context.closePath();
  };

  drawRect = (rect: Rect, color: string): void => {
    const { context } = this;
    // ugh
    context.fillStyle = color;
    context.lineWidth = 1;
    const { left, top, width, height } = rect;
    const right = left + width;
    const bottom = top + height;
    context.fillRect(left, top, width, 1); // top
    context.fillRect(right - 1, top, 1, height); // right
    context.fillRect(left, bottom - 1, width, 1); // bottom
    context.fillRect(left, top, 1, height); // left
  };

  fillPolygon = (points: Coordinates[], color: string): void => {
    const { context } = this;
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = 1;
    if (this.pixelGraphics) {
      // TODO rename and refactor
      const minY = Math.floor(Math.min(...points.map(v => v.y)));
      const maxY = Math.ceil(Math.max(...points.map(v => v.y)));

      for (let y = minY; y <= maxY; y++) {
        const intersections = [];

        for (let i = 0; i < points.length; i++) {
          const v1 = points[i];
          const v2 = points[(i + 1) % points.length];

          if ((v1.y <= y && v2.y > y) || (v2.y <= y && v1.y > y)) {
            const x = Math.round(v1.x + ((y - v1.y) / (v2.y - v1.y)) * (v2.x - v1.x));
            intersections.push(x);
          }
        }

        intersections.sort((a, b) => a - b);

        for (let i = 0; i < intersections.length; i += 2) {
          const startX = intersections[i];
          const endX = intersections[i + 1];
          for (let x = startX; x < endX; x++) {
            context.fillRect(x, y, 1, 1);
          }
        }
      }
      return;
    }
    context.beginPath();
    for (const point of points) {
      context.lineTo(point.x, point.y);
    }
    // close the path
    context.lineTo(points[0].x, points[0].y);
    context.stroke();
    context.fill();
    context.closePath();
  };

  fillRect = (rect: Rect, color: string) => {
    const { context } = this;
    context.fillStyle = color;
    context.fillRect(rect.left, rect.top, rect.width, rect.height);
  };

  fill = (color: string) => {
    const { width, height } = this.canvas;
    const rect = Rect.fromDimensions({ width, height });
    this.fillRect(rect, color);
  };

  drawImage = (image: ImageBitmap | HTMLCanvasElement, params?: DrawImageParams) => {
    const { context } = this;
    check(!(params?.topLeft && params?.rect));
    const topLeft: Coordinates = (() => {
      if (params?.topLeft) {
        return params.topLeft;
      } else if (params?.rect) {
        return getTopLeft(params.rect);
      } else {
        return { x: 0, y: 0 };
      }
    })();
    if (params?.rotation) {
      // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate#examples
      context.save();
      context.translate(topLeft.x + image.width / 2, topLeft.y + image.height / 2);
      context.rotate(params.rotation.radians);
      context.drawImage(image, -image.width / 2, -image.height / 2);
      context.restore();
    } else {
      context.drawImage(image, topLeft.x, topLeft.y);
    }
  };

  putImageData = (imageData: ImageData) => {
    this.context.putImageData(imageData, 0, 0);
  };

  drawText = (text: string, font: string, color: string, topLeft: Coordinates): void => {
    const { context } = this;
    context.fillStyle = color;
    context.font = font;
    context.fillText(text, topLeft.x, topLeft.y);
  };

  clear = (): void => {
    const { canvas, context } = this;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  drawOnto = (other: Graphics, params?: DrawOntoParams) => {
    const sourceRect = params?.sourceRect ?? Rect.fromDimensions(this.getDimensions());
    const destRect = params?.destRect ?? Rect.fromDimensions(other.getDimensions());
    // We don't have a runtime assertion that you're using the same Graphics impl across the board
    // but hopefully you are not a total psycho
    (other as CanvasGraphicsImpl).context.drawImage(
      this.canvas,
      sourceRect.left,
      sourceRect.top,
      sourceRect.width,
      sourceRect.height,
      destRect.left,
      destRect.top,
      destRect.width,
      destRect.height
    );
  };
}
