export interface IAuthState {
  signIn: object;
  user: object;
}

export interface IAuthAction {
  payload: object | boolean;
  type: string;
}
