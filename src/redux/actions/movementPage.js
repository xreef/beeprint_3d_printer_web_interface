
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'movementPage';

// action type constants
export const MOVEMENT_PAGE_SET_LAYOUTS = 'MOVEMENT_PAGE_SET_LAYOUTS';

export const actionTypes = {
  MOVEMENT_PAGE_SET_LAYOUTS
};

// action creators
export const setMovementPageLayout = layouts => ({
  type: MOVEMENT_PAGE_SET_LAYOUTS,
  layouts
});

export const actions = {
  setMovementPageLayout
};
