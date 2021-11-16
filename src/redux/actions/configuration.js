
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'configuration';

// action type constants GET
export const CONFIGURATION_FETCH = 'CONFIGURATION_FETCH';
export const CONFIGURATION_FETCH_CANCEL = 'CONFIGURATION_FETCH_CANCEL';
export const CONFIGURATION_FETCH_FULFILLED = 'CONFIGURATION_FETCH_FULFILLED';
export const CONFIGURATION_FETCH_REJECTED = 'CONFIGURATION_FETCH_REJECTED';
// action type constants POST
export const CONFIGURATION_FIELD_UPDATED = 'CONFIGURATION_FIELD_UPDATED';
export const CONFIGURATION_FIELD_INVALID = 'CONFIGURATION_FIELD_INVALID';
export const CONFIGURATION_ADD = 'CONFIGURATION_ADD';
export const CONFIGURATION_ADD_SUCCESS = 'CONFIGURATION_ADD_SUCCESS';
export const CONFIGURATION_ADD_FAILED = 'CONFIGURATION_ADD_FAILED';

export const actionTypes = {
  CONFIGURATION_FETCH,
  CONFIGURATION_FETCH_CANCEL,
  CONFIGURATION_FETCH_FULFILLED,
  CONFIGURATION_FETCH_REJECTED,

  CONFIGURATION_FIELD_UPDATED,
  CONFIGURATION_FIELD_INVALID,
  CONFIGURATION_ADD,
  CONFIGURATION_ADD_SUCCESS,
  CONFIGURATION_ADD_FAILED
};

// action creators
export const configurationFetch = () => ({
  type: CONFIGURATION_FETCH
});
export const configurationFetchCancel = () => (
  {
    type: CONFIGURATION_FETCH_CANCEL
  }
);
export const configurationFetchFulfilled = payload => ({
  type: CONFIGURATION_FETCH_FULFILLED,
  data: payload.data,
  lastUpdate: payload.lastUpdate
});
export const configurationFetchRejected = err => ({
  type: CONFIGURATION_FETCH_REJECTED,
  err,
  error: true
});

// action creators
export const configurationFieldUpdated = configuration => ({
  type: CONFIGURATION_FIELD_UPDATED,
  payload: configuration
});

export const configurationFieldInvalid = (errors, fieldUpdate) => ({
  type: CONFIGURATION_FIELD_INVALID,
  payload: {
    errors,
    fieldUpdate
  }
});

export const configurationAdd = (evt) => {
  evt.preventDefault();
  return { type: CONFIGURATION_ADD };
};

export const configurationAddSuccess = configuration => ({
  type: CONFIGURATION_ADD_SUCCESS,
  payload: configuration
});

export const configurationAddFailed = err => ({
  type: CONFIGURATION_ADD_FAILED,
  payload: err,
  error: true
});

export const actions = {
  configurationFieldUpdated,
  configurationFieldInvalid,
  // configurationAdd,
  configurationAddSuccess,
  configurationAddFailed,

  configurationFetch,
  configurationFetchCancel,
  configurationFetchFulfilled,
  configurationFetchRejected
};
