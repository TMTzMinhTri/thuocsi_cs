import { Dispatch } from 'redux';
import { RootAction } from 'Interface/Store/index.types';
import { get_current_user, sign_in } from 'Api/Auth';
import {
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_ERROR,
  SIGN_IN_SUCCESS,
} from 'Interface/Store/layout.types';

const getCurrentUser = () => (dispatch: Dispatch<RootAction>) => {
  get_current_user().then((rsp: any) => {
    if (rsp.code === 'OK') {
      dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: rsp.data });
    } else {
      dispatch({ type: GET_CURRENT_USER_ERROR, error: rsp.message });
    }
  });
};

const signIn = (data: { login: string; password: string }) => (dispatch: Dispatch<RootAction>) => {
  sign_in(data).then((rsp: any) => {
    dispatch({ type: SIGN_IN_SUCCESS, payload: rsp.data });
  });
};

export { getCurrentUser, signIn };
