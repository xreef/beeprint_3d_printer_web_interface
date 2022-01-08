import { createLogic } from 'redux-logic';
import axios from 'axios';
// import moment from 'moment';

import { MICROCONTROLLER_ADRESS, CONFIGURATION_SERVER_ENDPOINT, CONFIGURATION_SERVER_GET_ENDPOINT } from '../config';

import {
  CONFIGURATION_SERVER_FETCH, CONFIGURATION_SERVER_FETCH_CANCEL, configurationServerFetchFulfilled,
  configurationServerFetchRejected, CONFIGURATION_SERVER_FETCH_REJECTED, CONFIGURATION_SERVER_FETCH_FULFILLED
} from '../actions/configurationServer';

const delay = 10; // 4s delay for interactive use of cancel/take latest

const configurationServerFetchLogic = createLogic({
  type: CONFIGURATION_SERVER_FETCH,
  cancelType: CONFIGURATION_SERVER_FETCH_CANCEL,
  latest: true, // take latest only

  processOptions: {
    dispatchReturn: true,
    successType: configurationServerFetchFulfilled, // CONFIGURATION_SERVER_FETCH_FULFILLED, //
    failType: configurationServerFetchRejected // CONFIGURATION_SERVER_FETCH_REJECTED //configurationServerFetchRejecte
  },

  process ({ httpClient, getState, action }, dispatch, done) {
    return httpClient.get(`http://${MICROCONTROLLER_ADRESS}/${CONFIGURATION_SERVER_GET_ENDPOINT}`)
      .then((resp) => {
        // const lastUpdate = new Date(moment(resp.data.lastUpdate, 'DD/MM/YYYY HH:mm:ss').valueOf());
        const data = { server: resp.data };

        return { data/*, lastUpdate */ };
      });
  }
});

export default [
  configurationServerFetchLogic
];
