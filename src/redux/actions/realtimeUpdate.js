
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version

export const key = 'realtimeUpdate';

// action type constants
export const WEB_SOCKET_OPEN = 'WEB_SOCKET_OPEN';
export const WEB_SOCKET_CONNECT = 'WEB_SOCKET_CONNECT';
export const WEB_SOCKET_DISCONNECT = 'WEB_SOCKET_DISCONNECT';
export const WEB_SOCKET_CLOSE = 'WEB_SOCKET_CLOSE';
export const WEB_SOCKET_ERROR = 'WEB_SOCKET_ERROR';
export const WEB_SOCKET_MESSAGE = 'WEB_SOCKET_MESSAGE';
export const WEB_SOCKET_SEND_MESSAGE = 'WEB_SOCKET_SEND_MESSAGE';

export const WEB_SOCKET_FILE_STREAM_MESSAGE = 'WEB_SOCKET_FILE_STREAM_MESSAGE';

export const actionTypes = {
  open: WEB_SOCKET_OPEN,
  connect: WEB_SOCKET_CONNECT,
  disconnect: WEB_SOCKET_DISCONNECT,
  close: WEB_SOCKET_CLOSE,
  error: WEB_SOCKET_ERROR,
  message: WEB_SOCKET_MESSAGE,
  sendMessage: WEB_SOCKET_SEND_MESSAGE,
  fileStreamMessage: WEB_SOCKET_FILE_STREAM_MESSAGE
};

// action creators
export const webSocketOpen = () => ({
  type: WEB_SOCKET_OPEN
});
// action creators
export const webSocketConnect = () => ({
  type: WEB_SOCKET_CONNECT
});
// action creators
export const webSocketDisconnect = () => ({
  type: WEB_SOCKET_DISCONNECT
});
export const webSocketClose = () => ({
  type: WEB_SOCKET_CLOSE
});
export const webSocketError = event => ({
  type: WEB_SOCKET_ERROR,
  error: event
});
export const webSocketMessage = payload => ({
  type: WEB_SOCKET_MESSAGE,
  message: payload
});
export const webSocketSendMessage = message => ({
  type: WEB_SOCKET_SEND_MESSAGE,
  message
});
export const fileStreamMessages = enable => ({
  type: WEB_SOCKET_FILE_STREAM_MESSAGE,
  enable
});

export const actions = {
  webSocketOpen,
  webSocketConnect,
  webSocketDisconnect,
  webSocketClose,
  webSocketError,
  webSocketMessage,
  webSocketSendMessage,
  fileStreamMessages
};
