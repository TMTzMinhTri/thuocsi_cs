import { Api } from '..';
import { IResponseUser } from 'Interface/Response/session.types';

export const get_current_user = () => {
  return Api.get<IResponseUser>('/api/cs/v1/current_cs_account');
};

export const sign_in = (body: { login: string; password: string }) => {
  const path = '/api/cs/v1/cs_members/sign_in';
  return Api.post<IResponseUser>(path, body);
};

export const sign_out = () => {
  const path = '/api/cs/v1/cs_members/sign_out';
  return Api.delete<null>(path);
};
