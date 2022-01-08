
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'configurationServer';

// action type constants GET
export const CONFIGURATION_SERVER_FETCH = 'CONFIGURATION_SERVER_FETCH';
export const CONFIGURATION_SERVER_FETCH_CANCEL = 'CONFIGURATION_SERVER_FETCH_CANCEL';
export const CONFIGURATION_SERVER_FETCH_FULFILLED = 'CONFIGURATION_SERVER_FETCH_FULFILLED';
export const CONFIGURATION_SERVER_FETCH_REJECTED = 'CONFIGURATION_SERVER_FETCH_REJECTED';
// action type constants POST
export const CONFIGURATION_SERVER_FIELD_UPDATED = 'CONFIGURATION_SERVER_FIELD_UPDATED';
export const CONFIGURATION_SERVER_FIELD_INVALID = 'CONFIGURATION_SERVER_FIELD_INVALID';
export const CONFIGURATION_SERVER_ADD = 'CONFIGURATION_SERVER_ADD';
export const CONFIGURATION_SERVER_ADD_SUCCESS = 'CONFIGURATION_SERVER_ADD_SUCCESS';
export const CONFIGURATION_SERVER_ADD_FAILED = 'CONFIGURATION_SERVER_ADD_FAILED';

export const actionTypes = {
  CONFIGURATION_SERVER_FETCH,
  CONFIGURATION_SERVER_FETCH_CANCEL,
  CONFIGURATION_SERVER_FETCH_FULFILLED,
  CONFIGURATION_SERVER_FETCH_REJECTED,

  CONFIGURATION_SERVER_FIELD_UPDATED,
  CONFIGURATION_SERVER_FIELD_INVALID,
  CONFIGURATION_SERVER_ADD,
  CONFIGURATION_SERVER_ADD_SUCCESS,
  CONFIGURATION_SERVER_ADD_FAILED
};

// action creators
export const configurationServerFetch = () => ({
  type: CONFIGURATION_SERVER_FETCH
});
export const configurationServerFetchCancel = () => (
  {
    type: CONFIGURATION_SERVER_FETCH_CANCEL
  }
);
export const configurationServerFetchFulfilled = payload => ({
  type: CONFIGURATION_SERVER_FETCH_FULFILLED,
  data: payload.data,
  lastUpdate: payload.lastUpdate
});
export const configurationServerFetchRejected = err => ({
  type: CONFIGURATION_SERVER_FETCH_REJECTED,
  err,
  error: true
});

// action creators
export const configurationServerFieldUpdated = configurationServer => ({
  type: CONFIGURATION_SERVER_FIELD_UPDATED,
  payload: configurationServer
});

export const configurationServerFieldInvalid = (errors, fieldUpdate) => ({
  type: CONFIGURATION_SERVER_FIELD_INVALID,
  payload: {
    errors,
    fieldUpdate
  }
});

export const configurationServerAdd = (evt) => {
  evt.preventDefault();
  return { type: CONFIGURATION_SERVER_ADD };
};

export const configurationServerAddSuccess = configurationServer => ({
  type: CONFIGURATION_SERVER_ADD_SUCCESS,
  payload: configurationServer
});

export const configurationServerAddFailed = err => ({
  type: CONFIGURATION_SERVER_ADD_FAILED,
  payload: err,
  error: true
});

export const actions = {
  configurationServerFieldUpdated,
  configurationServerFieldInvalid,
  // configurationServerAdd,
  configurationServerAddSuccess,
  configurationServerAddFailed,

  configurationServerFetch,
  configurationServerFetchCancel,
  configurationServerFetchFulfilled,
  configurationServerFetchRejected
};
