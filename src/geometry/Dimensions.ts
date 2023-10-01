export type Dimensions = Readonly<{
  width: number;
  height: number;
}>;

export namespace Dimensions {
  export const allBalls = (): Dimensions => ({ width: 0, height: 0 });
}
