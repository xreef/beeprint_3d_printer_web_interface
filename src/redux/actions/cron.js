// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'cron';

// action type constants
export const CRON_START = 'CRON_START';
export const CRON_CANCEL = 'CRON_CANCEL';
export const CRON_RESET = 'CRON_RESET';
export const CRON_END = 'CRON_END';
export const CRON_EXECUTION = 'CRON_EXECUTION';
export const CRON_START_ERROR = 'CRON_START_ERROR';

export const actionTypes = {
  CRON_START,
  CRON_CANCEL,
  CRON_RESET,
  CRON_END,
  CRON_EXECUTION,
  CRON_START_ERROR
};


// action creators
export const cronStart = () => ({ type: CRON_START });
export const cronCancel = () => ({ type: CRON_CANCEL });
export const cronReset = () => ({ type: CRON_RESET });
export const cronEnd = () => ({ type: CRON_END });
export const cronExecution = () => ({ type: CRON_EXECUTION });
export const cronStartError = (err) => ({
  type: CRON_START_ERROR,
  payload: err,
  error: true
});

export const actions = {
  cronStart,
  cronCancel,
  cronReset,
  cronEnd,
  cronExecution,
  cronStartError
};
