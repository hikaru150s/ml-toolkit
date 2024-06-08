import { UninitializedTreeError } from "./errors";

type ValueLike = string | number | boolean | null | undefined
type DataPoint = Record<string, ValueLike>;

interface TreeNode {
  attribute?: ValueLike;
  threshold?: ValueLike;
  gain?: number;
  children?: Map<ValueLike, TreeNode>;
  label?: ValueLike;
}

interface SplitResult<T extends DataPoint> {
  subsets: Map<ValueLike, Array<T>>;
  threshold?: ValueLike;
}

export class DecisionTreeModel<
  T extends DataPoint,
  TTarget extends keyof DataPoint,
  TAttribute extends Exclude<keyof DataPoint, TTarget>
> {
  private tree: TreeNode | null;

  public get isBuilt() {
    return !!this.tree;
  }

  private getEntropy(dataset: T[], targetAttribute: TTarget): number {
    const frequency = new Map<ValueLike, number>();

    for (const data of dataset) {
      const value = data[targetAttribute];
      if (!frequency.has(value)) {
        frequency.set(value, 0);
      }
      frequency.set(value, frequency.get(value)! + 1);
    }

    let entropy = 0;
    for (const value of frequency.values()) {
      const p = value / dataset.length;
      entropy -= p * Math.log2(p);
    }
    return entropy;
  }

  private splitDataset(dataset: Array<T>, attribute: TAttribute): SplitResult<T> {
    const subsets = new Map<ValueLike, Array<T>>();

    for (const data of dataset) {
      const key = data[attribute];
      if (!subsets.has(key)) {
        subsets.set(key, []);
      }
      subsets.get(key)?.push(data)
    }

    return { subsets };
  }

  private calculateGain(dataset: Array<T>, attribute: TAttribute, targetAttribute: TTarget): number {
    const initialEntropy = this.getEntropy(dataset, targetAttribute);
    const { subsets } = this.splitDataset(dataset, attribute);
    let subsetEntropy = 0;
    for (const subset of subsets.values()) {
      const subsetProportion = subset.length / dataset.length;
      subsetEntropy += subsetProportion * this.getEntropy(subset, targetAttribute);
    }
    return initialEntropy - subsetEntropy;
  }

  private majorityLabel(labels: ValueLike[]): ValueLike {
    return labels.reduce((p, c, i, a) => (a
      .filter(v => v === p).length >= a
      .filter(v => v === c).length
        ? p
        : c))
  }

  private build(dataset: Array<T>, attributes: Array<TAttribute>, targetAttribute: TTarget): TreeNode {
    const labels = dataset.map(v => v[targetAttribute]);
    if (labels.every(v => v === labels[0])) {
      return { label: labels[0] };
    }
    if (attributes.length === 0) {
      const label = this.majorityLabel(labels);
      return { label };
    }

    const gains = attributes.map(attr => ({
      attribute: attr,
      gain: this.calculateGain(dataset, attr, targetAttribute),
    }));
    const bestAttribute = gains.reduce((p, c) => p.gain >= c.gain ? p : c).attribute;

    const { subsets } = this.splitDataset(dataset, bestAttribute);
    const remainingAttributes = attributes.filter(attr => attr !== bestAttribute);
    const children = new Map<ValueLike, TreeNode>();

    for (const [key, subset] of subsets.entries()) {
      children.set(key, this.build(subset, remainingAttributes, targetAttribute));
    }

    return {
      attribute: bestAttribute,
      children,
    };
  }

  private traverseTree(node: TreeNode, data: Omit<T, TTarget>): T[TTarget] | null {
    if (node.label !== undefined) {
      return node.label as unknown as T[TTarget];
    }

    const attribute = node.attribute!;
    const value = data[attribute as unknown as keyof Omit<T, TTarget>];
    if (!node.children || !node.children.has(value)) {
      return null;
    }

    return this.traverseTree(node.children.get(value)!, data);
  }

  public constructor(
    private dataset: T[],
    private target: TTarget,
    private attributes: TAttribute[],
  ) {
    this.tree = null;
  }

  public buildTree(): void {
    this.tree = this.build(this.dataset, this.attributes, this.target);
  }

  public printTree(): void {
    console.log(JSON.stringify(this.tree, null, 2));
  }

  public predict(data: Omit<T, TTarget>): T[TTarget] | null {
    if (!this.tree) {
      throw new UninitializedTreeError();
    }
    return this.traverseTree(this.tree, data);
  }
}
