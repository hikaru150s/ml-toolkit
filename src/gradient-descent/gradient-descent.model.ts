import { PropertyNotFoundError } from "./errors";

interface IGradientDescentModelOptions<
  TData extends Record<string, number>,
  TTarget extends keyof TData,
  TTrainable extends Exclude<keyof TData, TTarget>
> {
  learningRate: number;
  target: TTarget;
  trainableProperties: Array<TTrainable>;
  initialWeights?: number | Map<TTrainable, number>;
  initialBias?: number;
}

type TrainResult = {
  epoch: number;
  error: number
}

export class GradientDescentModel<
  TData extends Record<string, number>,
  TTarget extends keyof TData,
  TTrainable extends Exclude<keyof TData, TTarget>
> {
  private learningRate: number;
  private trainableProperties: Array<TTrainable>;
  private target: TTarget;
  private weights: Map<TTrainable, number>;
  private bias: number;

  public constructor(options: IGradientDescentModelOptions<TData, TTarget, TTrainable>) {
    const { learningRate, trainableProperties, target, initialWeights, initialBias } = options;
    this.learningRate = learningRate;
    this.trainableProperties = trainableProperties;
    this.target = target;
    this.bias = initialBias ?? Math.random();
    if (initialWeights instanceof Map) {
      const initSafe = new Map(initialWeights);
      const invalid = this.trainableProperties.find(k => !initSafe.has(k));
      if (invalid) {
        throw new PropertyNotFoundError(invalid.toString(), "initialWeights", initSafe);
      }
      this.weights = initSafe;
    } else {
      this.weights = new Map(this.trainableProperties
        .map(k => [k, typeof initialWeights === 'number' ? initialWeights : Math.random()]));
    }
  }

  public predict(data: Record<TTrainable, number>): number {
    return this.trainableProperties.reduce((prev, curr) => {
      const w = this.weights.get(curr)!;
      const v = data[curr];
      return prev + (w * v);
    }, this.bias);
  }

  public train(dataset: TData[], maxEpoch: number, minError: number): TrainResult {
    let currentEpoch = 0;
    let lastError = Number.POSITIVE_INFINITY;
    while (currentEpoch < maxEpoch && lastError > minError) {
      let errorSum = 0;
      for (const data of dataset) {
        const withoutTarget = Object.fromEntries(Object.entries(data)
          .filter(s => s[0] !== this.target)) as Record<TTrainable, number>;
        const predictedResult = this.predict(withoutTarget);
        const actualResult = data[this.target];
        const error = actualResult - predictedResult;
        errorSum += error ** 2;
      }
      const mse = errorSum / dataset.length;
      for (const key of this.trainableProperties) {
        const w = this.weights.get(key)!;
        const v = dataset.reduce((prev, curr) => {
          const withoutTarget = Object.fromEntries(Object.entries(curr)
            .filter(s => s[0] !== this.target)) as Record<TTrainable, number>;
          return prev + (withoutTarget[key] * errorSum);
        }, 0);
        this.weights.set(key, w - (this.learningRate * v));
      }
      const v = dataset.reduce((prev, curr) => {
        return prev + (curr[this.target] * errorSum);
      }, 0);
      this.bias = this.bias - (this.learningRate * v);
      lastError = mse;
      currentEpoch++;
    }
    return { epoch: currentEpoch, error: lastError };
  }

  public test(dataset: TData[]) {
    let errorSum = 0;
    for (const data of dataset) {
      const withoutTarget = Object.fromEntries(Object.entries(data)
        .filter(s => s[0] !== this.target)) as Record<TTrainable, number>;
      const predictedResult = this.predict(withoutTarget);
      const actualResult = data[this.target];
      const error = actualResult - predictedResult;
      errorSum += error ** 2;
    }
    const mse = errorSum / dataset.length;
    return mse;
  }
}
