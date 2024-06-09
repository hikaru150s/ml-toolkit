import { DistanceAbstract } from './distance.abstract';

export class JeffreysDivergenceDistance<T extends number[]> extends DistanceAbstract<T> {

  distance(x: T, y: T): number {
    if (x.length !== y.length) {
      throw new Error('Vectors must have the same length');
    }
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
      if (x[i] === 0 || y[i] === 0) {
        continue;
      }
      sum += x[i] * Math.log(x[i] / y[i]);
    }
    return sum;
  }
}
