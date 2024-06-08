export class UninitializedTreeError extends Error {
  constructor() {
    super('The decision tree has not been built yet');
    Object.setPrototypeOf(this, UninitializedTreeError.prototype);
  }
}
