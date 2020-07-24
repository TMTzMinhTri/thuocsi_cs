import { IResponeListTasks, IUserDetail, Icstasks } from 'Interface/Response/task_manager.types';

export const GET_LIST_TASK_SUCCESS = 'GET_LIST_TASK_SUCCESS';

//DEFINE ACTION

export interface IGetListTaskAction {
  type: typeof GET_LIST_TASK_SUCCESS;
  payload: IResponeListTasks;
}

//

// DEFINE REDUCER
export interface ITask_managerReducer {
  total_count: number;
  user_detail: IUserDetail | null;
  cs_tasks: Icstasks[];
  loading: boolean;
}

//
export type TaskManagerActionTypes = IGetListTaskAction;
