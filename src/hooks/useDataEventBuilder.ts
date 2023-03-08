import {
  DataEventName,
  DataEventArgs,
  RouterEvent
} from "../typings";
import {EVENTS} from "../constants";
import {useRef} from "react";
import {FileSummary, getFormDataSummary, getHumanReadableBody} from "../utils";

export const useDataEventBuilder = () => {
  const eventCount = useRef(0);

  return async (eventName: DataEventName, eventArgs?: DataEventArgs[keyof DataEventArgs]): Promise<RouterEvent<any>> => {
    switch (eventName) {
      case EVENTS.ACTION_INVOKED: {
        const { request, params, context } = eventArgs as DataEventArgs[typeof eventName];

        const requestData = {
          url: request.url,
          method: request.method,
          body: getHumanReadableBody(request),
        }

        return {
          key: `${EVENTS.ACTION_INVOKED}_${eventCount.current++}`,
          type: EVENTS.ACTION_INVOKED,
          data: {
            params,
            request: requestData,
            context,
          },
        };
      }

      case EVENTS.ACTION_SETTLED: {
        return {
          key: `${EVENTS.ACTION_SETTLED}_${eventCount.current++}`,
          type: EVENTS.ACTION_SETTLED,
          data: eventArgs,
        };
      }

      case EVENTS.LOADER_INVOKED: {
        const { request, params, context } = eventArgs as DataEventArgs[typeof eventName];

        const requestData = {
          url: request.url,
          method: request.method,
          body: getHumanReadableBody(request),
        }

        return {
          key: `${EVENTS.LOADER_INVOKED}_${eventCount.current++}`,
          type: EVENTS.LOADER_INVOKED,
          data: {
            params,
            request: requestData,
            context,
          },
        };
      }

      case EVENTS.LOADER_SETTLED: {
        return {
          key: `${EVENTS.LOADER_SETTLED}_${eventCount.current++}`,
          type: EVENTS.LOADER_SETTLED,
          data: eventArgs,
        };
      }
    }
  }
}
