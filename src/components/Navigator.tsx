import {useNavigate} from 'react-router-dom';
import addons from '@storybook/addons';
import {EVENTS} from '../constants';
import React from 'react';

export function Navigator(): null {
  const navigate = useNavigate();
  const channel = addons.getChannel();
  channel.on(EVENTS.PUSH, ({pathname, search, hash, state}) => {
    navigate({
      pathname, search, hash,
    }, {state, replace: false});
  });
  channel.on(EVENTS.REPLACE, ({pathname, search, hash, state}) => {
    navigate({
      pathname, search, hash,
    }, {state, replace: true});
  });

  return null;
}
