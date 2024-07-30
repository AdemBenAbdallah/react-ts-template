import axios, { AxiosInstance } from 'axios';
import Config from '../../common/config/Config';
import { GenericResponse, RegisterInput, TLoginInput, TLoginResponse } from '../../types';

class AuthApi {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: `${Config.getInstance().API_URL}/auth`,
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

  private async refreshAccessToken() {
    const response = await this.instance.get<TLoginResponse>('/refresh');
    return response.data;
  }

  async signUpUser(user: RegisterInput) {
    const response = await this.instance.post<GenericResponse>('/register', user);
    return response.data;
  }

  async loginUser(user: TLoginInput) {
    const response = await this.instance.post<TLoginResponse>('/login', user);
    return response.data;
  }

  async verifyEmail(verificationCode: string) {
    const response = await this.instance.get<GenericResponse>(`/verifyemail/${verificationCode}`);
    return response.data;
  }

  async logoutUser() {
    const response = await this.instance.get<GenericResponse>('/logout');
    return response.data;
  }
}

export const authApi = new AuthApi();
