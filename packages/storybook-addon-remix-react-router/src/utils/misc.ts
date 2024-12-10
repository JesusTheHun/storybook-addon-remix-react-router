import { AssertKey, ToArray } from './type-utils';

export type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
};

export function defer<T = void>(): Deferred<T> {
  const deferred: Partial<Deferred<T>> = {};

  deferred.promise = new Promise<T>((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred as Deferred<T>;
}

export function hasOwnProperty<T extends object, K extends PropertyKey>(obj: T, prop: K): obj is AssertKey<T, K> {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function invariant(value: boolean, message?: string): asserts value;
export function invariant<T>(value: T | null | undefined, message?: string): asserts value is T;
export function invariant(value: any, message?: string) {
  if (value === false || value === null || typeof value === 'undefined') {
    console.warn('Test invariant failed:', message);
    throw new Error(message);
  }
}

export function castArray(): [];
export function castArray<T>(value: T): ToArray<T>;
export function castArray<T>(value?: T) {
  if (arguments.length === 0) {
    return [];
  }

  return (Array.isArray(value) ? value : [value]) as ToArray<T>;
}
