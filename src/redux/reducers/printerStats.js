import {
  key, PRINTER_STATS_SET_LAYOUTS
} from '../actions/printerStats';

export const selectors = {
  layouts: state => state.printerStats.layouts
};

const initialState = {
  layouts: {
    lg: [], md: [], sm: [], xs: [], xxs: [],
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PRINTER_STATS_SET_LAYOUTS:
      return {
        ...state,
        layouts: action.layouts
      };
    default:
      return state;
  }
}
