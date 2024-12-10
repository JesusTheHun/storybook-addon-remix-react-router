import { useState } from 'react';
import { UNSAFE_RouteContext, RouteMatch } from 'react-router';

type Ctx = {
  _currentValue?: { matches: RouteMatch[] };
};

export function useRouteContextMatches(): RouteMatch[] {
  const [deepRouteMatches, setDeepRouteMatches] = useState<RouteMatch[]>([]);

  const RouteContext = UNSAFE_RouteContext as unknown as { Provider: { _context: Ctx } };

  RouteContext.Provider._context = new Proxy(RouteContext.Provider._context ?? {}, {
    set(target: Ctx, p: keyof Ctx, v: Ctx[keyof Ctx]) {
      if (p === '_currentValue') {
        if (v !== undefined) {
          setDeepRouteMatches((currentMatches) => {
            if (v.matches.length > currentMatches.length) {
              return v.matches;
            }
            return currentMatches;
          });
        }
      }

      return Reflect.set(target, p, v);
    },
  });

  return deepRouteMatches;
}
