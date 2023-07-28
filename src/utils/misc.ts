import { If, IsUnion, ToArray } from './type-utils';

export type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
};

export function defer<T = void>(): Deferred<T> {
  const deferred: Partial<Deferred<T>> = {};

  deferred.promise = new Promise<T>((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred as Deferred<T>;
}

export function hasOwnProperty<T extends object, K extends PropertyKey>(
  obj: T,
  prop: K
): obj is If<IsUnion<T>, Extract<T, { [key in K]: unknown }>, T & Record<K, unknown>> {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function castArray(): [];
export function castArray<T>(value: T): ToArray<T>;
export function castArray<T>(value?: T) {
  if (arguments.length === 0) {
    return [];
  }

  return (Array.isArray(value) ? value : [value]) as ToArray<T>;
}
