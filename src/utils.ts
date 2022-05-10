import { generatePath } from "react-router-dom";
import {EventData, NavigationEventsValues} from "./typings";

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

export const getTypedEventData = (eventName: NavigationEventsValues, data: unknown) => {
  return data as EventData[typeof eventName];
}
