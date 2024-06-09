import { DistanceAbstract } from './distance.abstract';

export class CosineDistance extends DistanceAbstract<number[]> {
  private similarity(x: number[], y: number[]): number {
    const dotProduct = x.reduce((acc, val, i) => acc + val * y[i], 0);
    const normX = Math.sqrt(x.reduce((acc, val) => acc + val ** 2, 0));
    const normY = Math.sqrt(y.reduce((acc, val) => acc + val ** 2, 0));
    return dotProduct / (normX * normY);
  }

  public distance(x: number[], y: number[]): number {
    return 1 - this.similarity(x, y);
  }
}
