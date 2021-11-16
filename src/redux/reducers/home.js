import {
  key, HOME_SET_LAYOUTS, HOME_ADD_ELEMENT, HOME_REMOVE_ELEMENT
} from '../actions/home';
import boxes from '../../layouts/box/boxes';
import guid from '../../utils/math/guid';

export const selectors = {
  layouts: state => state.home.layouts,
  elements: state => state.home.elements
};

const initialState = {
  layouts: {
    lg: [], md: [], sm: [], xs: [], xxs: [],
  },
  elements: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case HOME_SET_LAYOUTS:
      return {
        ...state,
        layouts: action.layouts
      };
    case HOME_ADD_ELEMENT:
      const gu = guid();
      const elemToAdd = { i: gu, ...{ ...boxes[action.element] } };
      // elemToAdd.additionalInfo.id = gu;

      return {
        ...state,
        elements: [...state.elements, elemToAdd]
      };
    case HOME_REMOVE_ELEMENT:
      const elem = [...state.elements].filter(elemToSel => elemToSel.additionalInfo.boxType === action.element)[0];

      const layouts = { ...state.layouts };
      Object.keys(layouts).map((keyLayout) => {
        layouts[keyLayout] = layouts[keyLayout].filter(elemToFilter => elemToFilter.i !== elem.i);
      });

      return {
        ...state,
        layouts,
        elements: [...state.elements].filter(elemL => elemL.i !== elem.i)
      };
    default:
      return state;
  }
}
