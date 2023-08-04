import { describe, expect, it } from 'vitest';
import { searchParamsToRecord } from './searchParamsToRecord';

describe('searchParamsToRecord', () => {
  it('should have a property for each search param', () => {
    const searchParams = new URLSearchParams({
      foo: 'bar',
      yaz: 'yoz',
    });

    expect(searchParamsToRecord(searchParams)).toEqual({
      foo: 'bar',
      yaz: 'yoz',
    });
  });

  it('should merge values of the same param into an array', () => {
    const searchParamsTwoValues = new URLSearchParams({
      foo: 'bar',
      yaz: 'yoz',
    });
    searchParamsTwoValues.append('foo', 'baz');

    expect(searchParamsToRecord(searchParamsTwoValues)).toEqual({
      foo: ['bar', 'baz'],
      yaz: 'yoz',
    });

    const searchParamsThreeValues = new URLSearchParams({
      foo: 'bar',
      yaz: 'yoz',
    });
    searchParamsThreeValues.append('foo', 'baz');
    searchParamsThreeValues.append('foo', 'buz');

    expect(searchParamsToRecord(searchParamsThreeValues)).toEqual({
      foo: ['bar', 'baz', 'buz'],
      yaz: 'yoz',
    });
  });
});
