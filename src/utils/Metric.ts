import { check } from './preconditions.ts';

export interface Metric {
  recordValue: (value: number) => void;
  getAverage: () => number;
}

export enum MetricType {
  /**
   * Total rendering time in milliseconds
   */
  RENDER_TIME = 'RENDER_TIME'
}

class RenderTimeMetric implements Metric {
  private totalRenderTime: number = 0;
  private numPoints: number = 0;

  recordValue = (value: number): void => {
    this.totalRenderTime += value;
    this.numPoints++;
  };
  getAverage = (): number => {
    check(this.numPoints > 0);
    return this.totalRenderTime / this.numPoints;
  };
}

export namespace Metric {
  export const create = (metric: MetricType): Metric => {
    switch (metric) {
      case MetricType.RENDER_TIME:
        return new RenderTimeMetric();
    }
  };
}
