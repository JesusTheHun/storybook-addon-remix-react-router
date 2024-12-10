import { vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

import { fetch, Request, Response } from '@remix-run/web-fetch';
import { mockLocalStorage } from './utils/test-utils';

beforeEach(() => {
  mockLocalStorage();
  vi.stubGlobal('fetch', fetch);
  vi.stubGlobal('Request', Request);
  vi.stubGlobal('Response', Response);
});
