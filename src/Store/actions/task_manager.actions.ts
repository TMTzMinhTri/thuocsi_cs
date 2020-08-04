import { RootAction } from 'Interface/Store/index.types';
import { Dispatch } from 'redux';
import { get_list_cs_task } from 'Api/TaskManager';
import { GET_LIST_TASK_SUCCESS, UPDATE_USER_INPUT, IUserInput, LOADING_TABLE, CREATE_COMMENT, TASK_SELECTED } from 'Interface/Store/task_manager.types';
import { RootState } from 'Store';
import _ from 'lodash';

const getListTask = () => (dispatch: Dispatch<RootAction>, getState: () => RootState) => {
  const {
    task_manager: { userInput },
  } = getState();
  get_list_cs_task(userInput).then((rsp) => {
    if (rsp.code === 'OK') {
      const test = rsp.data.cs_tasks.map((it) => ({ ...it, comments: [{ id: _.random(1, 10), content: 'comment', created_at: new Date() }] }));
      dispatch({ type: GET_LIST_TASK_SUCCESS, payload: { ...rsp.data, cs_tasks: test } });
    }
  });
};

const getListTaskByFilter = (user_input: IUserInput) => (dispatch: Dispatch<RootAction>) => {
  dispatch({ type: UPDATE_USER_INPUT, payload: user_input });
  dispatch({ type: LOADING_TABLE });
  get_list_cs_task(user_input).then((rsp) => {
    if (rsp.code === 'OK') {
      const test = rsp.data.cs_tasks.map((it) => ({ ...it, comments: [{ id: _.random(1, 10), content: 'comment', created_at: new Date() }] }));
      dispatch({ type: GET_LIST_TASK_SUCCESS, payload: { ...rsp.data, cs_tasks: test } });
    }
  });
};

const createCommentInTask = (comment: string, callback: Function) => (dispatch: Dispatch<RootAction>, getState: () => RootState) => {
  const {
    task_manager: { task_selected, cs_tasks },
  } = getState();
  const data = task_selected?.comments && [{ id: _.random(1, 10), content: comment, created_at: new Date() }, ...task_selected.comments];
  const taskIndex = _.findIndex(cs_tasks, (it) => it.id === task_selected?.id);
  const updateListCsTasks = _.set(cs_tasks, `cstasks[${taskIndex}]comments`, data);
  const newTaskSelected = task_selected && _.set(task_selected, 'comments', data);
  dispatch({ type: CREATE_COMMENT, task_selected: newTaskSelected, cs_tasks: updateListCsTasks });
  callback();
};

const selectDetailTask = (task_id: number | null, callback?: Function) => (dispatch: Dispatch<RootAction>, getState: () => RootState) => {
  const {
    task_manager: { cs_tasks },
  } = getState();
  const task = _.find(cs_tasks, (it) => it.id === task_id);
  dispatch({ type: TASK_SELECTED, payload: task ? task : null });
  callback && callback(task);
};

export { getListTask, getListTaskByFilter, createCommentInTask, selectDetailTask };
