import { DrawImageParams, Graphics } from './Graphics.ts';
import { Coordinates } from '../geometry/Coordinates.ts';
import { Rect } from '../geometry/Rect.ts';
import { Dimensions } from '../geometry/Dimensions.ts';

export class CanvasGraphicsImpl implements Graphics {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

  constructor({ width, height }: Dimensions) {
    this.canvas = document.createElement('canvas')!;
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext('2d')!;
  }

  attach = (root: HTMLElement): void => {
    root.appendChild(this.canvas);
  };

  drawCircle = (centerCoordinates: Coordinates, radius: number, color: string): void => {
    const { context } = this;
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = 1;
    context.beginPath();
    context.ellipse(centerCoordinates.x, centerCoordinates.y, radius, radius, 0, 0, Math.PI * 2);
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
    context.moveTo(points[0].x, points[0].y);
    for (const point of points) {
      context.lineTo(point.x, point.y);
    }
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

  drawImage = (image: ImageBitmap, topLeft: Coordinates, params?: DrawImageParams) => {
    const { context } = this;
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

  /** Non-override */
  renderOther = (other: Graphics, rect: Rect) => {
    const { canvas, context } = this;
    context.drawImage(
      (other as CanvasGraphicsImpl).canvas,
      Math.round(rect.left),
      Math.round(rect.top),
      Math.round(rect.width),
      Math.round(rect.height),
      0,
      0,
      canvas.width,
      canvas.height
    );
  };
}
