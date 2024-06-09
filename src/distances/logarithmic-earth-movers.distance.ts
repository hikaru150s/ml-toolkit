import { EarthMoversDistance } from './earth-movers.distance';

export class LogarithmicEarthMoversDistance<T extends number[]> extends EarthMoversDistance<T> {

  public distance(x: T, y: T): number {
    const numX = x.length;
    const numY = y.length;
    const costMatrix = new Array(numX).fill(0).map(() => new Array(numY).fill(0));

    for (let i = 0; i < numX; i++) {
      for (let j = 0; j < numY; j++) {
        costMatrix[i][j] = Math.abs(Math.log(x[i] + 1) - Math.log(y[j] + 1));
      }
    }

    const assignment = this.linearSumAssignment(costMatrix, x, y);

    let totalCost = 0;
    for (let i = 0; i < numX; i++) {
      for (let j = 0; j < numY; j++) {
        totalCost += assignment[i][j];
      }
    }

    return totalCost;
  }
}
