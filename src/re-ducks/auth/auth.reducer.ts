import { SET_SIGNIN_DATA } from './auth.types';
import { IAuthAction, IAuthState } from './auth.interface';

interface User {
  [k: string]: string | null | boolean | any;
}

export const initialState: IAuthState = {
  signIn: {} as User,
  user: {} as User
};

const authReducer = (state = initialState, { type, payload }: IAuthAction) => {
  switch (type) {
    case SET_SIGNIN_DATA:
      return {
        ...state,
        signIn: {
          ...state.signIn,
          ...(payload as object)
        }
      };
    default:
      return state;
  }
};

export default authReducer;
