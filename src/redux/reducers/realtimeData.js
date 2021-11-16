import { FormattedMessage } from 'react-intl';
import React from 'react';
import {
  setPowerRealTime, SET_POWER_RT
} from '../actions/realtimeData';

const initialState = {
  power: {
    value: 0,
    lastUpdate: null
  }
};

function realtimeData(state = initialState, action) {
  switch (action.type) {
    case SET_POWER_RT:
      return {
        ...state,
        power: { ...action.data }
      };
    default:
      return state;
  }
};

export default realtimeData;
