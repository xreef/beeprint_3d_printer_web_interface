import { createLogic } from 'redux-logic';

import { webSocketSendMessage } from '../actions';
import { PRINTING_STATUS_REQUEST_VALUES } from '../actions/printingStatus';
import { selectors as psSelectors } from '../reducers/printingStatus';
import { multipleStatRequest } from '../additions/commands'

export const printingStatusStartLogic = createLogic({
  type: PRINTING_STATUS_REQUEST_VALUES,

  validate ({ getState, action }, allow, reject) {
    const state = getState();
    if (psSelectors.isRequestEnabled(state)) {
      allow(action);
    } else {
      reject();
    }
  },

  // by omitting dispatch and done, process will use the return
  // to determine what to dispatch. In this case we returned
  // an observable so it will dispatch any values that were emitted
  process ({ httpClient, getState, action }, dispatch, done) {
    dispatch(webSocketSendMessage(multipleStatRequest()));
    return done();
  }
});

export default [
  printingStatusStartLogic
];
