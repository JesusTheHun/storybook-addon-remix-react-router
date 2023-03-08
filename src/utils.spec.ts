import {describe, expect, it} from 'vitest'
import {getFormDataSummary} from "./utils";
import {FormData} from "@remix-run/web-fetch";

describe('utils', () => {
  describe('getFormDataSummary', () => {
    it('should return a record with an entry for each form data string value', () => {
      const formData = new FormData();
      formData.append('foo', 'bar');
      formData.append('fuu', 'baz');

      const summary = getFormDataSummary(formData);

      expect(summary).toEqual({
        'foo': 'bar',
        'fuu': 'baz',
      });
    });

    it('should return an object describing the file', () => {
      const formData = new FormData();
      formData.append('myFile', new File(["somecontent"], "myFile.txt", { type: "text/plain" }));

      const summary = getFormDataSummary(formData);

      expect(summary).toEqual({
        'myFile': {
          filename: 'myFile.txt',
          filetype: 'text/plain',
          filesize: 11,
        }
      });
    });
  })
});