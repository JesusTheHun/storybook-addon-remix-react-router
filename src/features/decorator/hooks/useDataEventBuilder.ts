import type { DataEvent, DataEventArgs, DataEventName } from '../../panel/types';
import { useCallback, useRef } from 'react';
import { EVENTS } from '../../../constants';
import { getHumanReadableBody } from '../../panel/utils';

export const useDataEventBuilder = () => {
  const eventCount = useRef(0);

  return useCallback(
    async (eventName: DataEventName, eventArgs?: DataEventArgs[keyof DataEventArgs]): Promise<DataEvent> => {
      const key = `DataEvent_${eventCount.current++}`;

      switch (eventName) {
        case EVENTS.ACTION_INVOKED: {
          const { request, params, context } = eventArgs as DataEventArgs[typeof eventName];
          const requestData = {
            url: request.url,
            method: request.method,
            body: await getHumanReadableBody(request),
          };

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
          };

          const data = { params, request: requestData, context };
          return { key, type: eventName, data };
        }

        case EVENTS.LOADER_SETTLED: {
          return { key, type: eventName, data: eventArgs };
        }
      }
    },
    []
  );
};
