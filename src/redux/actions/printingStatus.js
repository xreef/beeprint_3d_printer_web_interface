// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'printingStatus';

// action type constants
export const PRINTING_STATUS_SET_VALUES = 'PRINTING_STATUS_SET_VALUES';

export const PRINTING_PROGRESS_PERCENTAGE_SET_VALUES = 'PRINTING_PROGRESS_PERCENTAGE_SET_VALUES';
export const PRINTING_SET_PRINTING_FILE_INFO = 'PRINTING_SET_PRINTING_FILE_INFO';
export const PRINTING_SET_PRINTING_TIME = 'PRINTING_SET_PRINTING_TIME';

export const PRINTING_STATUS_REQUEST_VALUES = 'PRINTING_STATUS_REQUEST_VALUES';
export const PRINTING_STATUS_SUBSCRIBE = 'PRINTING_STATUS_SUBSCRIBE';
export const PRINTING_STATUS_UNSUBSCRIBE = 'PRINTING_STATUS_UNSUBSCRIBE';

export const actionTypes = {
  PRINTING_STATUS_SET_VALUES,
  PRINTING_STATUS_REQUEST_VALUES,
  PRINTING_PROGRESS_PERCENTAGE_SET_VALUES,
  PRINTING_SET_PRINTING_FILE_INFO,
  PRINTING_SET_PRINTING_TIME,
  PRINTING_STATUS_SUBSCRIBE,
  PRINTING_STATUS_UNSUBSCRIBE
};

// action creators
export const setPrintingStatusValues = printingStatusValues => ({
  type: PRINTING_STATUS_SET_VALUES,
  printingStatusValues
});
// action creators
export const setProgressPercentageValues = progressPercentage => ({
  type: PRINTING_PROGRESS_PERCENTAGE_SET_VALUES,
  progressPercentage
});
export const setPrintingFileInfo = (file, size) => ({
  type: PRINTING_SET_PRINTING_FILE_INFO,
  file,
  size
});
export const setPrintingTime = (hours, minutes, seconds) => ({
  type: PRINTING_SET_PRINTING_TIME,
  hours,
  minutes,
  seconds
});

export const printingStatusRequestValues = () => ({
  type: PRINTING_STATUS_REQUEST_VALUES
});
export const printingStatusSubscribe = () => ({
  type: PRINTING_STATUS_SUBSCRIBE
});
export const printingStatusUnsubscribe = () => ({
  type: PRINTING_STATUS_UNSUBSCRIBE
});

export const actions = {
  setPrintingStatusValues,
  printingStatusRequestValues,
  printingStatusSubscribe,
  printingStatusUnsubscribe,

  setProgressPercentageValues,
  setPrintingFileInfo,
  setPrintingTime
};
