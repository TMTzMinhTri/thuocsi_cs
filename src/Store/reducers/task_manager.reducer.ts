import { ITask_managerReducer, GET_LIST_TASK_SUCCESS } from 'Interface/Store/task_manager.types';
import { RootAction } from 'Interface/Store/index.types';

const initialState: ITask_managerReducer = {
  cs_tasks: [],
  total_count: 0,
  user_detail: null,
  loading: true,
};

export default function (state = initialState, action: RootAction): ITask_managerReducer {
  switch (action.type) {
    case GET_LIST_TASK_SUCCESS:
      return {
        ...state,
        cs_tasks: action.payload.cs_tasks,
        total_count: action.payload.total_count,
        user_detail: action.payload.user_detail,
        loading: false,
      };
    default:
      return state;
  }
}
