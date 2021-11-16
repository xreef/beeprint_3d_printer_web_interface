
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'cameraControl';

// action type constants
export const CAMERA_CONTROL_FETCH = 'CAMERA_CONTROL_FETCH';
export const CAMERA_CONTROL_FETCH_CANCEL = 'CAMERA_CONTROL_FETCH_CANCEL';
export const CAMERA_CONTROL_FETCH_FULFILLED = 'CAMERA_CONTROL_FETCH_FULFILLED';
export const CAMERA_CONTROL_FETCH_REJECTED = 'CAMERA_CONTROL_FETCH_REJECTED';
// action type constants
export const CAMERA_STATUS_FETCH = 'CAMERA_STATUS_FETCH';
export const CAMERA_STATUS_FETCH_CANCEL = 'CAMERA_STATUS_FETCH_CANCEL';
export const CAMERA_STATUS_FETCH_FULFILLED = 'CAMERA_STATUS_FETCH_FULFILLED';
export const CAMERA_STATUS_FETCH_REJECTED = 'CAMERA_STATUS_FETCH_REJECTED';

export const actionTypes = {
  CAMERA_CONTROL_FETCH,
  CAMERA_CONTROL_FETCH_CANCEL,
  CAMERA_CONTROL_FETCH_FULFILLED,
  CAMERA_CONTROL_FETCH_REJECTED,
  CAMERA_STATUS_FETCH,
  CAMERA_STATUS_FETCH_CANCEL,
  CAMERA_STATUS_FETCH_FULFILLED,
  CAMERA_STATUS_FETCH_REJECTED,
};

// action creators
export const cameraControlFetch = (control, value) => ({
  type: CAMERA_CONTROL_FETCH,
  control,
  value
});
export const cameraControlFetchCancel = () => (
  {
    type: CAMERA_CONTROL_FETCH_CANCEL
  }
);
export const cameraControlFetchFulfilled = (control, value) => ({
  type: CAMERA_CONTROL_FETCH_FULFILLED,
  control,
  value
});

export const cameraControlFetchRejected = err => ({
  type: CAMERA_CONTROL_FETCH_REJECTED,
  err,
  error: true
});

// action creators
export const cameraStatusFetch = () => ({
  type: CAMERA_STATUS_FETCH
});
export const cameraStatusFetchCancel = () => (
  {
    type: CAMERA_STATUS_FETCH_CANCEL
  }
);
export const cameraStatusFetchFulfilled = (data) => ({
  type: CAMERA_STATUS_FETCH_FULFILLED,
  data
});

export const cameraStatusFetchRejected = err => ({
  type: CAMERA_STATUS_FETCH_REJECTED,
  err,
  error: true
});

export const actions = {
  cameraControlFetch,
  cameraControlFetchCancel,
  cameraControlFetchFulfilled,
  cameraControlFetchRejected,
  cameraStatusFetch,
  cameraStatusFetchCancel,
  cameraStatusFetchFulfilled,
  cameraStatusFetchRejected
};
