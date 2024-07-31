import Config from '@/common/config/Config';
import { TLoginResponse } from '@/types';
import axios, { AxiosInstance } from 'axios';

class BaseApi {
  protected instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL: `${Config.getInstance().API_URL}/${baseURL}`,
      withCredentials: true,
    });

    this.instance.defaults.headers.common['Content-Type'] = 'application/json';

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const errMessage = error.response.data.message as string;
        if (errMessage.includes('not logged in') && !originalRequest._retry) {
          originalRequest._retry = true;
          await this.refreshAccessToken();
          return this.instance(originalRequest);
        }
        return Promise.reject(error);
      }
    );
  }

  protected async refreshAccessToken() {
    const response = await this.instance.get<TLoginResponse>('/auth/refresh');
    return response.data;
  }
}

export default BaseApi;
