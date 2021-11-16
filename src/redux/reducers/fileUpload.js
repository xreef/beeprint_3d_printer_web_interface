import {
  key,
  FILE_UPLOAD_POST,
  FILE_UPLOAD_POST_CANCEL,
  FILE_UPLOAD_POST_FULFILLED,
  FILE_UPLOAD_POST_REJECTED, FILE_UPLOAD_PROGRESS, FILE_READER_PROGRESS
} from '../actions/fileUpload';

export const selectors = {

};

const initialState = {
  data: null,
  fetchStatus: '',
  isFetching: false,
  lastUpdate: null,
  progress: {
    fileReaderProgress: 0,
    fileUploadProgress: 0,
    fileReaderTotal: 0,
    fileUploadTotal: 0
  }
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FILE_UPLOAD_POST:
      return {
        ...state,
        isFetching: true,
        fetchStatus: `fetching... ${(new Date()).toLocaleString()}`,
        data: null,
        lastUpdate: null,
        progress: {
          fileReaderProgress: 0,
          fileUploadProgress: 0,
          fileReaderTotal: 0,
          fileUploadTotal: 0
        }
      };
    case FILE_UPLOAD_POST_FULFILLED:
      return {
        ...state,
        data: action.data,
        isFetching: false,
        fetchStatus: `Results from ${(new Date()).toLocaleString()}`,
        lastUpdate: action.lastUpdate
      };
    case FILE_UPLOAD_POST_REJECTED:
      return {
        ...state,
        isFetching: false,
        fetchStatus: `errored: ${action.payload}`
      };
    case FILE_UPLOAD_POST_CANCEL:
      return {
        ...state,
        isFetching: false,
        fetchStatus: 'user cancelled'
      };
    case FILE_UPLOAD_PROGRESS:
      return {
        ...state,
        progress: {
          ...state.progress,
          fileUploadProgress: action.fileUploadProgress,
          fileUploadTotal: action.fileUploadTotal
        }
      };
    case FILE_READER_PROGRESS:
      return {
        ...state,
        progress: {
          ...state.progress,
          fileReaderProgress: action.fileReaderProgress,
          fileReaderTotal: action.fileReaderTotal
        }
      };
    default:
      return state;
  }
}
