
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'serverState';

// action type constants
export const SERVER_STATE_FETCH = 'SERVER_STATE_FETCH';
export const SERVER_STATE_FETCH_CANCEL = 'SERVER_STATE_FETCH_CANCEL';
export const SERVER_STATE_FETCH_FULFILLED = 'SERVER_STATE_FETCH_FULFILLED';
export const SERVER_STATE_FETCH_REJECTED = 'SERVER_STATE_FETCH_REJECTED';
export const SERVER_STATE_BATTERY_FETCH_FULFILLED = 'SERVER_STATE_BATTERY_FETCH_FULFILLED';
export const SERVER_STATE_WIFI_STRENGHT_FETCH_FULFILLED = 'SERVER_STATE_WIFI_STRENGHT_FETCH_FULFILLED';

export const actionTypes = {
  SERVER_STATE_FETCH,
  SERVER_STATE_FETCH_CANCEL,
  SERVER_STATE_FETCH_FULFILLED,
  SERVER_STATE_FETCH_REJECTED,
  SERVER_STATE_BATTERY_FETCH_FULFILLED,
  SERVER_STATE_WIFI_STRENGHT_FETCH_FULFILLED
};

// action creators
export const serverStateFetch = () => ({
  type: SERVER_STATE_FETCH
});
export const serverStateFetchCancel = () => (
  {
    type: SERVER_STATE_FETCH_CANCEL
  }
);
export const serverStateFetchFulfilled = payload => ({
  type: SERVER_STATE_FETCH_FULFILLED,
  data: payload.data,
  lastUpdate: payload.lastUpdate
});

export const serverStateBatteryFetchFulfilled = data => ({
  type: SERVER_STATE_BATTERY_FETCH_FULFILLED,
  voltage: data.voltage,
  lastUpdate: data.lastUpdate
});

export const serverStateWIFIStrenghtFetchFulfilled = data => ({
  type: SERVER_STATE_WIFI_STRENGHT_FETCH_FULFILLED,
  signalStrengh: data.signalStrengh,
  lastUpdate: data.lastUpdate
});

export const serverStateFetchRejected = err => ({
  type: SERVER_STATE_FETCH_REJECTED,
  err,
  error: true
});

export const actions = {
  serverStateFetch,
  serverStateFetchCancel,
  serverStateFetchFulfilled,
  serverStateFetchRejected,
  serverStateBatteryFetchFulfilled,
  serverStateWIFIStrenghtFetchFulfilled
};
