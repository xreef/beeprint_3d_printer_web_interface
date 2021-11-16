export const key = 'notifications';

// action type constants
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const SHIFT_NOTIFICATION = 'SHIFT_NOTIFICATION';
export const GET_CURRENT_NOTIFICATION = 'GET_CURRENT_NOTIFICATION';

export const actionTypes = {
  ADD_NOTIFICATION,
  SHIFT_NOTIFICATION,
  GET_CURRENT_NOTIFICATION
};

export const addNotification = notification => ({
  type: ADD_NOTIFICATION,
  notification
});

export const shiftNotification = () => ({
  type: SHIFT_NOTIFICATION
});

export const getCurrentNotification = () => ({
  type: GET_CURRENT_NOTIFICATION
});
