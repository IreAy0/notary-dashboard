import { GET_ALL_TEMPLATES, SAVE_ALL_TEMPLATES } from './template.types';
import { ILockerAction, ILockerState } from './template.inteface';

export const initialState = {
  templates: []
};

const templatesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_ALL_TEMPLATES:
      return {
        ...state,
        templates: payload as object
      };

    default:
      return state;
  }
};

export default templatesReducer;
