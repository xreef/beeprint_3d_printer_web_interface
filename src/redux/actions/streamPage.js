
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'streamPage';

// action type constants
export const STREAM_PAGE_SET_LAYOUTS = 'STREAM_PAGE_SET_LAYOUTS';

export const actionTypes = {
  STREAM_PAGE_SET_LAYOUTS
};

// action creators
export const setStreamPageLayout = layouts => ({
  type: STREAM_PAGE_SET_LAYOUTS,
  layouts
});

export const actions = {
  setStreamPageLayout
};
