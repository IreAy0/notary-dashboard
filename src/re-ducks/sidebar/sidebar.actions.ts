import * as types from './sidebar.types';

export const toggleMenu = (dispatch: Function) => {
  dispatch({
    type: types.TOGGLE_MENU
  });
};
