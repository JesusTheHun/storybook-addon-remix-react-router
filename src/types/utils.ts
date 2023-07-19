type PushRouteParam<
  Segment extends string | undefined,
  RouteParams extends Record<string, unknown> | unknown
> = Segment extends `:${infer ParamName}` ? { [key in ParamName | keyof RouteParams]: string } : RouteParams;

export type RouteParamsFromPath<Path extends string | undefined> =
  Path extends `${infer CurrentSegment}/${infer RemainingPath}`
    ? PushRouteParam<CurrentSegment, RouteParamsFromPath<RemainingPath>>
    : PushRouteParam<Path, unknown>;
