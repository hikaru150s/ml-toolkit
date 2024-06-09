import { DistanceAbstract } from './distance.abstract';

interface IMeasurement<T> {
  compareFunction: DistanceAbstract<T>;
  weight: number;
}
interface ICompositeDistanceOptions<T extends Record<string, unknown | null | undefined>> {
  measurements: Record<keyof T, IMeasurement<T[keyof T]>>;
}

export class CompositeDistance
  <T extends Record<string, unknown | null | undefined>>
  extends DistanceAbstract<T>
{
  public constructor(private options: ICompositeDistanceOptions<T>) {
    super();
  }

  public distance(x: T, y: T): number {
    return Object.entries(this.options.measurements)
      .map(([k, m]) => m.compareFunction.distance(x[k] as T[keyof T], y[k] as T[keyof T])
        * m.weight)
      .reduce((a, b) => a + b, 0);
  }
}
