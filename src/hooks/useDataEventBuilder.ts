import {
  DataEventName,
  DataEventArgs,
  RouterEvent
} from "../typings";
import {EVENTS} from "../constants";
import {useRef} from "react";
import {FileSummary, getFormDataSummary} from "../utils";

export const useDataEventBuilder = () => {
  const eventCount = useRef(0);

  return async (eventName: DataEventName, eventArgs?: DataEventArgs[keyof DataEventArgs]): Promise<RouterEvent<any>> => {
    switch (eventName) {
      case EVENTS.ACTION_INVOKED: {
        const typedEventArgs = eventArgs as DataEventArgs[typeof eventName];
        const originalRequest = typedEventArgs['request'];

        const request = originalRequest.clone();
        const contentTypeHeader = request.headers.get('content-type');

        let humanReadableBody: string | Record<string, string | FileSummary>;
        let requestBodySize: number;

        switch (true) {
          case contentTypeHeader.startsWith('text'): humanReadableBody = await request.text(); break;
          case contentTypeHeader.startsWith('application/json'): humanReadableBody = await request.json(); break;
          case contentTypeHeader.startsWith('multipart/form-data'):
          case contentTypeHeader.startsWith('application/x-www-form-urlencoded'): {
            humanReadableBody = getFormDataSummary(await request.formData());
            break
          }
          default: requestBodySize = await request.arrayBuffer().then(b => b.byteLength);
        }

        const requestData = {
          url: request.url,
          method: request.method,
          body: humanReadableBody,
        }

        return {
          key: `${EVENTS.ACTION_INVOKED}_${eventCount.current++}`,
          type: EVENTS.ACTION_INVOKED,
          data: {
            ...typedEventArgs,
            request: requestData,
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
    }
  }
}
