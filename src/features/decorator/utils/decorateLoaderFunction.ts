import { addons } from '@storybook/preview-api';
import { ActionFunction, LoaderFunction, LoaderFunctionArgs } from 'react-router';
import { EVENTS } from '../../../constants';
import { useDataEventBuilder } from '../hooks/useDataEventBuilder';

export function decorateLoaderFunction(loader: LoaderFunction): ActionFunction {
  const channel = addons.getChannel();
  const createEventData = useDataEventBuilder();

  return async function (loaderArgs: LoaderFunctionArgs) {
    if (loader === undefined) return;

    channel.emit(EVENTS.LOADER_INVOKED, await createEventData(EVENTS.LOADER_INVOKED, loaderArgs));
    const loaderResult = await loader(loaderArgs);
    channel.emit(EVENTS.LOADER_SETTLED, await createEventData(EVENTS.LOADER_SETTLED, loaderResult));

    return loaderResult;
  };
}
