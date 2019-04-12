//@flow
import { TOGGLE_MENU } from '../constants';

type initialSateType = {
  isVisible: boolean
};

const initialSate: initialSateType = {
  isVisible: false
};

export function menu(state: initialSateType = initialSate, action: Object) {
  switch (action.type) {
    case TOGGLE_MENU:
      return { ...state, isVisible: !state.isVisible };
    default:
      return state;
  }
}
