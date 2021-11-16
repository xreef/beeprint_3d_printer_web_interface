import { FormattedMessage } from 'react-intl';

import { createLogic } from 'redux-logic';
import React from 'react';
import {
  CONFIGURATION_FIELD_UPDATED, CONFIGURATION_ADD, configurationFieldInvalid,
  configurationAddSuccess, configurationAddFailed
} from '../actions/configuration';
import {
  addNotification
} from '../actions/notifications';
import { selectors as configurationSel } from '../reducers/configuration';
import { CONFIGURATION_ENDPOINT, MICROCONTROLLER_ADRESS } from '../config';


/**
 * Core business validation code, extracted so it can be used
 * in multiple places and even tested independently
 * @returns errors array
 */
export function validateFields(data) {
  const errors = [];
  if (data.server && (data.server.isStatic === undefined || data.server.isStatic === null)) { errors.push('Server is required!'); }
  if (data.emailNotification && !data.serverSMTP) { errors.push('SMTP configuration is required'); }
  if (data.serverSMTP && (!data.serverSMTP.from || !data.serverSMTP.password || !data.serverSMTP.port || !data.serverSMTP.server || !data.serverSMTP.login)) { errors.push('SMTP configuration not correct'); }
  return errors;
}

/**
 Checks that the updated user is valid. If valid then it allows the
 CONFIGURATION_FIELD_UPDATED action to go through, otherwise it sends a
 CONFIGURATION_FIELD_INVALID action with errors and the update.
 Reducers will watch for these actions to know how to update the UI state, the won't have to deal with validation logic since that is handled here.
 */
export const configurationUpdateValidationLogic = createLogic({
  type: CONFIGURATION_FIELD_UPDATED,
  validate({ getState, action, storeDispatch }, allow, reject) {
    const state = getState();
    const dataToUpdate = configurationSel.data(state); // use selector to find dataToUpdate

    const fieldUpdate = action.payload;
    const updatedFields = {
      ...dataToUpdate,
      ...fieldUpdate
    };

    // const fieldUpdate = action.payload;
    // // let's get all the current dataToUpdate and this update
    // // and we can see if this is going to pass our all field validation
    // const updatedFields = {
    //   ...dataToUpdate,
    //   ...fieldUpdate
    // };
    // validating
    const errors = validateFields(updatedFields);
    if (!errors.length) {
      allow(action); // no errors, let CONFIGURATION_FIELD_UPDATED go through
    } else { // errors, send a CONFIGURATION_FIELD_INVALID action instead
      storeDispatch(addNotification({ message: <FormattedMessage id="configuration.save.failed" values={{ err: errors.map((errElem, idx) => (errElem.toLocaleString() + ((idx) ? ' - ' : ''))), br: <br /> }} />, variant: 'error', autoHide: false }));
      reject(configurationFieldInvalid(errors, fieldUpdate));
    }
  }
});

/**
 * Validate state once again and if valid
 * use axios to post to a server.
 * Dispatch CONFIGURATION_ADD_SUCCESS or CONFIGURATION_ADD_FAILED
 * based on the response from the server.
 * Note: axios was injected as httpClient in
 * src/configureStore.js
 */
export const configurationAddLogic = createLogic({
  type: CONFIGURATION_ADD,
  validate({ getState, action }, allow, reject) {
    const state = getState();
    const dataToUpdate = configurationSel.dataToUpdate(state);
    const errors = validateFields(dataToUpdate);
    if (!errors.length) {
      allow(action); // no errors, let CONFIGURATION_ADD go through
    } else { // still has errors
      // it really should never get here since user shouldn't
      // be able to submit until valid.
      // Errors should already be on screen so just reject silently
      reject();
    }
  },

  // if it passed the validation hook then this will be executed
  process({ httpClient, getState }, dispatch, done) {
    const state = getState();
    const dataToUpdate = configurationSel.dataToUpdate(state);
    httpClient.post(`http://${MICROCONTROLLER_ADRESS}/${CONFIGURATION_ENDPOINT}`, dataToUpdate)
      .then(resp => resp.data) // new user created is returned
      .then((respData) => {
        dispatch(addNotification({
          message: <FormattedMessage id="configuration.save.success" />,
          variant: 'success'
        }));
        dispatch(configurationAddSuccess(respData));
      })
      .catch((err) => {
        console.error(err); // might be a render err
        dispatch(configurationAddFailed(err));
        dispatch(addNotification({ message: <FormattedMessage id="configuration.save.failed" values={{ err: err.toLocaleString(), br: <br /> }} />, variant: 'error', autoHide: false }));
      })
      .then(() => done()); // call when done dispatching
  }
});

export default [
  configurationUpdateValidationLogic,
  configurationAddLogic
];
