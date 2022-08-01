import {EventData, NavigationEventsValues} from "./typings";

export const generateAppUrl = (
  pathname: string,
  search?: ConstructorParameters<typeof URLSearchParams>[0],
  hash?: string,
) => {
  const queryString = search && Object.keys(search).length > 0 ? `?${new URLSearchParams(search).toString()}` : '';
  const hashString = hash ? hash : '';

  return `${pathname}${queryString}${hashString}`;
}

export const getTypedEventData = (eventName: NavigationEventsValues, data: unknown) => {
  return data as EventData[typeof eventName];
}
