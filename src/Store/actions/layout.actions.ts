import { Dispatch } from 'redux';
import { RootAction } from 'Interface/Store/index.types';
import { get_current_user } from 'Api/Auth';
import { GET_CURRENT_USER_SUCCESS } from 'Interface/Store/layout.types';

const incrementWithDelay = () => async (dispatch: Dispatch<RootAction>): Promise<void> => {
  console.log('aaaa');
  setTimeout(() => dispatch({ type: 'SIGN_OUT' }), 3000);
};

const login = () => () => {};

const getCurrentUser = () => (dispatch: Dispatch<RootAction>) => {
  get_current_user().then((rsp: any) => {
    if (rsp.code === 'OK') {
      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: rsp.data,
      });
    }
  });
};

export { incrementWithDelay, getCurrentUser, login };
