
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'storagePage';

// action type constants
export const STORAGE_PAGE_SET_LAYOUTS = 'STORAGE_PAGE_SET_LAYOUTS';

export const actionTypes = {
  STORAGE_PAGE_SET_LAYOUTS
};

// action creators
export const setStoragePageLayout = layouts => ({
  type: STORAGE_PAGE_SET_LAYOUTS,
  layouts
});

export const actions = {
  setStoragePageLayout
};
