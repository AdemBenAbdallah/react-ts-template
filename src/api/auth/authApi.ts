import { GenericResponse, RegisterInput, TLoginInput, TLoginResponse } from '../../types';
import BaseApi from '../BaseApis';

class AuthApi extends BaseApi {
  constructor() {
    super('auth');
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
