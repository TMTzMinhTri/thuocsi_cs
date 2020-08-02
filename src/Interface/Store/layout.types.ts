import { IResponseUser } from 'Interface/Response/session.types';

// DEFINE TYPES
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';

export const SIGN_OUT = 'SIGN_OUT';

export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
//

//DEFINE ACTION
export interface ISignInSuccessAction {
  type: typeof SIGN_IN_SUCCESS;
  payload: IResponseUser;
}

export interface ISignOutAction {
  type: 'SIGN_OUT';
}

export interface IGetCurrentUserAction {
  type: 'GET_CURRENT_USER_SUCCESS';
  payload: IResponseUser;
}

//

// DEFINE REDUCER
export interface ILayoutReducer {
  user: IResponseUser | null;
  isAuthenticated: boolean;
  loading: boolean;
}

//

export type LayoutActionTypes = ISignInSuccessAction | ISignOutAction | IGetCurrentUserAction;
