import { DataEvent, DataEventArgs, DataEventKey, DataEventName, RouterEvent } from "../typings";
import {EVENTS} from "../constants";
import {getHumanReadableBody} from "../utils";
import { useRef } from "react";

export const useDataEventBuilder = () => {
  const eventCount = useRef(0);

  return async (eventName: DataEventName, eventArgs?: DataEventArgs[keyof DataEventArgs]): Promise<DataEvent> => {
    const key = `${EVENTS.STORY_LOADED}_${eventCount.current++}`;

    switch (eventName) {
      case EVENTS.ACTION_INVOKED: {
        const { request, params, context } = eventArgs as DataEventArgs[typeof eventName];
        const requestData = {
          url: request.url,
          method: request.method,
          body: await getHumanReadableBody(request),
        }

        const data = { params, request: requestData, context };
        return { key, type: eventName, data };
      }

      case EVENTS.ACTION_SETTLED: {
        return { key, type: eventName, data: eventArgs };
      }

      case EVENTS.LOADER_INVOKED: {
        const { request, params, context } = eventArgs as DataEventArgs[typeof eventName];

        const requestData = {
          url: request.url,
          method: request.method,
          body: await getHumanReadableBody(request),
        }

        const data = { params, request: requestData, context };
        return { key, type: eventName, data };
      }

      case EVENTS.LOADER_SETTLED: {
        return { key, type: eventName, data: eventArgs };
      }
    }
  }
}
