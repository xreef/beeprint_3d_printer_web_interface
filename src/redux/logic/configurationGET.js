import { createLogic } from 'redux-logic';
import axios from 'axios';
// import moment from 'moment';

import { MICROCONTROLLER_ADRESS, CONFIGURATION_ENDPOINT } from '../config';

import {
  CONFIGURATION_FETCH, CONFIGURATION_FETCH_CANCEL, configurationFetchFulfilled,
  configurationFetchRejected, CONFIGURATION_FETCH_REJECTED, CONFIGURATION_FETCH_FULFILLED
} from '../actions/configuration';

const delay = 10; // 4s delay for interactive use of cancel/take latest

const configurationFetchLogic = createLogic({
  type: CONFIGURATION_FETCH,
  cancelType: CONFIGURATION_FETCH_CANCEL,
  latest: true, // take latest only

  processOptions: {
    dispatchReturn: true,
    successType: configurationFetchFulfilled, // CONFIGURATION_FETCH_FULFILLED, //
    failType: configurationFetchRejected // CONFIGURATION_FETCH_REJECTED //configurationFetchRejecte
  },

  process({ httpClient, getState, action }, dispatch, done) {
    return httpClient.get(`http://${MICROCONTROLLER_ADRESS}/${CONFIGURATION_ENDPOINT}`)
      .then((resp) => {
        // const lastUpdate = new Date(moment(resp.data.lastUpdate, 'DD/MM/YYYY HH:mm:ss').valueOf());
        const data = resp.data;

        return { data/*, lastUpdate*/ };
      });
  }
});

export default [
  configurationFetchLogic
];
