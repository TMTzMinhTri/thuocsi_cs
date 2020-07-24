import {
  LayoutActionTypes,
  ILayoutReducer,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_ERROR,
  SIGN_IN_SUCCESS,
} from 'Interface/Store/layout.types';

const initialState: ILayoutReducer = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: '',
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
    case GET_CURRENT_USER_ERROR:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.error,
      };
    default:
      return state;
  }
}
