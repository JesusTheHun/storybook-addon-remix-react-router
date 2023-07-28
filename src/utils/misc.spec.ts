import { expectTypeOf } from 'expect-type';
import { describe, expect, it } from 'vitest';
import { castArray } from './misc';

describe('Utils - Misc', () => {
  describe('castArray', () => {
    it('should cast a non-array `undefined` to an array containing a single value, `undefined`', () => {
      expect(castArray(undefined)).toEqual([undefined]);
    });

    it('should return an empty array if called with no argument', () => {
      expect(castArray()).toEqual([]);
    });

    it('should cast a non-array value to an array containing only the value', () => {
      expect(castArray('a')).toEqual(['a']);
    });

    it('should return the same object ref is the value is already an array', () => {
      const arr = ['a', 'b'];
      expect(castArray(arr)).toBe(arr);
    });

    it('should preserve the type of a non-array value', () => {
      expectTypeOf(castArray('a')).toEqualTypeOf<[string]>();
      expectTypeOf(castArray('a' as const)).toEqualTypeOf<['a']>();
    });

    it('should preserve the type of the element of an array value', () => {
      expectTypeOf(castArray(['a', 'b'])).toEqualTypeOf<string[]>();
      expectTypeOf(castArray([777, 'a', 'b'])).toEqualTypeOf<Array<number | string>>();
      expectTypeOf(castArray(['a', 'b'] as const)).toEqualTypeOf<readonly ['a', 'b']>();
    });
  });
});
