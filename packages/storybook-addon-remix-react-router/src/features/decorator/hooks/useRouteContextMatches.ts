import { useState } from 'react';
import { UNSAFE_RouteContext, RouteMatch } from 'react-router';

type RouteContextValue = { matches: RouteMatch[] };

type ReactContextInternals = {
  _currentValue?: RouteContextValue;
  // React <=18 keeps a back-reference to the real context on the Provider; React >=19
  // makes the context its own Provider, so this is absent.
  Provider?: { _context?: { _currentValue?: RouteContextValue } };
};

/**
 * Observes every value pushed to react-router's `RouteContext` (including the deeper
 * contexts created by descendant `<Routes>`, which no public API exposes) and keeps
 * the deepest match chain seen.
 *
 * React writes a context's value to its internal `_currentValue`, but the way to reach
 * that field differs by major version, so we intercept both:
 * - React <=18: the live value lands on `Provider._context._currentValue` — wrap that
 *   object in a Proxy.
 * - React >=19: the context is its own Provider and the value lands on the context's
 *   own `_currentValue` — replace that field with a getter/setter.
 *
 * Both branches chain onto whatever interceptor is already installed, so several
 * concurrent decorators — a docs page rendering many stories at once — all keep
 * observing instead of only the last one to render.
 */
export function useRouteContextMatches(): RouteMatch[] {
  const [deepRouteMatches, setDeepRouteMatches] = useState<RouteMatch[]>([]);

  const observe = (value: RouteContextValue | undefined) => {
    if (value !== undefined) {
      setDeepRouteMatches((currentMatches) => {
        if (value.matches.length > currentMatches.length) {
          return value.matches;
        }
        return currentMatches;
      });
    }
  };

  const RouteContext = UNSAFE_RouteContext as unknown as ReactContextInternals;

  if (RouteContext.Provider?._context !== undefined) {
    // Wrapping the previous target — itself possibly a Proxy — chains the traps.
    RouteContext.Provider._context = new Proxy(RouteContext.Provider._context, {
      set(target, p: string | symbol, v) {
        if (p === '_currentValue') {
          observe(v as RouteContextValue | undefined);
        }
        return Reflect.set(target, p, v);
      },
    });
  } else {
    const descriptor = Object.getOwnPropertyDescriptor(RouteContext, '_currentValue');
    const previousSet = descriptor?.set;
    let backingValue = descriptor?.get
      ? (descriptor.get.call(RouteContext) as RouteContextValue | undefined)
      : RouteContext._currentValue;

    Object.defineProperty(RouteContext, '_currentValue', {
      configurable: true,
      get() {
        return backingValue;
      },
      set(value: RouteContextValue | undefined) {
        backingValue = value;
        // Defining a property replaces the previous accessor rather than layering on
        // it, so forward to it explicitly to keep earlier observers alive.
        previousSet?.call(RouteContext, value);
        observe(value);
      },
    });
  }

  return deepRouteMatches;
}
