export class PropertyNotFoundError<T = unknown> extends Error {
  public constructor(propertyName: string, objectName:string, public objectReference: T) {
    const objStr = JSON.stringify(objectReference, null, 2);
    super(`Property ${propertyName} not found in ${objectName} => ${objStr}`);
    Object.setPrototypeOf(this, PropertyNotFoundError.prototype);
  }
}
