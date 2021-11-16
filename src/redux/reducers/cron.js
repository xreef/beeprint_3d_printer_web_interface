import {
  key, CRON_START, CRON_CANCEL, CRON_RESET, CRON_END,
  CRON_EXECUTION, CRON_START_ERROR
} from '../actions/cron';

export const selectors = {
  value: state => state[key].value,
  status: state => state[key].status
};

const initialState = {
  value: 1,
  status: 'stopped'
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case CRON_START:
      return {
        ...state,
        status: 'started'
      };
    case CRON_CANCEL:
      return {
        ...state,
        status: 'stopped'
      };
    case CRON_RESET:
      return {
        ...state,
        status: 'stopped',
        value: 10
      };
    case CRON_END:
      return {
        ...state,
        status: 'ended'
      };
    case CRON_EXECUTION:
      return {
        ...state,
        value: state.value + 1
      };
    case CRON_START_ERROR:
      return {
        ...state,
        status: action.payload.message
      };
    default:
      return state;
  }
}
