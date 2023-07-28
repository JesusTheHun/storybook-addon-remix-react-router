import { ActionFunctionArgs } from '@remix-run/router/utils';
import { addons } from '@storybook/preview-api';
import { ActionFunction } from 'react-router';
import { EVENTS } from '../../../constants';
import { useDataEventBuilder } from '../hooks/useDataEventBuilder';

export function decorateActionFunction(action: ActionFunction): ActionFunction {
  const channel = addons.getChannel();
  const createEventData = useDataEventBuilder();

  return async function (actionArgs: ActionFunctionArgs) {
    if (action === undefined) return;

    channel.emit(EVENTS.ACTION_INVOKED, await createEventData(EVENTS.ACTION_INVOKED, actionArgs));
    const actionResult = await action(actionArgs);
    channel.emit(EVENTS.ACTION_SETTLED, await createEventData(EVENTS.ACTION_SETTLED, actionResult));

    return actionResult;
  };
}
