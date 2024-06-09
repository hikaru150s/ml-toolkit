import { DistanceAbstract } from './distance.abstract';

export class EarthMoversDistance<T extends number[]> extends DistanceAbstract<T> {
  protected linearSumAssignment(costMatrix: number[][], left: number[], right: number[]) {
    const numLeft = left.length;
    const numRight = right.length;
    const assignment = new Array(numLeft).fill(0).map(() => new Array(numRight).fill(0));
    const check = new Array(numLeft).fill(0).map(() => new Array(numRight).fill(false));

    let totalCost = 0;
    let i = 0;
    let j = 0;

    while (i < numLeft && j < numRight) {
      let minCost = Infinity;
      let minI = -1;
      let minJ = -1;

      for (let k = 0; k < numLeft; k++) {
        if (check[k]) {
          continue;
        }
        for (let l = 0; l < numRight; l++) {
          if (check[k][l]) {
            continue;
          }
          if (costMatrix[k][l] < minCost) {
            minCost = costMatrix[k][l];
            minI = k;
            minJ = l;
          }
        }
      }

      assignment[minI][minJ] = minCost;
      totalCost += minCost;
      check[minI][minJ] = true;

      if (left[minI] <= right[minJ]) {
        i = minI + 1;
      }
      if (right[minJ] <= left[minI]) {
        j = minJ + 1;
      }
    }

    return assignment;
  }

  public distance(x: T, y: T): number {
    const numX = x.length;
    const numY = y.length;
    const costMatrix = new Array(numX).fill(0).map(() => new Array(numY).fill(0));

    for (let i = 0; i < numX; i++) {
      for (let j = 0; j < numY; j++) {
        costMatrix[i][j] = Math.abs(x[i] - y[j]);
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
