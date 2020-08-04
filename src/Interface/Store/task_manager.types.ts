import { IResponeListTasks, IUserDetail, Icstasks } from 'Interface/Response/task_manager.types';

export const GET_LIST_TASK_SUCCESS = 'GET_LIST_TASK_SUCCESS';
export const GET_LIST_TASK_By_FILTER_SUCCESS = 'GET_LIST_TASK_By_FILTER_SUCCESS';
export const UPDATE_USER_INPUT = 'UPDATE_USER_INPUT';
export const LOADING_TABLE = 'LOADING_TABLE';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const TASK_SELECTED = 'TASK_SELECTED';

//DEFINE ACTION

export interface IGetListTaskAction {
  type: typeof GET_LIST_TASK_SUCCESS;
  payload: IResponeListTasks;
}

export interface IGetListTaskByFilterAction {
  type: typeof GET_LIST_TASK_By_FILTER_SUCCESS;
  payload: IResponeListTasks;
}
export interface IUpdateUserInputAction {
  type: typeof UPDATE_USER_INPUT;
  payload: IUserInput;
}
export interface ILoadingTableAction {
  type: typeof LOADING_TABLE;
}

export interface ICreateCommentAction {
  type: typeof CREATE_COMMENT;
  task_selected: Icstasks | null;
  cs_tasks: Icstasks[];
}

export interface ISelectedTaskAction {
  type: typeof TASK_SELECTED;
  payload: Icstasks | null;
}
//

// DEFINE REDUCER
export interface ITask_managerReducer {
  total_count: number;
  user_detail: IUserDetail | null;
  cs_tasks: Icstasks[];
  loading: boolean;
  userInput: IUserInput;
  task_selected: Icstasks | null;
}

//
export interface IUserInput {
  page: number;
  per_page: number;
  from: string;
  to: string;
  failure_type_ids: string[];
  user_id: number | null;
  so_id: number | null;
  status: string | null;
}

//
export type TaskManagerActionTypes =
  | IGetListTaskAction
  | IGetListTaskByFilterAction
  | IUpdateUserInputAction
  | ILoadingTableAction
  | ICreateCommentAction
  | ISelectedTaskAction;
