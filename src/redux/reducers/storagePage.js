import {
  key, STORAGE_PAGE_SET_LAYOUTS
} from '../actions/storagePage';

export const selectors = {
  layouts: state => state.storagePage.layouts
};

const initialState = {
  layouts: {
    lg: [], md: [], sm: [], xs: [], xxs: []
  }
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case STORAGE_PAGE_SET_LAYOUTS:
      return {
        ...state,
        layouts: action.layouts
      };
    default:
      return state;
  }
}
