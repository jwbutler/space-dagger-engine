import { DrawOntoParams, Graphics, GraphicsProps } from './Graphics';
import { ImageType } from './images/ImageType';
import { Coordinates } from '../geometry/Coordinates';
import { Rect } from '../geometry/Rect';
import { Dimensions } from '../geometry/Dimensions';
import { Angle } from '../geometry';

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

  translate = (topLeft: Coordinates): void => {
    this.clear();
    this.context.resetTransform();
    this.clear();
    this.context.translate(-topLeft.x, -topLeft.y);
    this.clear();
  };

  fillCircle = (centerCoordinates: Coordinates, radius: number, color: string): void => {
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
    context.strokeStyle = color;
    context.lineWidth = 1;
    context.strokeRect(rect.left, rect.top, rect.width, rect.height);
  };

  fillPolygon = (points: Coordinates[], color: string): void => {
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

  fillRect = (rect: Rect, color: string): void => {
    const { context } = this;
    context.fillStyle = color;
    context.fillRect(rect.left, rect.top, rect.width, rect.height);
  };

  fill = (color: string): void => {
    const { width, height } = this.canvas;
    const rect = Rect.fromDimensions({ width, height });
    this.fillRect(rect, color);
  };

  drawImage = (image: ImageType, topLeft: Coordinates): void => {
    const { context } = this;
    context.drawImage(image, topLeft.x, topLeft.y);
  };

  drawScaledImage = (image: ImageType, rect: Rect): void => {
    const { context } = this;
    context.drawImage(image, rect.left, rect.top, rect.width, rect.height);
  };

  drawRotatedImage = (
    image: ImageType,
    centerCoordinates: Coordinates,
    angle: Angle,
    origin: Coordinates
  ): void => {
    const { context } = this;
    context.save();
    context.translate(centerCoordinates.x, centerCoordinates.y);
    context.rotate(angle.radians);
    context.drawImage(image, -origin.x, -origin.y, image.width, image.height);
    context.restore();
  };

  putImageData = (imageData: ImageData) => {
    this.context.putImageData(imageData, 0, 0);
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
    context.closePath();
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
