import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { createLogic } from 'redux-logic';

import {
  FILE_LIST_REQUEST,
  FILE_LIST_START,
  FILE_LIST_ERROR,
  FILE_LIST_END,
  FILE_ADD,
  FILE_DELETE, fileAdd, fileListStart
} from '../actions/fileList';

import { selectors as fileListSelectors } from '../reducers/fileList';
import { webSocketSendMessage } from '../actions';
import { requestFileList } from '../additions/commands';

export const fileListLogic = createLogic({
  type: FILE_LIST_REQUEST,
  cancelType: [FILE_LIST_END, FILE_LIST_ERROR], // any will cancel

  // // check to see if it is valid to start, > 0
  // validate ({ getState, action }, allow, reject) {
  //   const state = getState();
  //   if (cronSel.status(state) !== 'started') {
  //     allow(action);
  //   } else {
  //     reject(cronStartError(new Error('Can\'t start, don\'t worry, already started!')));
  //   }
  // },
  //
  // by omitting dispatch and done, process will use the return
  // to determine what to dispatch. In this case we returned
  // an observable so it will dispatch any values that were emitted
  process ({ getState,action, cancelled$ }, dispatch, done) {
    dispatch(webSocketSendMessage(requestFileList(action.path)));
    return done();
  }
});

// export const cronExecutionLogic = createLogic({
//   type: FILE_ADD,
//
//   validate ({ getState, action }, allow, reject) {
//     const state = getState();
//     if (fileListSelectors.fileStreamStarted(state)) {
//       allow(action);
//     } else { // shouldn't get here, but if does end
//       reject();
//     }
//   },
//
//   process ({ getState }, dispatch, done) {
//     // unless other middleware/logic introduces async behavior, the
//     // state will have been updated by the reducers before process runs
//     dispatch(fileAdd());
//
//     done(); // call when done dispatching
//   }
// });

export default [
  fileListLogic
];
