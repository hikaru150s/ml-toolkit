import { DistanceAbstract } from './distance.abstract';

export class CanberraDistance extends DistanceAbstract<number> {

  distance(x: number, y: number): number {
    return Math.abs(x - y) / (Math.abs(x) + Math.abs(y));
  }
}
