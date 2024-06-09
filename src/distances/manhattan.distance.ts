import { DistanceAbstract } from './distance.abstract';

export class ManhattanDistance<T extends Record<string, number>> extends DistanceAbstract<T> {
  public distance(x: T, y: T): number {
    let sum = 0;
    const combinedKeys = new Set([...Object.keys(x), ...Object.keys(y)]);
    for (const key of combinedKeys) {
      const diff = x[key] - y[key];
      sum += Math.abs(diff);
    }
    return sum;
  }
}
