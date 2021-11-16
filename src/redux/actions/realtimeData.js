export const key = 'realtimeData';

// action type constants
export const SET_POWER_RT = 'SET_POWER_RT';

export const actionTypes = {
  SET_POWER_RT
};

export const setPowerRealTime = data => ({
  type: SET_POWER_RT,
  data
});
