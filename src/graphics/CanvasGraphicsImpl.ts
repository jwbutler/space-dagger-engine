import { DrawImageParams, DrawOntoParams, Graphics, GraphicsProps } from './Graphics.ts';
import { Coordinates } from '../geometry/Coordinates.ts';
import { Rect } from '../geometry/Rect.ts';
import { Dimensions } from '../geometry/Dimensions.ts';
import { check } from '../utils/preconditions.ts';
import getTopLeft = Rect.getTopLeft;

export class CanvasGraphicsImpl implements Graphics {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

  constructor({ id, dimensions }: GraphicsProps) {
    this.canvas = document.createElement('canvas')!;
    this.canvas.width = dimensions.width;
    this.canvas.height = dimensions.height;
    this.canvas.id = id;
    this.context = this.canvas.getContext('2d', { willReadFrequently: true })!;
    this.context.imageSmoothingEnabled = false;
  }

  attach = (root: HTMLElement): void => {
    root.appendChild(this.canvas);
  };

  getDimensions = (): Dimensions => ({
    width: this.canvas.width,
    height: this.canvas.height
  });

  drawCircle = (centerCoordinates: Coordinates, radius: number, color: string): void => {
    const { context } = this;
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = 1;
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

  drawPolygon = (points: Coordinates[], color: string): void => {
    const { context } = this;
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = 1;
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
