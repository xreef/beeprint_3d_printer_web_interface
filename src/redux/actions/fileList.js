// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'fileList';

// action type constants
export const FILE_LIST_REQUEST = 'FILE_LIST_REQUEST';
export const FILE_LIST_START = 'FILE_LIST_START';
export const FILE_LIST_ERROR = 'FILE_LIST_ERROR';
export const FILE_LIST_END = 'FILE_LIST_END';
export const FILE_ADD = 'FILE_ADD';
export const FILE_DELETE = 'FILE_DELETE';

export const actionTypes = {
  FILE_LIST_REQUEST,
  FILE_LIST_START,
  FILE_LIST_ERROR,
  FILE_LIST_END,
  FILE_ADD,
  FILE_DELETE
};

// action creators
export const fileListRequest = (path = '') => ({
  type: FILE_LIST_REQUEST,
  path
});
export const fileListStart = () => ({ type: FILE_LIST_START });
export const fileListError = (err) => (
  {
    type: FILE_LIST_ERROR,
    err
  });
export const fileListEnd = () => ({ type: FILE_LIST_END });
export const fileAdd = (name) => (
  {
    type: FILE_ADD,
    name
  });
export const fileDelete = (name) => ({
  type: FILE_DELETE,
  name
});

export const actions = {
  fileListRequest,
  fileListStart,
  fileListError,
  fileListEnd,
  fileAdd,
  fileDelete
};
