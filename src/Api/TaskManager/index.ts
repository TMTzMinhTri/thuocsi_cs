import { Api } from '..';
import { IResponeListTasks } from 'Interface/Response/task_manager.types';
import { IUserInput } from 'Interface/Store/task_manager.types';

export const getListAddress = () => {
  return Api.get('/api/v1/addresses/city_list');
};

export const get_list_cs_task = (userInput: IUserInput) => {
  const path = `/api/cs/v1/cs_tasks/list`;
  return Api.post<IResponeListTasks>(path, userInput);
};
