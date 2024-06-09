import { DistanceAbstract } from './distance.abstract';

export class BhattacharryDistance<T extends number[]> extends DistanceAbstract<T> {

  distance(x: T, y: T): number {
    if (x.length !== y.length) {
      throw new Error('Vectors must have the same length');
    }
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
      sum += Math.sqrt(x[i] * y[i]);
    }
    return -Math.log(sum);
  }
}
