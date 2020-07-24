import { Api } from '..';

export const get_current_user = () => {
  return Api.get('/api/cs/v1/current_cs_account');
};

export const sign_in = (body: { login: string; password: string }) => {
  const path = '/api/cs/v1/cs_members/sign_in';
  return Api.post(path, body);
};
