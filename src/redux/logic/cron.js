import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { createLogic } from 'redux-logic';

import {
  CRON_START, CRON_CANCEL, CRON_RESET, CRON_END,
  CRON_EXECUTION, cronEnd, cronExecution,
  cronStartError
} from '../actions/cron';
import { printingStatusRequestValues, PRINTING_STATUS_SUBSCRIBE } from '../actions/printingStatus';
import { selectors as realtimeUpdateSelectors } from '../reducers/realtimeUpdate';
import { selectors as cronSel } from '../reducers/cron';

export const cronStartLogic = createLogic({
  type: CRON_START,
  cancelType: [CRON_CANCEL, CRON_RESET, CRON_END], // any will cancel

  // check to see if it is valid to start, > 0
  validate ({ getState, action }, allow, reject) {
    const state = getState();
    if (cronSel.status(state) !== 'started') {
      allow(action);
    } else {
      reject(cronStartError(new Error('Can\'t start, don\'t worry, already started!')));
    }
  },

  // by omitting dispatch and done, process will use the return
  // to determine what to dispatch. In this case we returned
  // an observable so it will dispatch any values that were emitted
  process ({ getState, cancelled$ }, dispatch, done) {
    const interval = setInterval(() => {
      dispatch(cronExecution());
    }, 5000);

    // The declarative cancellation already stops future dispatches
    // but we should go ahead and stop the timer we created.
    // If cancelled, stop the time interval
    cancelled$.subscribe(() => {
      clearInterval(interval);
    });

    // return interval(1000).pipe(
    //   map(() => {
    //     return cronExecution();
    //   }) // send cronExecution actions
    // );
  }
});

export const cronExecutionLogic = createLogic({
  type: CRON_EXECUTION,

  validate ({ getState, action }, allow, reject) {
    const state = getState();
    if (realtimeUpdateSelectors.isConnected(state)) {
      allow(action);
    } else { // shouldn't get here, but if does end
      reject(cronEnd());
    }
  },

  process ({ getState }, dispatch, done) {
    // unless other middleware/logic introduces async behavior, the
    // state will have been updated by the reducers before process runs
    dispatch(printingStatusRequestValues());

    done(); // call when done dispatching
  }
});

export default [
  cronStartLogic,
  cronExecutionLogic
];
