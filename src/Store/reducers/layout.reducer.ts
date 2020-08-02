import {
  LayoutActionTypes,
  ILayoutReducer,
  GET_CURRENT_USER_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
} from 'Interface/Store/layout.types';

const initialState: ILayoutReducer = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

export default function (state = initialState, action: LayoutActionTypes): ILayoutReducer {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case SIGN_OUT:
      localStorage.clear();
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
