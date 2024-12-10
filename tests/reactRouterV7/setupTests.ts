import { beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { mockLocalStorage } from './test-utils';

beforeEach(() => {
  mockLocalStorage();
});
