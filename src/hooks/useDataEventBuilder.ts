import {DataEventArgs, DataEventName, RouterEvent} from "../typings";
import {EVENTS} from "../constants";
import {getHumanReadableBody} from "../utils";

export const useDataEventBuilder = () => {

  return async (eventName: DataEventName, eventArgs?: DataEventArgs[keyof DataEventArgs]): Promise<RouterEvent<any>> => {
    switch (eventName) {
      case EVENTS.ACTION_INVOKED: {
        const { request, params, context } = eventArgs as DataEventArgs[typeof eventName];

        const requestData = {
          url: request.url,
          method: request.method,
          body: await getHumanReadableBody(request),
        }

        return {
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
          type: EVENTS.LOADER_SETTLED,
          data: eventArgs,
        };
      }
    }
  }
}
