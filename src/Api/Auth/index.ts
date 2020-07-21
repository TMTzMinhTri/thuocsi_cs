import { Api } from '..';

export const get_current_user = () => {
  return Api.get('/api/cs/v1/current_cs_account');
};
