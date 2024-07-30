import axios, { AxiosInstance } from 'axios';
import Config from '../../common/config/Config';
import { TUserResponse } from '../../types';

class UserApi {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: `${Config.getInstance().API_URL}/`,
      withCredentials: true,
    });

    this.instance.defaults.headers.common['Content-Type'] = 'application/json';
  }

  async getMe() {
    const response = await this.instance.get<TUserResponse>('/users/me');
    return response.data;
  }
}

export const userApi = new UserApi();
