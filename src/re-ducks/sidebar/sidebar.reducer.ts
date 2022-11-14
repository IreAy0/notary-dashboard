import * as types from './sidebar.types';
import { ISidebarAction, ISidebarState } from './sidebar.interface';
import { SCREEN_SIZES } from '../../const';

export const initialState: ISidebarState = {
  toggleMenu: window.innerWidth <  SCREEN_SIZES.sm,
  minimizeSidebar: false
};


const sidebarReducer = (state = initialState, action: ISidebarAction) => {
  switch (action.type) {
    case types.TOGGLE_MENU:
      return {
        ...state,
        minimizeSidebar: !state.minimizeSidebar
      };
    default:
      return {
        ...state
      };
  }
};

export default sidebarReducer;
