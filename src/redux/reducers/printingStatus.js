import {
  key, PRINTING_STATUS_SET_VALUES,
  PRINTING_STATUS_REQUEST_VALUES,
  PRINTING_PROGRESS_PERCENTAGE_SET_VALUES,
  PRINTING_SET_PRINTING_FILE_INFO,
  PRINTING_SET_PRINTING_TIME,
  PRINTING_STATUS_SUBSCRIBE,
  PRINTING_STATUS_UNSUBSCRIBE
} from '../actions/printingStatus';

export const selectors = {
  isRequestEnabled: state => state[key].printingStatusSubscribed > 0
};

const initialState = {
  printingStatus: 'WAITING',
  printingStatusSubscribed: 0,
  printing: {
    progressPercentage: 0,
    file: '',
    size: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  }
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case PRINTING_STATUS_SET_VALUES:
      return {
        ...state,
        ...action.printingStatusValues,
        lastUpdate: new Date()
      };
    case PRINTING_PROGRESS_PERCENTAGE_SET_VALUES:
      return {
        ...state,
        printing: {
          ...state.printing,
          progressPercentage: action.progressPercentage
        },
        lastUpdate: new Date()
      };
    case PRINTING_SET_PRINTING_FILE_INFO:
      return {
        ...state,
        printing: {
          ...state.printing,
          file: action.file,
          size: action.size
        },
        lastUpdate: new Date()
      };
    case PRINTING_SET_PRINTING_TIME:
      return {
        ...state,
        printing: {
          ...state.printing,
          hours: action.hours,
          minutes: action.minutes,
          seconds: action.seconds
        },
        lastUpdate: new Date()
      };
    case PRINTING_STATUS_SUBSCRIBE:
      return {
        ...state,
        printingStatusSubscribed: state.printingStatusSubscribed + 1
      };
    case PRINTING_STATUS_UNSUBSCRIBE:
      return {
        ...state,
        printingStatusSubscribed: (state.printingStatusSubscribed - 1) < 0 ? 0 : state.printingStatusSubscribed - 1
      };
    default:
      return state;
  }
}
