import {
  key,
  SERVER_STATE_BATTERY_FETCH_FULFILLED,
  SERVER_STATE_FETCH,
  SERVER_STATE_FETCH_CANCEL,
  SERVER_STATE_FETCH_FULFILLED,
  SERVER_STATE_FETCH_REJECTED,
  SERVER_STATE_WIFI_STRENGHT_FETCH_FULFILLED
} from '../actions/serverState';

export const selectors = {
  data: state => state,
  fetchStatus: state => state.fetchStatus
};

const initialState = {
  data: {
    network: {
      signalStrengh: null
    }
  },
  fetchStatus: '',
  isFetching: false,
  lastUpdate: null
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SERVER_STATE_FETCH:
      return {
        ...state,
        isFetching: true,
        fetchStatus: `fetching... ${(new Date()).toLocaleString()}`,
        data: null,
        lastUpdate: null
      };
    case SERVER_STATE_FETCH_FULFILLED:
      return {
        ...state,
        data: action.data,
        isFetching: false,
        fetchStatus: `Results from ${(new Date()).toLocaleString()}`,
        lastUpdate: action.lastUpdate
      };
    case SERVER_STATE_BATTERY_FETCH_FULFILLED:

      let ss = -100;
      if (state && state.data && state.data.network && state.data.network.signalStrengh) {
        ss = state.data.network.signalStrengh;
      }

      if (state && state.data && state.data.chip && state.data.chip.batteryVoltage) {
        return {
          ...state,
          data: {
            ...state.data, ...{ chip: { ...state.data.chip, ...{ batteryVoltage: action.voltage } } }
          },
          isFetching: false,
          fetchStatus: `Results from ${(new Date()).toLocaleString()}`,
          lastUpdate: action.lastUpdate
        };
      }
      return state;
    case SERVER_STATE_WIFI_STRENGHT_FETCH_FULFILLED:
      if (state && state.data && state.data.network ) {
        return {
          ...state,
          data: {
            ...state.data, ...{ network: { ...state.data.network, ...{ signalStrengh: action.signalStrengh } } }
          },
          isFetching: false,
          fetchStatus: `Results from ${(new Date()).toLocaleString()}`,
          lastUpdate: action.lastUpdate
        };
      }
      return state;
    case SERVER_STATE_FETCH_REJECTED:
      return {
        ...state,
        isFetching: false,
        fetchStatus: `errored: ${action.payload}`
      };
    case SERVER_STATE_FETCH_CANCEL:
      return {
        ...state,
        isFetching: false,
        fetchStatus: 'user cancelled'
      };
    default:
      return state;
  }
}
