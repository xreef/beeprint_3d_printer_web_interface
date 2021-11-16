
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'printerStats';

// action type constants
export const PRINTER_STATS_SET_LAYOUTS = 'PRINTER_STATS_SET_LAYOUTS';

export const actionTypes = {
  PRINTER_STATS_SET_LAYOUTS
};

// action creators
export const setPrinterStatsLayout = layouts => ({
  type: PRINTER_STATS_SET_LAYOUTS,
  layouts
});

export const actions = {
  setPrinterStatsLayout
};
