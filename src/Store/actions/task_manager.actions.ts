import { RootAction } from 'Interface/Store/index.types';
import { Dispatch } from 'redux';
import { get_list_cs_task } from 'Api/TaskManager';
import { GET_LIST_TASK_SUCCESS } from 'Interface/Store/task_manager.types';

const getListTask = () => (dispatch: Dispatch<RootAction>) => {
  const data = {
    from: '2020-02-01',
    to: '2020-08-31',
    failure_type_ids: [],
    user_id: null,
    so_id: null,
    page: 1,
    per_page: 30,
    status: null,
  };
  get_list_cs_task(
    data.from,
    data.to,
    data.failure_type_ids,
    data.user_id,
    data.page,
    data.so_id,
    data.status,
    data.per_page
  ).then((rsp: any) => {
    if (rsp.status === 200) {
      dispatch({ type: GET_LIST_TASK_SUCCESS, payload: rsp.data });
    }
  });
};

export { getListTask };
