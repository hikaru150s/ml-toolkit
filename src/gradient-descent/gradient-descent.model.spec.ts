import { describe, it, expect } from '@jest/globals';
import { GradientDescentModel } from './gradient-descent.model';

describe('GradientDescentModel', () => {
  const trainableProperties = ["x1", "x2", "x3"];
  const target = "y";
  const learningRate = 0.01;
  const initialBias = 0.5;
  const initialWeights = new Map([
    ["x1", 0.1],
    ["x2", 0.2],
    ["x3", 0.3],
  ]);

  const dataset = [
    { x1: 1, x2: 2, x3: 3, y: 5 },
    { x1: 4, x2: 5, x3: 6, y: 9 },
    { x1: 7, x2: 8, x3: 9, y: 13 },
  ];

  const model = new GradientDescentModel({
    learningRate,
    target,
    trainableProperties,
    initialBias,
    initialWeights,
  });

  it('should predict the correct result', () => {
    const data = { x1: 2, x2: 3, x3: 4 };
    const predictedResult = model.predict(data);
    const expectedResult = 1.5;
    expect(predictedResult).toBeCloseTo(expectedResult);
  });

  it('should train the model correctly', () => {
    const result = model.train(dataset, 10, 0.0001);
    expect(result.epoch).toBeGreaterThan(0);
    expect(result.error).toBeLessThan(0.0001);
  });

  it('should test the model correctly', () => {
    const result = model.test(dataset);
    expect(result).toBeLessThan(0.0001);
  });
});
