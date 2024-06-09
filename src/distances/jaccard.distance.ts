import { DistanceAbstract } from './distance.abstract';

export class JaccardDistance<T extends Record<string, unknown | null | undefined>>
extends DistanceAbstract<T> {
  public distance(x: T, y: T): number {
    const combinedKeys = new Set([...Object.keys(x), ...Object.keys(y)]);
    let intersectionCount = 0;
    let unionCount = Object.keys(x).length + Object.keys(y).length;
    for (const key of combinedKeys) {
      if (x[key] === y[key]) {
        intersectionCount++;
        unionCount--;
      }
    }
    return (1 - intersectionCount) / unionCount;
  }
}
