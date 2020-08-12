import { Api } from '..';
import { IResponeListTasks, IResponeListReason } from 'Interface/Response/task_manager.types';
import { IFilterListTaskParams } from 'Interface/Store/task_manager.types';
import { IResponseUser } from 'Interface/Response/session.types';

export const getListAddress = () => {
  return Api.get('/api/v1/addresses/city_list');
};

export const get_list_cs_task = (userInput: IFilterListTaskParams) => {
  const path = `/api/cs/v1/cs_tasks/list`;
  return Api.post<IResponeListTasks>(path, userInput);
};

export const getListReason = () => {
  const path = `/api/v1/orders/reason_list`;
  return Api.get<IResponeListReason[]>(path);
};

export const getListMember = () => {
  const path = `/api/cs/v1/group_members`;
  return Api.get<IResponseUser[]>(path);
};
