import { RootAction } from 'Interface/Store/index.types';
import { Dispatch } from 'redux';
import { get_list_cs_task, getListMember, getListReason } from 'Api/TaskManager';
import { GET_LIST_TASK_SUCCESS, UPDATE_USER_INPUT, IUserInput, LOADING_TABLE, CREATE_COMMENT, TASK_SELECTED, GET_LIST_MEMBER, GET_LIST_REASON } from 'Interface/Store/task_manager.types';
import { RootState } from 'Store';
import _ from 'lodash';

const getListTask = (own?: number) => (dispatch: Dispatch<RootAction>, getState: () => RootState) => {
  const {
    task_manager: { userInput, loading },
  } = getState();
  const { from, per_page, to, created_by_id, failure_type_ids, page, so_id, status, user_id } = userInput;
  if (!loading) dispatch({ type: LOADING_TABLE });
  get_list_cs_task({
    page: 1,
    per_page: per_page,
    from: from,
    to: to,
    failure_type_ids: failure_type_ids.map((it) => it.value),
    user_id: user_id,
    created_by_id: created_by_id ? created_by_id.value : null,
    assigned_member_id: own ? own : null,
    so_id: so_id,
    status: status ? status.value : null,
  }).then((rsp) => {
    if (rsp.code === 'OK') {
      const test = rsp.data.cs_tasks.map((it) => ({ ...it, comments: [{ id: _.random(1, 10), content: 'comment', created_at: new Date() }] }));
      dispatch({ type: GET_LIST_TASK_SUCCESS, payload: { ...rsp.data, cs_tasks: test } });
    }
  });
};

const getListTaskByFilter = (user_input: IUserInput) => (dispatch: Dispatch<RootAction>) => {
  dispatch({ type: UPDATE_USER_INPUT, payload: user_input });
  dispatch({ type: LOADING_TABLE });
  const { assigned_member_id, from, per_page, to, created_by_id, failure_type_ids, page, so_id, status, user_id } = user_input;

  get_list_cs_task({
    page,
    per_page,
    from,
    to,
    failure_type_ids: failure_type_ids.map((it) => it.value),
    user_id,
    assigned_member_id: assigned_member_id ? assigned_member_id.value : null,
    created_by_id: created_by_id ? created_by_id.value : null,
    so_id,
    status: status ? status.value : null,
  }).then((rsp) => {
    if (rsp.code === 'OK') {
      const test = rsp.data.cs_tasks.map((it) => ({ ...it, comments: [{ id: _.random(1, 10), content: 'comment', created_at: new Date() }] }));
      dispatch({ type: GET_LIST_TASK_SUCCESS, payload: { ...rsp.data, cs_tasks: test } });
    }
  });
};

const getListMemberAndReason = () => (dispatch: Dispatch<RootAction>) => {
  Promise.all([getListMember(), getListReason()]).then((rsp) => {
    dispatch({ type: GET_LIST_MEMBER, payload: rsp[0].data });
    dispatch({ type: GET_LIST_REASON, payload: rsp[1].data });
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

export { getListTask, getListTaskByFilter, createCommentInTask, selectDetailTask, getListMemberAndReason };
