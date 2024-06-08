import { describe, it, expect } from '@jest/globals';
import { PropertyNotFoundError } from './property-not-found.error';

describe('PropertyNotFoundError', () => {
  it('should set the correct message', () => {
    const error = new PropertyNotFoundError('test', 'object', {});
    expect(error.message).toEqual('Property test not found in object => {}');
  });

  it('should set the correct object reference', () => {
    const obj = { test: 1 };
    const error = new PropertyNotFoundError('test', 'object', obj);
    expect(error.objectReference).toBe(obj);
  });

  it('should set the prototype correctly', () => {
    const error = new PropertyNotFoundError('test', 'object', {});
    expect(Object.getPrototypeOf(error)).toBe(PropertyNotFoundError.prototype);
  });
});
