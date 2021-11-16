import { createLogic } from 'redux-logic';
import axios from 'axios';
// import moment from 'moment';

import { CAMERA_CONTROL_ENDPOINT,CAMERA_STATUS_ENDPOINT } from '../config';

import {
  CAMERA_CONTROL_FETCH,
  CAMERA_CONTROL_FETCH_CANCEL,
  CAMERA_STATUS_FETCH,
  CAMERA_STATUS_FETCH_CANCEL,
  cameraControlFetchFulfilled,
  cameraControlFetchRejected, cameraStatusFetchFulfilled, cameraStatusFetchRejected//, CAMERA_CONTROL_FETCH_REJECTED, CAMERA_CONTROL_FETCH_FULFILLED
} from '../actions/cameraControl'

const delay = 10; // 4s delay for interactive use of cancel/take latest

const cameraControlFetchLogic = createLogic({
  type: CAMERA_CONTROL_FETCH,
  cancelType: CAMERA_CONTROL_FETCH_CANCEL,
  latest: true, // take latest only

  processOptions: {
    dispatchReturn: true,
    // successType: cameraControlFetchFulfilled, // CAMERA_CONTROL_FETCH_FULFILLED, //
    failType: cameraControlFetchRejected // CAMERA_CONTROL_FETCH_REJECTED //cameraControlFetchRejecte
  },

  process ({ httpClient, getState, action }, dispatch, done) {
    return httpClient.get(`http://${getState().configuration.data.camera.streamingUrl}/${CAMERA_CONTROL_ENDPOINT}`,
      {
        params: {
          var: action.control,
          val: action.value
        }
      }
    ).then((resp) => {
      return dispatch(cameraControlFetchFulfilled(action.control, action.value));
    }).then(() => done());
  }
});

const cameraStatusFetchLogic = createLogic({
  type: CAMERA_STATUS_FETCH,
  cancelType: CAMERA_STATUS_FETCH_CANCEL,
  latest: true, // take latest only

  processOptions: {
    dispatchReturn: true,
    successType: cameraStatusFetchFulfilled, // CAMERA_STATUS_FETCH_FULFILLED, //
    failType: cameraStatusFetchRejected // CAMERA_STATUS_FETCH_REJECTED //cameraStatusFetchRejecte
  },

  process ({ httpClient, getState, action }, dispatch, done) {
    return httpClient.get(`http://${getState().configuration.data.camera.streamingUrl}/${CAMERA_STATUS_ENDPOINT}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((resp) => {
        return resp.data;
      });
  }
});

export default [
  cameraControlFetchLogic,
  cameraStatusFetchLogic
];
