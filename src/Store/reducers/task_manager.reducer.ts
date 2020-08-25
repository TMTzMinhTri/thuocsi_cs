import {
  ITask_managerReducer,
  GET_LIST_TASK_SUCCESS,
  UPDATE_USER_INPUT,
  LOADING_TABLE,
  CREATE_COMMENT,
  TASK_SELECTED,
  GET_LIST_REASON,
  GET_LIST_MEMBER,
  SEARCH_TASK_SUCCESS,
  CLEAR_DATA_SEARCH_TASK,
  CREATE_NEW_TASK,
} from 'Interface/Store/task_manager.types';
import { RootAction } from 'Interface/Store/index.types';

// to: new Date(),
// from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate()),

const initialState: ITask_managerReducer = {
  cs_tasks: [],
  total_count: 0,
  user_detail: null,
  loading: true,
  task_selected: null,
  userInput: {
    page: 1,
    per_page: 30,
    failure_type_ids: [],
    from: new Date('2020-03-01'),
    to: new Date('2020-04-30'),
    user_id: null,
    so_id: null,
    status: null,
    created_by_id: null,
    assigned_member_id: null,
  },
  list_member: [],
  list_reason: [],
  taskBySearch: null,
};

export default function (state = initialState, action: RootAction): ITask_managerReducer {
  switch (action.type) {
    case LOADING_TABLE:
      return { ...state, loading: true };
    case GET_LIST_TASK_SUCCESS:
      return {
        ...state,
        cs_tasks: action.payload.cs_tasks,
        total_count: action.payload.total_count,
        user_detail: action.payload.user_detail,
        loading: false,
      };
    case UPDATE_USER_INPUT:
      return {
        ...state,
        userInput: action.payload,
      };
    case CREATE_COMMENT:
      return {
        ...state,
        task_selected: action.task_selected,
        cs_tasks: action.cs_tasks,
      };
    case TASK_SELECTED:
      return {
        ...state,
        task_selected: action.payload,
      };
    case GET_LIST_REASON:
      return {
        ...state,
        list_reason: action.payload,
      };
    case GET_LIST_MEMBER:
      return {
        ...state,
        list_member: action.payload,
      };
    case SEARCH_TASK_SUCCESS:
      return {
        ...state,
        taskBySearch: action.payload,
      };
    case CLEAR_DATA_SEARCH_TASK:
      return {
        ...state,
        taskBySearch: null,
      };
    case CREATE_NEW_TASK:
      const newCs_tasks = [...state.cs_tasks];

      return {
        ...state,
        cs_tasks: [action.payload, ...newCs_tasks],
      };
    default:
      return { ...state };
  }
}
