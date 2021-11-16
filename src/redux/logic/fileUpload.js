import { createLogic } from 'redux-logic';

import { MICROCONTROLLER_ADRESS, FILE_UPLOAD_ENDPOINT } from '../config';

import { selectors as fileListSelector } from '../reducers/fileList';

import {
  FILE_UPLOAD_POST, FILE_UPLOAD_POST_CANCEL, FILE_UPLOAD_POST_REJECTED, FILE_UPLOAD_POST_FULFILLED
} from '../actions/fileUpload';
import {
  fileUploadPostFulfilled,
  fileUploadPostRejected,
  fileReaderProgress,
  fileUploadProgress, addNotification, fileListRequest, webSocketSendMessage
} from '../actions';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import { selectAndPrint } from '../additions/commands';

const delay = 10; // 4s delay for interactive use of cancel/take latest

const fileUploadPostLogic = createLogic({
  type: FILE_UPLOAD_POST,
  cancelType: FILE_UPLOAD_POST_CANCEL,
  latest: true, // take latest only

  // processOptions: {
  //   dispatchReturn: true,
  //   successType: fileUploadPostFulfilled, // FILE_UPLOAD_POST_FULFILLED, //
  //   failType: fileUploadPostRejected // FILE_UPLOAD_POST_REJECTED //fileUploadPostRejecte
  // },
  //
  process ({
    httpClient, getState, action, cancelled$
  }, dispatch, done) {
    const handleFileReaderProgress = frEvent => {
      console.log(frEvent.loaded, frEvent.total);
      dispatch(fileReaderProgress(frEvent.loaded, frEvent.total));
    };

    const handleFileUploadProgress = fuProgress => {
      console.log(fuProgress.loaded, fuProgress.total);
      dispatch(fileUploadProgress(fuProgress.loaded, fuProgress.total));
    };
    const config = {
      headers: {
        'Content-Type': 'text/xml'
        // 'Access-Control-Allow-Headers': '*',
        // 'Access-Control-Allow-Origin': '*'
      },
      onUploadProgress: handleFileUploadProgress
    };

    const handleFileRead = e => {
      const content = fileReader.result;
      console.log(content);

      const url = `http://${MICROCONTROLLER_ADRESS}/${FILE_UPLOAD_ENDPOINT}?X-Filename=${action.fileName}&timestamp=${new Date().getTime()}`;
      return httpClient.post(url, content, config)
        .then((resp) => {
          const data = resp.data;
          // eslint-disable-next-line eqeqeq

          if (data && data.err === 0) {
            dispatch(fileUploadPostFulfilled(data, new Date()));
            dispatch(addNotification({ message: <FormattedMessage id="upload.success" values={{ filename: action.fileName }} />, variant: 'success', autoHide: true, autoHideDuration: 2000 }));
            // dispatch(fileListRequest(fileListSelector.path(getState())));
            //
            // if (action.printNow) {
            //   dispatch(webSocketSendMessage(selectAndPrint(action.fileName)));
            // }
          } else {
            dispatch(fileUploadPostRejected(data.err));
            dispatch(addNotification({ message: <FormattedMessage id="upload.failure" values={{ filename: action.fileName, err: data.err }} />, variant: 'error', autoHide: false }));
          }
        })
        .catch(err => {
          dispatch(fileUploadPostRejected(err));
          dispatch(addNotification({ message: <FormattedMessage id="upload.failure" values={{ filename: action.fileName, err: err }} />, variant: 'error', autoHide: false }));
        }).then(() => done());
    };

    const fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.onprogress = handleFileReaderProgress;
    fileReader.onerror = (err) => {
      dispatch(fileUploadPostRejected(err));
      dispatch(addNotification({ message: <FormattedMessage id="upload.failure" values={{ filename: action.fileName, err: err }} />, variant: 'error', autoHide: false }));
    };
    try {
      fileReader.readAsBinaryString(action.file);
    } catch (err) {
      dispatch(fileUploadPostRejected(err.message));
      dispatch(addNotification({ message: <FormattedMessage id="upload.failure" values={{ filename: action.fileName, err: err.message }} />, variant: 'error', autoHide: false }));
    }
  }
});

export default [
  fileUploadPostLogic
];
