import { IResponeListTasks, IUserDetail, Icstasks, IResponeListReason, IResponseSearchTask, IBankInfomation } from 'Interface/Response/task_manager.types';
import { IResponseUser } from 'Interface/Response/session.types';

export const GET_LIST_TASK_SUCCESS = 'GET_LIST_TASK_SUCCESS';
export const GET_LIST_TASK_By_FILTER_SUCCESS = 'GET_LIST_TASK_By_FILTER_SUCCESS';
export const UPDATE_USER_INPUT = 'UPDATE_USER_INPUT';
export const LOADING_TABLE = 'LOADING_TABLE';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const TASK_SELECTED = 'TASK_SELECTED';
export const GET_LIST_MEMBER = 'GET_LIST_MEMBER';
export const GET_LIST_REASON = 'GET_LIST_REASON';
export const SEARCH_TASK_SUCCESS = 'SEARCH_TASK_SUCCESS';
export const CLEAR_DATA_SEARCH_TASK = 'CLEAR_DATA_SEARCH_TASK';
export const CREATE_NEW_TASK = 'CREATE_NEW_TASK';

//#region DEFINE ACTION
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

export interface IGetListMember {
  type: typeof GET_LIST_MEMBER;
  payload: IResponseUser[];
}

export interface IGetListReason {
  type: typeof GET_LIST_REASON;
  payload: IResponeListReason[];
}

export interface ISearchTaskSuccessAction {
  type: typeof SEARCH_TASK_SUCCESS;
  payload: IResponseSearchTask;
}
export interface IClearDataSearchTaskAction {
  type: typeof CLEAR_DATA_SEARCH_TASK;
}
export interface ICreateNewTaskAction {
  type: typeof CREATE_NEW_TASK;
  payload: Icstasks;
}

//#endregion
//

//#region DEFINE REDUCER
export interface ITask_managerReducer {
  total_count: number;
  user_detail: IUserDetail | null;
  cs_tasks: Icstasks[];
  loading: boolean;
  userInput: IUserInput;
  task_selected: Icstasks | null;
  list_member: IResponseUser[];
  list_reason: IResponeListReason[];
  taskBySearch: IResponseSearchTask;
}
//#endregion

//
export interface IUserInput {
  page: number;
  per_page: number;
  from: Date;
  to: Date;
  failure_type_ids: { label: string; value: number }[];
  user_id: number | null;
  so_id: number | null;
  status: { label: string; value: string } | null;
  created_by_id: { label: string; value: number } | null;
  assigned_member_id: { label: string; value: number } | null;
}

export interface IFilterListTaskParams {
  page: number;
  per_page: number;
  from: Date;
  to: Date;
  failure_type_ids: number[];
  user_id: number | null;
  so_id: number | null;
  status: string | null;
  created_by_id: number | null;
  assigned_member_id: number;
}
export interface IParamsPostCreateTask {
  cs_task: {
    order_id: number;
    return_id: number;
    failure_types: Array<number>;
    transferred_cash: number;
    assign_group: string;
    cs_note: string;
  };
  bank_information: IBankInfomation | {};
}
//
export type TaskManagerActionTypes =
  | IGetListTaskAction
  | IGetListTaskByFilterAction
  | IUpdateUserInputAction
  | ILoadingTableAction
  | ICreateCommentAction
  | ISelectedTaskAction
  | IGetListMember
  | IGetListReason
  | ISearchTaskSuccessAction
  | IClearDataSearchTaskAction
  | ICreateNewTaskAction;
