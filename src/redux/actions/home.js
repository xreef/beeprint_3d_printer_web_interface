
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'home';

// action type constants
export const HOME_SET_LAYOUTS = 'HOME_SET_LAYOUTS';
export const HOME_ADD_ELEMENT = 'HOME_ADD_ELEMENT';
export const HOME_REMOVE_ELEMENT = 'HOME_REMOVE_ELEMENT';

export const actionTypes = {
  HOME_SET_LAYOUTS,
  HOME_ADD_ELEMENT,
  HOME_REMOVE_ELEMENT
};

// action creators
export const setHomeLayout = layouts => ({
  type: HOME_SET_LAYOUTS,
  layouts
});

export const addElementToHome = element => ({
  type: HOME_ADD_ELEMENT,
  element
});

export const removeElementFromHome = element => ({
  type: HOME_REMOVE_ELEMENT,
  element
});

export const actions = {
  setHomeLayout,
  addElementToHome,
  removeElementFromHome
};
