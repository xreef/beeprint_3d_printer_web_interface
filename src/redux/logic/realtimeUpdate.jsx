import { FormattedMessage, useIntl } from 'react-intl';

import { createLogic } from 'redux-logic';
import React from 'react';

import { timer } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { selectors as fileListSelectors } from '../reducers/fileList';

import {
  switchMap, retryWhen, filter, tap, map, takeUntil
} from 'rxjs/operators';
// import moment from 'moment';
import {
  WEB_SOCKET_CLOSE, WEB_SOCKET_OPEN, WEB_SOCKET_DISCONNECT, webSocketError, webSocketMessage, WEB_SOCKET_SEND_MESSAGE, WEB_SOCKET_ERROR, WEB_SOCKET_CONNECT
} from '../actions/realtimeUpdate';
// import {
//   productionTotalsFetchFulfilled
// } from '../actions/productionTotals';
//
// import {
//   serverStateBatteryFetchFulfilled,
//   serverStateWIFIStrenghtFetchFulfilled
// } from '../actions/serverState';
//
// import {
//   setPowerRealTime
// } from '../actions/realtimeData';

import { MICROCONTROLLER_WS_ADRESS } from '../config';
import {
  addNotification,
  fileAdd, fileListEnd, fileListStart,
  setPrintingStatusValues,
  setTemperatureValues,
  setProgressPercentageValues,
  setPrintingFileInfo,
  setPrintingTime,
  serverStateWIFIStrenghtFetchFulfilled
} from '../actions';
import { cronEnd, cronStart } from '../actions/cron';

// const wsListenLogic = createLogic({
//   type: WEB_SOCKET_OPEN,
//   cancelType: WEB_SOCKET_CLOSE,
//   latest: true, // take latest only
//   warnTimeout: 0, // long running logic
//
//   process({
//     httpClient, getState, action$, cancelled$
//   }, dispatch, done) {
//     debugger
//     const wsSubject$ = webSocket(MICROCONTROLLER_WS_ADRESS);
//
//     wsSubject$.subscribe(
//       msg => {
//         webSocketMessage(msg);
//       },
//       err => {
//         webSocketError(err);
//       }, // Called if at any point WebSocket API signals some kind of error.
//       () => {
//         return WEB_SOCKET_CLOSE
//       } // Called when connection is closed (for whatever reason).
//     );
//
//
//     // send current inputMsg on sendMsg action
//     wsSubject$
//       .pipe(
//         filter(action => action.type === WEB_SOCKET_SEND_MESSAGE),
//         tap(x => wsSubject$.next(getState().messageToSend)),
//         takeUntil(cancelled$)
//       )
//       .subscribe();
//
//     // wsSubject$.subscribe();
//     // dispatch msgReceived with payload from server
//     // on any incoming messages
//     // returning obs subscribes to it
//     return wsSubject$.pipe(map(x => webSocketMessage(x)));
//   }
// });

const wsListenLogic = createLogic({
  type: WEB_SOCKET_OPEN,
  cancelType: WEB_SOCKET_CLOSE,
  latest: true, // take latest only
  warnTimeout: 0, // long running logic

  processOptions: {
    failType: WEB_SOCKET_ERROR
  },

  process ({
    httpClient, getState, action$, cancelled$
  }, dispatch, done) {
    const wsSubject$ = webSocket({
      deserializer: function (e) {
        const messageJson = {};

        if (e.data.startsWith('Begin file list')) {
          messageJson.type = 'FILE_LIST';
          messageJson.start = true;
          messageJson.enabled = true;
        } else if (e.data.startsWith('End file list')) {
          messageJson.type = 'FILE_LIST';
          messageJson.end = true;
          messageJson.enabled = false;
        } else if (fileListSelectors.fileStreamStarted(getState())) {
          messageJson.type = 'FILE_LIST';
          messageJson.name = e.data;
        } else if (e.data.startsWith('WIFI:')) {
          messageJson.type = 'WIFI';
          messageJson.signalStrengh = parseInt(e.data.substr(5, e.data.length-7));
          messageJson.lastUpdate = new Date();
        } else if (e.data.startsWith('T:')) {
          // const basicToken = e.data.substr(0, e.data.length - 2).split(' /0 ');
          //
          // const lastTok = basicToken[basicToken.length - 1].split(' ');
          // basicToken.pop();
          // basicToken.push(lastTok[0]);
          // basicToken.push(lastTok[1]);
          const basicToken = e.data.substr(0, e.data.length - 2).split(/(?:\/0| )+/);

          for (let i = 0; i < basicToken.length; i++) {
            if (basicToken[i].indexOf('/') < 0) {
              const tokensValue = basicToken[i].split(':');
              let tokensTarget = 0;
              if (i < basicToken.length - 2 && basicToken[i + 1].indexOf('/') >= 0) {
                tokensTarget = parseFloat(basicToken[i + 1].substr(1, basicToken[i + 1].length));
              }
              messageJson[tokensValue[0]] = parseFloat(tokensValue[1] || 0);
              messageJson[tokensValue[0] + 'Target'] = tokensTarget || 0;

              if (tokensValue[0] === 'T0') messageJson[tokensValue[0]] = parseFloat(tokensValue[1] || 0);
            }
          }
          messageJson.type = 'TEMP';
        } else if (e.data.startsWith('M998')) {
          messageJson.status = 'ok';
          messageJson.type = 'RESPONSE';
        } else if (e.data.startsWith('M997')) {
          messageJson.printingStatus = e.data.substr(5, e.data.length - (7));
          messageJson.type = 'PRINTING_STATUS';
        } else if (e.data.startsWith('M27')) {
          messageJson.percentage = parseInt(e.data.substr(4, e.data.length - (4 + 2)));
          messageJson.type = 'ELAPSED_PERCENTAGE';
        } else if (e.data.startsWith('M992')) {
          const timeVal = e.data.substr(5, e.data.length - (5 + 2));
          messageJson.elapsedTime = timeVal;
          const values = timeVal.split(':');
          messageJson.h = parseInt(values[0]);
          messageJson.m = parseInt(values[1]);
          messageJson.s = parseInt(values[2]);
          messageJson.type = 'ELAPSED_TIME';
        } else if (e.data.startsWith('M994')) {
          const fileInfo = e.data.substr(5, e.data.length - (5 + 2));
          const values = fileInfo.split(';');

          messageJson.fileName = (values[0].indexOf('1:') >= 0) ? values[0].substr(2, values[0].length) : values[0];
          messageJson.fileSize = parseFloat(values[1] || 0);

          messageJson.type = 'PRINTING_FILE';
        } else if (e.data.startsWith('M115')) {
          const firmware = e.data.substr(5, e.data.length - (5 + 2));
          const values = firmware.split(':');

          messageJson.firmware = values[1];
        } else {
          messageJson.message = e.data;
        }
        return messageJson;
      },
      serializer: function (value) { return value; },
      url: MICROCONTROLLER_WS_ADRESS,
      openObserver: {
        next: () => {
          dispatch({ type: WEB_SOCKET_CONNECT });
          dispatch(addNotification({ message: <FormattedMessage id="websocket.open" />, variant: 'info' }));
          dispatch(cronStart());
        }
      },
      closeObserver: {
        next: () => {
          dispatch(cronEnd());
          dispatch({ type: WEB_SOCKET_DISCONNECT });
          dispatch(addNotification({ message: <FormattedMessage id="websocket.close" />, variant: 'error' }));
        }
      }
    });

    // send message on WS_MSG_SEND action
    action$
      .pipe(
        filter(action => action.type === WEB_SOCKET_SEND_MESSAGE),
        tap(action => {
          wsSubject$.next(action.message);
        }),
        takeUntil(cancelled$)
      ).subscribe();

    // dispatch msgReceived with payload from server
    // on any incoming messages
    // returning obs subscribes to it
    return wsSubject$.pipe(
      map((msg) => {
        dispatch(webSocketMessage(msg));

        if (fileListSelectors.fileStreamStarted(getState())) {
          if (msg.end) {
            dispatch(fileListEnd());
          } else {
            dispatch(fileAdd(msg.name));
          }
        } else if (msg.type === 'FILE_LIST') {
          if (msg.start) dispatch(fileListStart());
        } else if (msg.type === 'TEMP') {
          dispatch(setTemperatureValues(msg));
        } else if (msg.type === 'PRINTING_STATUS') {
          dispatch(setPrintingStatusValues(msg));
        } else if (msg.type === 'ELAPSED_PERCENTAGE') {
          dispatch(setProgressPercentageValues(msg.percentage));
        } else if (msg.type === 'PRINTING_FILE') {
          dispatch(setPrintingFileInfo(msg.fileName, msg.fileSize));
        } else if (msg.type === 'ELAPSED_TIME') {
          dispatch(setPrintingTime(msg.h, msg.m, msg.s));
        } else if (msg.type === 'WIFI') {
          dispatch(serverStateWIFIStrenghtFetchFulfilled(msg));
        }

        // if (msg.type === 'cumulated') {
        //   const resp = { ...msg.value };
        //   resp.lastUpdate = new Date(moment(resp.lastUpdate, 'DD/MM/YYYY HH:mm:ss').valueOf());
        //   resp.energyLifetime = parseInt(resp.energyLifetime);
        //   resp.energyYearly = parseInt(resp.energyYearly);
        //   resp.energyMonthly = parseInt(resp.energyMonthly);
        //   resp.energyWeekly = parseInt(resp.energyWeekly);
        //   resp.energyDaily = parseInt(resp.energyDaily);
        //   dispatch(productionTotalsFetchFulfilled(resp));
        // } else if (msg.type === 'error') {
        //   // debugger;
        //   const resp = { ...msg.value };
        //   resp.fixedTime = (resp.fixedTime) ? 'OK' : 'KO';
        //   resp.sdStarted = (resp.sdStarted) ? 'OK' : 'KO';
        //   resp.wifiConnected = (resp.wifiConnected) ? 'OK' : 'KO';
        //   resp.isFileSaveOK = (resp.isFileSaveOK) ? 'OK' : 'KO';
        //
        //   resp.hStr = moment(msg.date, 'DD/MM/YYYY HH:mm:ss').format('lll');
        //
        //   dispatch(addNotification({ message: <FormattedMessage id="websocket.centraline.message.error" values={{ ...resp }} />, variant: 'error', autoHide: false }));
        // } else if (msg.type === 'error_inverter') {
        //   // debugger;
        //   const resp = { ...msg.value };
        //   resp.hStr = moment(msg.date, 'DD/MM/YYYY HH:mm:ss').format('lll');
        //   resp.lastUpdate = new Date(moment(msg.date, 'DD/MM/YYYY HH:mm:ss'));
        //
        //   const updated = {
        //     alarmStateParam: resp.asp,
        //     alarmState: resp.alarm,
        //     channel1StateParam: resp.c1sp,
        //     channel1State: resp.ch1state,
        //     channel2StateParam: resp.c2sp,
        //     channel2State: resp.ch2state,
        //     inverterStateParam: resp.isp,
        //     inverterState: resp.state
        //   };
        //   dispatch(addNotification({ message: <FormattedMessage id="websocket.inverter.message.error" values={{ ...resp }} />, variant: ((resp.inverterProblem) ? 'error' : 'warning'), autoHide: false }));
        //   dispatch(inverterAlarmsFetchFulfilled({ data: updated, lastUpdate: resp.lastUpdate }));
        // } else if (msg.type === 'power_rt') {
        //   let resp = {};
        //   resp.value = parseFloat(msg.value);
        //   resp.lastUpdate = new Date(moment(msg.date, 'DD/MM/YYYY HH:mm:ss'));
        //
        //   dispatch(setPowerRealTime(resp));
        // } else if (msg.type === 'bat_rt') {
        //   const resp = {};
        //   resp.voltage = parseFloat(msg.value);
        //   resp.lastUpdate = new Date(moment(msg.date, 'DD/MM/YYYY HH:mm:ss'));
        //
        //   dispatch(serverStateBatteryFetchFulfilled(resp));
        // } else if (msg.type === 'wifi_rt') {
        //   const resp = {};
        //   resp.signalStrengh = parseInt(msg.value);
        //   resp.lastUpdate = new Date(moment(msg.date, 'DD/MM/YYYY HH:mm:ss'));
        //
        //   dispatch(serverStateWIFIStrenghtFetchFulfilled(resp));
        // }
      }),
      retryWhen(errors => errors.pipe(
        tap((err) => {
          dispatch(webSocketError(err));
          console.error(err);
          // dispatch(addNotification({ message: <FormattedMessage id="websocket.error" />, variant: 'error', autoHide: false }));
        }),
        switchMap(err => timer(1000))
      ))
    ).subscribe();
  }
});
export default [
  wsListenLogic
];
