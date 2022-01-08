import { FormattedMessage } from 'react-intl';

import { createLogic } from 'redux-logic';
import React from 'react';
import {
  CONFIGURATION_SERVER_FIELD_UPDATED, CONFIGURATION_SERVER_ADD, configurationServerFieldInvalid,
  configurationServerAddSuccess, configurationServerAddFailed
} from '../actions/configurationServer';
import {
  addNotification
} from '../actions/notifications';
import { selectors as configurationServerSel } from '../reducers/configurationServer';
import { CONFIGURATION_SERVER_SET_ENDPOINT, MICROCONTROLLER_ADRESS } from '../config';

function validateIPaddress (ipaddress) {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
    return true;
  }
  return false;
}

/**
 * Core business validation code, extracted so it can be used
 * in multiple places and even tested independently
 * @returns errors array
 */
export function validateFields (data) {
  const errors = [];
  if (data.server && (data.server.isStatic === undefined || data.server.isStatic === null)) { errors.push('Server is required!'); }
  if (data.server.isStatic) {
    if (data.server.ip) {
      if (!validateIPaddress(data.server.ip)) errors.push('IP error!');
    } else {
      errors.push('IP mandatory!');
    }
    if (data.server.gw) {
      if (!validateIPaddress(data.server.gw)) errors.push('Geteway error!');
    } else {
      errors.push('Geteway mandatory!');
    }
    if (data.server.sm) {
      if (!validateIPaddress(data.server.sm)) errors.push('Subnet Mask error!');
    } else {
      errors.push('Subnet Mask  mandatory!');
    }
    if (data.server.dns1) {
      if (!validateIPaddress(data.server.dns1)) errors.push('DNS error!');
    } else {
      errors.push('DNS mandatory!');
    }
  }
  return errors;
}
/**
 Checks that the updated user is valid. If valid then it allows the
 CONFIGURATION_SERVER_FIELD_UPDATED action to go through, otherwise it sends a
 CONFIGURATION_SERVER_FIELD_INVALID action with errors and the update.
 Reducers will watch for these actions to know how to update the UI state, the won't have to deal with validation logic since that is handled here.
 */
export const configurationServerUpdateValidationLogic = createLogic({
  type: CONFIGURATION_SERVER_FIELD_UPDATED,
  validate ({ getState, action, storeDispatch }, allow, reject) {
    const state = getState();
    const dataToUpdate = configurationServerSel.data(state); // use selector to find dataToUpdate

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
      allow(action); // no errors, let CONFIGURATION_SERVER_FIELD_UPDATED go through
    } else { // errors, send a CONFIGURATION_SERVER_FIELD_INVALID action instead
      storeDispatch(addNotification({ message: <FormattedMessage id="configuration.save.failed" values={{ err: errors.map((errElem, idx) => (errElem.toLocaleString() + ((idx) ? ' - ' : ''))), br: <br /> }} />, variant: 'error', autoHide: false }));
      reject(configurationServerFieldInvalid(errors, fieldUpdate));
    }
  }
});

/**
 * Validate state once again and if valid
 * use axios to post to a server.
 * Dispatch CONFIGURATION_SERVER_ADD_SUCCESS or CONFIGURATION_SERVER_ADD_FAILED
 * based on the response from the server.
 * Note: axios was injected as httpClient in
 * src/configureStore.js
 */
export const configurationServerAddLogic = createLogic({
  type: CONFIGURATION_SERVER_ADD,
  validate ({ getState, action }, allow, reject) {
    const state = getState();
    const dataToUpdate = configurationServerSel.dataToUpdate(state);
    const errors = validateFields(dataToUpdate);
    if (!errors.length) {
      allow(action); // no errors, let CONFIGURATION_SERVER_ADD go through
    } else { // still has errors
      // it really should never get here since user shouldn't
      // be able to submit until valid.
      // Errors should already be on screen so just reject silently
      reject();
    }
  },

  // if it passed the validation hook then this will be executed
  process ({ httpClient, getState }, dispatch, done) {
    const state = getState();
    debugger;
    const dataToUpdate = { params: configurationServerSel.dataToUpdate(state).server };
    httpClient.get(`http://${MICROCONTROLLER_ADRESS}/${CONFIGURATION_SERVER_SET_ENDPOINT}`, dataToUpdate)
      .then(resp => resp.data) // new user created is returned
      .then((respData) => {
        dispatch(addNotification({
          message: <FormattedMessage id="configuration.save.success" />,
          variant: 'success'
        }));
        dispatch(configurationServerAddSuccess(respData));
      })
      .catch((err) => {
        console.error(err); // might be a render err
        dispatch(configurationServerAddFailed(err));
        dispatch(addNotification({ message: <FormattedMessage id="configuration.save.failed" values={{ err: err.toLocaleString(), br: <br /> }} />, variant: 'error', autoHide: false }));
      })
      .then(() => done()); // call when done dispatching
  }
});

export default [
  configurationServerUpdateValidationLogic,
  configurationServerAddLogic
];
