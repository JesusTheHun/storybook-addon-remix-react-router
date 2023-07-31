import { RouteObject } from 'react-router';
import { describe, it } from 'vitest';
import { appendPathSegment, inferLocationPathFromRoutes } from './normalizeHistory';

describe('normalizeHistory', () => {
  describe('inferLocationPathFromRoutes', () => {
    it('should return "/" if no routes is given', () => {
      const result = inferLocationPathFromRoutes();
      expect(result).toEqual('/');
    });

    it('should return the root path if a single route is given', () => {
      const routes = [{ path: '/parent/child' }];
      const result = inferLocationPathFromRoutes(routes);
      expect(result).toEqual('/parent/child');
    });

    it('should return the root path if no default route is found', () => {
      const routes = [{ path: '/parent1' }, { path: '/parent2' }];
      const result = inferLocationPathFromRoutes(routes);
      expect(result).toEqual('/');
    });

    it('should return the parent path if there is an index route', () => {
      const routes: RouteObject[] = [
        {
          path: '/parent',
          children: [{ index: true }, { path: '/child' }],
        },
      ];
      const result = inferLocationPathFromRoutes(routes);
      expect(result).toEqual('/parent');
    });

    it('should return the joined path if each route has a single child', () => {
      const routes = [{ path: '/parent', children: [{ path: '/child' }] }];
      const result = inferLocationPathFromRoutes(routes);
      expect(result).toEqual('/parent/child');
    });
  });

  describe('appendPathSegment', () => {
    it('should return "/" if both the basePath and the segmentPath are empty', () => {
      expect(appendPathSegment('', '')).toEqual('/');
    });

    it('should return the basePath if there is no path to append', () => {
      expect(appendPathSegment('/', '')).toEqual('/');
      expect(appendPathSegment('/test', '')).toEqual('/test');
    });

    it('should insert a slash before the pathSegment if missing', () => {
      expect(appendPathSegment('/test', 'path')).toEqual('/test/path');
      expect(appendPathSegment('/test', '/path')).toEqual('/test/path');
    });

    it('should remove the slash after the basePath if present', () => {
      expect(appendPathSegment('/test/', 'path')).toEqual('/test/path');
      expect(appendPathSegment('/test/', '/path')).toEqual('/test/path');
    });

    it('should add a heading slash to the basePath if missing', () => {
      expect(appendPathSegment('test', 'path')).toEqual('/test/path');
      expect(appendPathSegment('test', '/path')).toEqual('/test/path');
    });
  });
});
