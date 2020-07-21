import { Api } from '..';

export const getListAddress = () => {
  return Api.get('/api/v1/addresses/city_list');
};
