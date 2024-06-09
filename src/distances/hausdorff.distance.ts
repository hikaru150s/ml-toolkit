import { DistanceAbstract } from './distance.abstract';
import { EuclideanDistance } from './euclidean.distance';

export class HausdorffDistance<T extends number[][]> extends DistanceAbstract<T> {
  private euclideanDistance(x: number[], y: number[]): number {
    const euclideanDistance = new EuclideanDistance();
    const a = Object.fromEntries(x.map((v, i) => [i, v]));
    const b = Object.fromEntries(y.map((v, i) => [i, v]));
    return euclideanDistance.distance(a, b);
  }

  public distance(x: T, y: T): number {
    let maxDistance = [0, 0];
    for (const point1 of x) {
      let minDistance = Number.POSITIVE_INFINITY;
      for (const point2 of y) {
        const distance = this.euclideanDistance(point1, point2);
        minDistance = Math.min(minDistance, distance);
      }
      maxDistance[0] = Math.max(maxDistance[0], minDistance);
    }
    for (const point2 of y) {
      let minDistance = Number.POSITIVE_INFINITY;
      for (const point1 of x) {
        const distance = this.euclideanDistance(point1, point2);
        minDistance = Math.min(minDistance, distance);
      }
      maxDistance[1] = Math.max(maxDistance[1], minDistance);
    }
    return Math.max(...maxDistance);
  }
}
