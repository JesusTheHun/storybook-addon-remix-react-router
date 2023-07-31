export type RequireOne<T, Key = keyof T> = Exclude<
  {
    [K in keyof T]: K extends Key ? Omit<T, K> & Required<Pick<T, K>> : never;
  }[keyof T],
  undefined
>;

export type If<T, Then, Else> = T extends true ? Then : Else;
export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;
export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

export type Merge<T, Deep = false> = {
  [K in keyof T]: Deep extends true ? (T extends object ? Merge<T[K], true> : T[K]) : T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export type ToArray<T> = T extends ReadonlyArray<unknown> ? T : [T];

export type AssertKey<T, K extends PropertyKey> = IsUnion<T> extends true
  ? Extract<T, { [key in K]: unknown }> extends Extract<T, { [key in K]: infer Value }>
    ? T & Record<K, Value>
    : T
  : T & Record<K, unknown>;
