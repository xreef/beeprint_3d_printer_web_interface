// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'temperatures';

// action type constants
export const TEMPERATURE_SET_VALUES = 'TEMPERATURE_SET_VALUES';

export const actionTypes = {
  TEMPERATURE_SET_VALUES
};

// action creators
export const setTemperatureValues = temperatureValues => ({
  type: TEMPERATURE_SET_VALUES,
  temperatureValues
});

export const actions = {
  setTemperatureValues
};
