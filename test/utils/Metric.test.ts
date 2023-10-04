import { test, describe, expect } from 'vitest';
import { Metric, MetricType } from '../../src/utils/Metric';

describe('Metric', () => {
  test('average', () => {
    const metric = Metric.create(MetricType.RENDER_TIME);
    metric.recordValue(1000);
    metric.recordValue(2000);
    expect(metric.getAverage()).toBe(1500);
  });
});
