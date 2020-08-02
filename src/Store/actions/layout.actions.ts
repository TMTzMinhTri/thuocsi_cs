import { Dispatch } from 'redux';
import { RootAction } from 'Interface/Store/index.types';
import { get_current_user, sign_in, sign_out } from 'Api/Auth';
import { GET_CURRENT_USER_SUCCESS, SIGN_IN_SUCCESS, SIGN_OUT } from 'Interface/Store/layout.types';
import { RootState } from 'Store';
import { REMOVE_ALERT_ERROR } from 'Interface/Store/notification.types';

const getCurrentUser = () => (dispatch: Dispatch<RootAction>) => {
  get_current_user().then((rsp) => {
    localStorage.setItem(
      'user',
      JSON.stringify({ token: rsp.data.authentication_token, phone: rsp.data.phone_number })
    );
    dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: rsp.data });
  });
};

const signIn = (data: { login: string; password: string }) => (
  dispatch: Dispatch<RootAction>,
  getState: () => RootState
) => {
  const {
    notification: { alert },
  } = getState();
  sign_in(data).then((rsp) => {
    if (rsp.code === 'OK') {
      localStorage.setItem(
        'user',
        JSON.stringify({ token: rsp.data.authentication_token, phone: rsp.data.phone_number })
      );
      alert && dispatch({ type: REMOVE_ALERT_ERROR });
      dispatch({ type: SIGN_IN_SUCCESS, payload: rsp.data });
    }
  });
};

const signOut = () => (dispatch: Dispatch<RootAction>) => {
  sign_out().then((rsp) => {
    if (rsp.code === 'OK') {
      dispatch({ type: SIGN_OUT });
    }
  });
};

export { getCurrentUser, signIn, signOut };
