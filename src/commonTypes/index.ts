// TODO: Describe backend entities types and common usage types here

export interface IUser {
  email: string;
  username: string;
  role: '';
}

export interface IReduxAction {
  type: string;
  payload: object;
  cb?: () => void;
}
