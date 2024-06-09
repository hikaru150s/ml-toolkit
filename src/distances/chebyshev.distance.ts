import { DistanceAbstract } from './distance.abstract';

export class ChebyshevDistance<T extends Record<string, number>> extends DistanceAbstract<T> {

  public distance(x: T, y: T): number {
    const combinedKeys = new Set([...Object.keys(x), ...Object.keys(y)]);
    let maxDistance = 0;
    for (const key of combinedKeys) {
      const diff = Math.abs(x[key] - y[key]);
      if (diff > maxDistance) {
        maxDistance = diff;
      }
    }
    return maxDistance;
  }
}
