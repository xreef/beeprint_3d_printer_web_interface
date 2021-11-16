
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'fileUpload';

// action type constants
export const FILE_UPLOAD_POST = 'FILE_UPLOAD_POST';
export const FILE_UPLOAD_POST_CANCEL = 'FILE_UPLOAD_POST_CANCEL';
export const FILE_UPLOAD_POST_FULFILLED = 'FILE_UPLOAD_POST_FULFILLED';
export const FILE_UPLOAD_POST_REJECTED = 'FILE_UPLOAD_POST_REJECTED';
export const FILE_UPLOAD_PROGRESS = 'FILE_UPLOAD_PROGRESS';
export const FILE_READER_PROGRESS = 'FILE_READER_PROGRESS';

export const actionTypes = {
  FILE_UPLOAD_POST,
  FILE_UPLOAD_POST_CANCEL,
  FILE_UPLOAD_POST_FULFILLED,
  FILE_UPLOAD_POST_REJECTED,
  FILE_UPLOAD_PROGRESS,
  FILE_READER_PROGRESS
};

// action creators
export const fileUploadPost = (file, fileName, print) => ({
  type: FILE_UPLOAD_POST,
  file,
  fileName,
  printNow: print
});
export const fileUploadPostCancel = () => (
  {
    type: FILE_UPLOAD_POST_CANCEL
  }
);
export const fileUploadPostFulfilled = (data, lastUpdate) => ({
  type: FILE_UPLOAD_POST_FULFILLED,
  data: data,
  lastUpdate: lastUpdate
});

export const fileUploadPostRejected = err => ({
  type: FILE_UPLOAD_POST_REJECTED,
  err,
  error: true
});

export const fileUploadProgress = (progress, total) => ({
  type: FILE_UPLOAD_PROGRESS,
  fileUploadProgress: progress,
  fileUploadTotal: total
});

export const fileReaderProgress = (progress, total) => ({
  type: FILE_READER_PROGRESS,
  fileReaderProgress: progress,
  fileReaderTotal: total
});

export const actions = {
  fileUploadPost,
  fileUploadPostCancel,
  fileUploadPostFulfilled,
  fileUploadPostRejected,
  fileUploadProgress,
  fileReaderProgress
};
