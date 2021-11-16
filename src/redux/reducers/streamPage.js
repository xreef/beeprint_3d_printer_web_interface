import {
  key, STREAM_PAGE_SET_LAYOUTS
} from '../actions/streamPage';

export const selectors = {
  layouts: state => state.streamPage.layouts
};

const initialState = {
  layouts: {
    lg: [], md: [], sm: [], xs: [], xxs: []
  }
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case STREAM_PAGE_SET_LAYOUTS:
      return {
        ...state,
        layouts: action.layouts
      };
    default:
      return state;
  }
}
