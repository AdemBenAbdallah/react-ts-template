type TUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  updatedAt: string;
  createdAt: string;
  _id: string;
  __v: number;
};

type RegisterInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

type LoginInput = Omit<RegisterInput, "role" | "confirmPassword">;

type GenericResponse = {
  status: string;
  message: string;
};

type TLoginResponse = {
  status: string;
  access_token: string;
};

type TUserResponse = {
  status: string;
  data: {
    user: TUser;
  };
};

export type {
  GenericResponse,
  LoginInput,
  RegisterInput,
  TLoginResponse,
  TUser,
  TUserResponse,
};
