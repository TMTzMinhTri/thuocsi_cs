import { RootAction } from 'Interface/Store/index.types';
import { Dispatch } from 'redux';
import { get_list_cs_task } from 'Api/TaskManager';
import {
  GET_LIST_TASK_SUCCESS,
  UPDATE_USER_INPUT,
  IUserInput,
  LOADING_TABLE,
} from 'Interface/Store/task_manager.types';
import { RootState } from 'Store';

const getListTask = () => (dispatch: Dispatch<RootAction>, getState: () => RootState) => {
  const {
    task_manager: { userInput },
  } = getState();
  get_list_cs_task(userInput).then((rsp) => {
    if (rsp.code === 'OK') {
      dispatch({ type: GET_LIST_TASK_SUCCESS, payload: rsp.data });
    }
  });
};

const getListTaskByFilter = (user_input: IUserInput) => (dispatch: Dispatch<RootAction>) => {
  dispatch({ type: UPDATE_USER_INPUT, payload: user_input });
  dispatch({ type: LOADING_TABLE });
  get_list_cs_task(user_input).then((rsp) => {
    if (rsp.code === 'OK') {
      dispatch({ type: GET_LIST_TASK_SUCCESS, payload: rsp.data });
    }
  });
};

export { getListTask, getListTaskByFilter };
