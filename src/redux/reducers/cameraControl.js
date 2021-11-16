import {
  key,
  CAMERA_CONTROL_FETCH,
  CAMERA_CONTROL_FETCH_CANCEL,
  CAMERA_CONTROL_FETCH_FULFILLED,
  CAMERA_CONTROL_FETCH_REJECTED,
  CAMERA_STATUS_FETCH,
  CAMERA_STATUS_FETCH_FULFILLED,
  CAMERA_STATUS_FETCH_REJECTED,
  CAMERA_STATUS_FETCH_CANCEL
} from '../actions/cameraControl'

export const selectors = {
  data: state => state,
  fetchStatus: state => state.fetchStatus
};

const initialState = {
  data: {
    framesize: 0,
    quality: 10,
    brightness: 0,
    contrast: 0,
    saturation: 0,
    special_effect: 0,
    awb: 1,
    awb_gain: 1,
    wb_mode: 0,
    aec: 1,
    aec2: 0,
    ae_level: 0,
    agc: 1,
    gainceiling: 0,
    bpc: 0,
    wpc: 1,
    raw_gma: 1,
    lenc: 1,
    hmirror: 0,
    vflip: 0,
    dcw: 1,
    colorbar: 0,
    face_detect: 0,
    face_recognize: 0,
    flash: 0
  },
  fetchStatus: '',
  isFetching: false,
  lastUpdate: null
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case CAMERA_CONTROL_FETCH:
      return {
        ...state,
        isFetching: true,
        fetchStatus: `fetching... ${(new Date()).toLocaleString()}`
      };
    case CAMERA_CONTROL_FETCH_FULFILLED:
      return {
        ...state,
        data: {
          ...state.data,
          [action.control]: action.value
        },
        isFetching: false,
        fetchStatus: `Results from ${(new Date()).toLocaleString()}`,
        lastUpdate: new Date()
      };
    case CAMERA_CONTROL_FETCH_REJECTED:
      return {
        ...state,
        isFetching: false,
        fetchStatus: `errored: ${action.payload}`
      };
    case CAMERA_CONTROL_FETCH_CANCEL:
      return {
        ...state,
        isFetching: false,
        fetchStatus: 'user cancelled'
      };
    case CAMERA_STATUS_FETCH:
      return {
        ...state,
        isFetching: true,
        fetchStatus: `fetching... ${(new Date()).toLocaleString()}`
      };
    case CAMERA_STATUS_FETCH_FULFILLED:
      return {
        ...state,
        data: action.data,
        isFetching: false,
        fetchStatus: `Results from ${(new Date()).toLocaleString()}`,
        lastUpdate: new Date()
      };
    case CAMERA_STATUS_FETCH_REJECTED:
      return {
        ...state,
        isFetching: false,
        fetchStatus: `errored: ${action.payload}`
      };
    case CAMERA_STATUS_FETCH_CANCEL:
      return {
        ...state,
        isFetching: false,
        fetchStatus: 'user cancelled'
      };
    default:
      return state;
  }
}
