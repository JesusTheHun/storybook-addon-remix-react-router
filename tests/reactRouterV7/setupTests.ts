import { beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import { fetch, Request, Response } from '@remix-run/web-fetch';
import { mockLocalStorage } from './test-utils';

beforeEach(() => {
  mockLocalStorage();

  vi.stubGlobal('fetch', fetch);
  vi.stubGlobal('Request', Request);
  vi.stubGlobal('Response', Response);
});
