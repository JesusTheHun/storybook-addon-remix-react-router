import { vi } from 'vitest';

type Vi = typeof vi;

export class LocalStorage {
  store!: Record<string, string>;

  constructor(vi: Vi ) {
    Object.defineProperty(this, 'store', {
      enumerable: false,
      writable: true,
      value: {},
    });
    Object.defineProperty(this, 'getItem', {
      enumerable: false,
      value: vi.fn((key: string) => (this.store[key] !== undefined ? this.store[key] : null)),
    });
    Object.defineProperty(this, 'setItem', {
      enumerable: false,
      // not mentioned in the spec, but we must always coerce to a string
      value: vi.fn((key: string, val = '') => {
        this.store[key] = val + '';
      }),
    });
    Object.defineProperty(this, 'removeItem', {
      enumerable: false,
      value: vi.fn((key: string) => {
        delete this.store[key];
      }),
    });
    Object.defineProperty(this, 'clear', {
      enumerable: false,
      value: vi.fn(() => {
        Object.keys(this.store).map((key: string) => delete this.store[key]);
      }),
    });
    Object.defineProperty(this, 'toString', {
      enumerable: false,
      value: vi.fn(() => {
        return '[object Storage]';
      }),
    });
    Object.defineProperty(this, 'key', {
      enumerable: false,
      value: vi.fn((idx) => Object.keys(this.store)[idx] || null),
    });
  } // end constructor

  get length() {
    return Object.keys(this.store).length;
  }
  // for backwards compatibility
  get __STORE__() {
    return this.store;
  }
}

export function mockLocalStorage(): void {
  if (!(window.localStorage instanceof LocalStorage)) {
    vi.stubGlobal("localStorage", new LocalStorage(vi));
    vi.stubGlobal("sessionStorage", new LocalStorage(vi));
  }
}
