import { DistanceAbstract } from './distance.abstract';

export class HammingDistance<T extends Record<string, unknown | null | undefined>>
extends DistanceAbstract<T> {
  public distance(x: T, y: T): number {
    const combinedKeys = new Set([...Object.keys(x), ...Object.keys(y)]);
    let count = 0;
    for (const key of combinedKeys) {
      if (x[key] !== y[key]) {
        count++;
      }
    }
    return count;
  }
}
