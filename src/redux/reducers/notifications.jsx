import { FormattedMessage } from 'react-intl';
import React from 'react';
import {
  ADD_NOTIFICATION,
  SHIFT_NOTIFICATION,
  GET_CURRENT_NOTIFICATION,
  addNotification
} from '../actions/notifications';
// import { DAILY_SET_LAYOUTS } from '../actions/daily';
// import { HISTORICAL_SET_LAYOUTS } from '../actions/historical';
// import { INVERTER_INFO_STATE_SET_LAYOUTS } from '../actions/inverterInfoState';
import { HOME_ADD_ELEMENT, HOME_REMOVE_ELEMENT, HOME_SET_LAYOUTS } from '../actions/home';

const notifications = (state = {
  current: null,
  queue: []
},

action) => {
  let notification = null;
  switch (action.type) {
    case HOME_SET_LAYOUTS:
    // case DAILY_SET_LAYOUTS:
    // case HISTORICAL_SET_LAYOUTS:
    // case INVERTER_INFO_STATE_SET_LAYOUTS:
      if (notification === null) notification = { message: <FormattedMessage id="layouts.set" />, variant: 'info' };
    case HOME_ADD_ELEMENT:
      if (notification === null) notification = { message: <FormattedMessage id="layouts.home.add" />, variant: 'info' };
    case HOME_REMOVE_ELEMENT:
      if (notification === null) notification = { message: <FormattedMessage id="layouts.home.remove" />, variant: 'info' };
    case ADD_NOTIFICATION:
      const notifica = { ...{ autoHide: 2200 }, ...action.notification, ...notification };
      if (state.current) {
        return {
          ...state,
          queue: [...state.queue, notifica]
        };
      }
      return {
        ...state,
        current: notifica
      };

    case SHIFT_NOTIFICATION:
      let elem = null;
      if (state.queue.length > 0) {
        elem = state.queue.shift();
      }
      return {
        queue: [...state.queue],
        current: elem
      };
    default:
      return state;
  }
};

export default notifications;
