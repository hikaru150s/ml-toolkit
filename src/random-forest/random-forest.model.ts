import { DecisionTreeModel, DataPoint, ValueLike } from '../decision-tree';

export class RandomForestModel<
  T extends DataPoint,
  TTarget extends keyof DataPoint,
  TAttribute extends Exclude<keyof DataPoint, TTarget>
> {
  private trees: DecisionTreeModel<T, TTarget, TAttribute>[];

  private majorityLabel(labels: Array<T[TTarget] | null>) {
    return labels.reduce((p, c, i, a) => (a
      .filter(v => v === p).length >= a
      .filter(v => v === c).length
        ? p
        : c))
  }

  public constructor(
    private dataset: T[],
    private target: TTarget,
    private attributes: TAttribute[],
    private numTrees: number,
  ) {
    this.trees = [];
  }

  public buildForest(): void {
    for (let i = 0; i < this.numTrees; i++) {
      const tree = new DecisionTreeModel(this.dataset, this.target, this.attributes);
      tree.buildTree();
      this.trees.push(tree);
    }
  }

  public predict(data: Omit<T, TTarget>): T[TTarget] | null {
    const predictions = this.trees.map(tree => tree.predict(data));
    return this.majorityLabel(predictions);
  }

  public testForest(testDataset: T[]): number {
    let correctCount = 0;
    for (const data of testDataset) {
      const predictedLabel = this.predict(data);
      if (predictedLabel === data[this.target]) {
        correctCount++;
      }
    }
    return correctCount / testDataset.length;
  }
}
