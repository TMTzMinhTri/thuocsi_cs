import { Api } from '..';

export const getListAddress = () => {
  return Api.get('/api/v1/addresses/city_list');
};

export const get_list_cs_task = (
  from: string,
  to: string,
  failure_type_ids: string[],
  user_id: string | null,
  page: number,
  so_id: string | null,
  status: string | null,
  per_page: number
) => {
  const path = `/api/cs/v1/cs_tasks/list`;
  const data = {
    from,
    to,
    failure_type_ids,
    user_id,
    so_id: so_id ? so_id : null,
    page,
    per_page: per_page,
    status: status === 'all' ? null : status,
  };
  return Api.post(path, data);
};
