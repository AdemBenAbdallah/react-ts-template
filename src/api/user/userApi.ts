import { TUserResponse } from '../../types';
import BaseApi from '../BaseApis';

class UserApi extends BaseApi {
  constructor() {
    super('');
  }

  async getMe() {
    const response = await this.instance.get<TUserResponse>('/users/me');
    return response.data;
  }
}

export const userApi = new UserApi();
