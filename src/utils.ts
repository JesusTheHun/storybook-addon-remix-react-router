import { generatePath } from "react-router-dom";
import {NavigationEventData, NavigationEventName} from "./typings";
import {number} from "prop-types";

export const generateAppUrl = (
  path: Parameters<typeof generatePath>[0],
  params?: Parameters<typeof generatePath>[1],
  search?: ConstructorParameters<typeof URLSearchParams>[0],
  hash?: string,
) => {
  const pathname = generatePath(path, params);
  const queryString = search && Object.keys(search).length > 0 ? `?${new URLSearchParams(search).toString()}` : '';
  const hashString = hash ? hash : '';

  return `${pathname}${queryString}${hashString}`;
}


export type Deferred<T> = {
  promise: Promise<T>;
  resolve: ((value: T | PromiseLike<T>) => void);
  reject: ((reason?: any) => void);
}

export function defer<T = void>(): Deferred<T> {
  const deferred: Partial<Deferred<T>> = {};

  deferred.promise = new Promise<T>((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred as Deferred<T>;
}

export type FileSummary = { filename: string; filesize: number; filetype: string; };

export function getFormDataSummary(formData: FormData): Record<string, string | FileSummary> {
  const data: Record<string, string | FileSummary> = {};

  formData.forEach((value, key) => {
    if (value instanceof File) {
      data[key] = {
        filename: value.name,
        filesize: value.size,
        filetype: value.type,
      };
      return;
    }

    data[key] = value;
  });

  return data;
}