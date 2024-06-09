import { DistanceAbstract } from './distance.abstract';

export class DynamicTimeWarpingDistance<T extends number[]> extends DistanceAbstract<T> {

  public distance(x: T, y: T): number {
    const n = x.length;
    const m = y.length;

    const dtwMatrix = Array(n + 1).fill(0).map(() => Array(m + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      dtwMatrix[i][0] = Infinity;
    }

    for (let j = 1; j <= m; j++) {
      dtwMatrix[0][j] = Infinity;
    }

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        const cost = Math.abs(x[i - 1] - y[j - 1]);
        dtwMatrix[i][j] = cost + Math.min(
          dtwMatrix[i - 1][j],
          dtwMatrix[i][j - 1],
          dtwMatrix[i - 1][j - 1],
        );
      }
    }

    return dtwMatrix[n][m];
  }
}
