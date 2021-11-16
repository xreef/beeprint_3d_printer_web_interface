
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'printingPage';

// action type constants
export const PRINTING_PAGE_SET_LAYOUTS = 'PRINTING_PAGE_SET_LAYOUTS';

export const actionTypes = {
  PRINTING_PAGE_SET_LAYOUTS
};

// action creators
export const setPrintingPageLayout = layouts => ({
  type: PRINTING_PAGE_SET_LAYOUTS,
  layouts
});

export const actions = {
  setPrintingPageLayout
};
