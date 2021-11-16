import {
  key, PRINTING_PAGE_SET_LAYOUTS
} from '../actions/printingPage';

export const selectors = {
  layouts: state => state.printingPage.layouts
};

const initialState = {
  layouts: {
    lg: [], md: [], sm: [], xs: [], xxs: []
  }
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case PRINTING_PAGE_SET_LAYOUTS:
      return {
        ...state,
        layouts: action.layouts
      };
    default:
      return state;
  }
}
