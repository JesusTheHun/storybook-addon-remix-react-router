import { describe, expect, it } from 'vitest';
import { getFormDataSummary, searchParamsToRecord } from './internals';
import { FormData } from '@remix-run/web-fetch';

describe('Utils - Internals', () => {
  describe('getFormDataSummary', () => {
    it('should return a record with an entry for each form data string value', () => {
      const formData = new FormData();
      formData.append('foo', 'bar');
      formData.append('fuu', 'baz');

      const summary = getFormDataSummary(formData);

      expect(summary).toEqual({
        foo: 'bar',
        fuu: 'baz',
      });
    });

    it('should return an object describing the file', () => {
      const formData = new FormData();
      formData.append('myFile', new File(['somecontent'], 'myFile.txt', { type: 'text/plain' }));

      const summary = getFormDataSummary(formData);

      expect(summary).toEqual({
        myFile: {
          filename: 'myFile.txt',
          filetype: 'text/plain',
          filesize: 11,
        },
      });
    });
  });

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
});
