import { DistanceAbstract } from './distance.abstract';

type CompareType = 'numeric' | 'categorical';
type WeightedCompareType = {
  weight: number;
  compareType: CompareType;
};
type GowersDistanceOptions
<T extends Record<string, unknown | null | undefined>> = {
  compareTypes: Map<keyof T, WeightedCompareType>;
};

export class GowersDistance<T extends Record<string, unknown | null | undefined>>
  extends DistanceAbstract<T>
{
  private getCompareType(key: keyof T): WeightedCompareType | undefined {
    return this.options.compareTypes.get(key);
  }

  private hasCompareType(key: keyof T): boolean {
    return this.options.compareTypes.has(key);
  }

  private numericCompare(x: number, y: number): number {
    return Math.abs(x - y) / (x + y);
  }

  private categoricalCompare(x: unknown | null | undefined, y: unknown | null | undefined) {
    return x === y ? 1 : 0;
  }

  public constructor(private options: GowersDistanceOptions<T>) {
    super();
  }

  public distance(x: T, y: T): number {
    const combinedKeys = new Set([...Object.keys(x), ...Object.keys(y)]);
    const invalidKeys = Array.from(combinedKeys).find(v => !this.hasCompareType(v));
    if (invalidKeys) {
      throw new Error(`Key ${invalidKeys} does not having compare type`);
    }
    let sum = 0;
    let weightSum = 0;
    for (const key of combinedKeys) {
      const tX = typeof x[key];
      const tY = typeof y[key];
      if (tX !== tY) {
        throw new Error(`Key ${key} has different types ${tX} and ${tY}`);
      }
      const { compareType, weight } = this.getCompareType(key)!;
      switch (compareType) {
        case 'numeric': {
          const d = this.numericCompare(x[key] as number, y[key] as number);
          sum += d * weight;
          weightSum += weight;
          break;
        }
        case 'categorical': {
          const d = this.categoricalCompare(x[key], y[key]);
          sum += d * weight;
          weightSum += weight;
          break;
        }
        default: {
          throw new Error(`Unknown compare type ${compareType}`);
        }
      }
    }
    return sum / weightSum;
  }
}
