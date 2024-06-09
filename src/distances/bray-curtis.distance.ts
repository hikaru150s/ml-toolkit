import { DistanceAbstract } from './distance.abstract';

export class BrayCurtisDistance<T extends number[]> extends DistanceAbstract<T> {

  public distance(x: T, y: T): number {
    if (x.length !== y.length) {
      throw new Error('Vectors must have the same length');
    }
    let sumOfDifferences = 0;
    let sumOfSums = 0;

    for (let i = 0; i < x.length; i++) {
      sumOfDifferences += Math.abs(x[i] - y[i]);
      sumOfSums += Math.abs(x[i] + y[i]);
    }

    return sumOfDifferences / sumOfSums;
  }
}
