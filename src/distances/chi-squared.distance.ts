import { DistanceAbstract } from './distance.abstract';

export class ChiSquaredDistance<T extends number[]> extends DistanceAbstract<T> {

  public distance(x: T, y: T): number {
    if (x.length !== y.length) {
      throw new Error('Vectors must have the same length');
    }
    let sum = 0;

    for (let i = 0; i < x.length; i++) {
      sum += Math.pow(x[i] - y[i], 2) / (x[i] + y[i]);
    }
    return 0.5 * sum;
  }
}
