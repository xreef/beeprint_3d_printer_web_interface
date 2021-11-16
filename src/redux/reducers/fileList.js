import {
  key,
  FILE_LIST_REQUEST,
  FILE_LIST_START,
  FILE_LIST_ERROR,
  FILE_LIST_END,
  FILE_ADD,
  FILE_DELETE
} from '../actions/fileList';

import guid from '../../utils/math/guid';

export const selectors = {
  fileStreamStarted: state => state[key].isStartedFileStream,
  list: state => state[key].files,
  map: state => state[key].filesMap,
  file: (state, fileName) => state[key].filesMap[fileName],
  path: state => state[key].currentPath,
};

const initialState = {
  isStartedFileStream: false,
  error: false,
  errorMessage: undefined,
  files: [],
  filesMap: {},
  lastUpdate: null,
  currentPath: ''
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FILE_LIST_REQUEST:
      return {
        ...state,
        currentPath: action.path
      };
    case FILE_LIST_START:
      return {
        ...state,
        isStartedFileStream: true,
        error: false,
        errorMessage: undefined,
        files: [],
        filesMap: {}
      };
    case FILE_LIST_END:
      return {
        ...state,
        isStartedFileStream: false,
        lastUpdate: new Date()
      };
    case FILE_ADD:
      let file = {};
      if (action.name.indexOf('.DIR') >= 0) {
        file = { name: action.name.substr(0, action.name.length - 5).trim(), dir: true };
      } else {
        file = { name: action.name.substr(0, action.name.length - 1).trim(), dir: false };
      }
      return {
        ...state,
        files: [...state.files, file],
        filesMap: { ...state.filesMap, [file.name]: file }
      };
    case FILE_DELETE:
      return {
        ...state,
        files: state.files.filter(item => item.name !== action.name),
        filesMap: { ...state.filesMap, [action.name]: undefined }
      };
    case FILE_LIST_ERROR:
      return {
        ...state,
        errorMessage: action.message,
        error: true,
        isStartedFileStream: false
      };
    default:
      return state;
  }
}
