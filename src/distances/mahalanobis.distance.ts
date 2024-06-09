import { DistanceAbstract } from './distance.abstract';

export class MahalanobisDistance<T extends number[]> extends DistanceAbstract<T> {

  public constructor(
    private covarianceMatrix: number[][],
  ) {
    super();
  }

  public distance(x: T, y: T): number {
    const diff = x.map((v, i) => v - y[i]);
    const distance = Math.sqrt(diff
      .reduce((acc, val, i) => acc + val * this.covarianceMatrix[i][i] * val, 0));
    return distance;
  }
}
