import { DistanceAbstract } from './distance.abstract';

export class JensenShannonDivergenceDistance<T extends number[]> extends DistanceAbstract<T> {

  public distance(x: T, y: T): number {
    if (x.length !== y.length) {
      throw new Error('Vectors must have the same length');
    }
    const avgDistribution = x.map((v, i) => (v + y[i]) / 2);
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
      if (x[i] === 0 || y[i] === 0) {
        continue;
      }
      sum += 0.5 * (
        x[i] * Math.log(x[i] / avgDistribution[i])
        + y[i] * Math.log(y[i] / avgDistribution[i])
      );
    }
    return sum;
  }
}
