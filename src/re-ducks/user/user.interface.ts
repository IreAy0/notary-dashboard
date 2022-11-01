export interface IUserState {
  [k: string]: any | string | boolean | Date ;
}

  
export interface IUserAction {
  type: string;
  payload?: object;
};

  
