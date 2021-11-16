import {
  key, PRINTER_STATS_SET_LAYOUTS
} from '../actions/printerStats';
import { TEMPERATURE_SET_VALUES } from '../actions/temperatures';

export const selectors = {
  layouts: state => state.printerStats.layouts
};

const initialState = {
  '@': 0,
  B: 0,
  'B@': 0,
  T: 0,
  T0: 0,
  T1: 0,
  '@Target': 0,
  BTarget: 0,
  'B@Target': 0,
  TTarget: 0,
  T0Target: 0,
  T1Target: 0,
  lastUpdate: null,
  type: 'TEMP',
  historicalValues: []
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case TEMPERATURE_SET_VALUES:
      return {
        ...state,
        ...action.temperatureValues,
        historicalValues: [...state.historicalValues, { ...action.temperatureValues, dateValue: new Date() }],
        lastUpdate: new Date()
      };
    default:
      return state;
  }
}
