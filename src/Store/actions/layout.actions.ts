import { Dispatch } from 'redux';
import { RootAction } from 'Interface/Store/index.types';
import { get_current_user, sign_in, sign_out } from 'Api/Auth';
import {
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
} from 'Interface/Store/layout.types';

const getCurrentUser = () => (dispatch: Dispatch<RootAction>) => {
  get_current_user().then((rsp) => {
    if (rsp.code === 'OK') {
      localStorage.setItem(
        'user',
        JSON.stringify({ token: rsp.data.authentication_token, phone: rsp.data.phone_number })
      );
      dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: rsp.data });
    } else {
      localStorage.clear();
      dispatch({ type: GET_CURRENT_USER_ERROR, error: rsp.message });
    }
  });
};

const signIn = (data: { login: string; password: string }) => (dispatch: Dispatch<RootAction>) => {
  sign_in(data).then((rsp) => {
    if (rsp.code === 'OK') {
      localStorage.setItem(
        'user',
        JSON.stringify({ token: rsp.data.authentication_token, phone: rsp.data.phone_number })
      );
      dispatch({ type: SIGN_IN_SUCCESS, payload: rsp.data });
    }
  });
};

const signOut = () => (dispatch: Dispatch<RootAction>) => {
  sign_out().then((rsp) => {
    if (rsp.code === 'OK') {
      localStorage.clear();
      dispatch({ type: SIGN_OUT });
    }
  });
};

export { getCurrentUser, signIn, signOut };
