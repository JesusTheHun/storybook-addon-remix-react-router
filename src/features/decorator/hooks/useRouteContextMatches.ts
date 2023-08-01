import { useState } from 'react';
import { UNSAFE_RouteContext } from 'react-router';
import { RouteMatch, useLocation } from 'react-router-dom';

type Ctx = {
  _currentValue?: { matches: RouteMatch[] };
};

export function useRouteContextMatches() {
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
