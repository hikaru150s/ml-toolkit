import { DistanceAbstract } from './distance.abstract';

export class MinkowskiDistance<T extends Record<string, number>> extends DistanceAbstract<T> {
  public constructor(public p: number = 2) {
    super();
  }

  public distance(x: T, y: T): number {
    let sum = 0;
    const combinedKeys = new Set([...Object.keys(x), ...Object.keys(y)]);
    for (const key of combinedKeys) {
      const diff = x[key] - y[key];
      sum += diff ** this.p;
    }
    return sum ** (1 / this.p);
  }
}
