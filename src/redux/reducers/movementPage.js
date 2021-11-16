import {
  key, MOVEMENT_PAGE_SET_LAYOUTS
} from '../actions/movementPage';

export const selectors = {
  layouts: state => state.movementPage.layouts
};

const initialState = {
  layouts: {
    lg: [], md: [], sm: [], xs: [], xxs: []
  }
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case MOVEMENT_PAGE_SET_LAYOUTS:
      return {
        ...state,
        layouts: action.layouts
      };
    default:
      return state;
  }
}
