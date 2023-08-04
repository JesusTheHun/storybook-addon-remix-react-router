import type { RouterDataEvent, DataEventArgs, RouterDataEventName } from '../../panel/types';
import { useCallback, useRef } from 'react';
import { EVENTS } from '../../../constants';

import { getHumanReadableBody } from '../utils/getHumanReadableBody';

export const useDataEventBuilder = () => {
  const eventCount = useRef(0);

  return useCallback(
    async (
      eventName: RouterDataEventName,
      eventArgs?: DataEventArgs[keyof DataEventArgs]
    ): Promise<RouterDataEvent> => {
      eventCount.current++;
      const key = `${eventName}_${eventCount.current}`;

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
