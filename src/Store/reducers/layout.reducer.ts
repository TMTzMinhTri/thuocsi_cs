import {
  LayoutActionTypes,
  ILayoutReducer,
  GET_CURRENT_USER_SUCCESS,
} from 'Interface/Store/layout.types';

const initialState: ILayoutReducer = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

export default function (state = initialState, action: LayoutActionTypes): ILayoutReducer {
  switch (action.type) {
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    default:
      return state;
  }
}
