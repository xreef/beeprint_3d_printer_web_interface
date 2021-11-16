import {
  key,
  WEB_SOCKET_OPEN,
  WEB_SOCKET_CLOSE,
  WEB_SOCKET_ERROR,
  WEB_SOCKET_MESSAGE,
  WEB_SOCKET_SEND_MESSAGE, WEB_SOCKET_CONNECT, WEB_SOCKET_DISCONNECT, WEB_SOCKET_FILE_STREAM_MESSAGE
} from '../actions/realtimeUpdate';

export const selectors = {
  isConnected: state => state[key].isConnected
};

const initialState = {
  messages: [],
  isConnected: false,
  lastUpdate: null,
  fileStream: {
    enabled: false
  }
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case WEB_SOCKET_CONNECT:
      return {
        ...state,
        isConnected: true
      };
    case WEB_SOCKET_DISCONNECT:
      return {
        ...state,
        isConnected: false
      };
    case WEB_SOCKET_ERROR:
      return {
        ...state,
        error: action.error
      };
    case WEB_SOCKET_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    case WEB_SOCKET_SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message]
      };
    case WEB_SOCKET_FILE_STREAM_MESSAGE:
      return {
        ...state,
        ...{ fileStream: { ...state.fileStream, enabled: action.enabled } }
      };
    default:
      return state;
  }
}
