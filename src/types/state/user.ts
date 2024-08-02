type TUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  updatedAt: string;
  createdAt: string;
};

type GenericResponse = {
  status: string;
  message: string;
};

type TUserResponse = {
  status: string;
  data: {
    user: TUser;
  };
};

export type { GenericResponse, TUser, TUserResponse };
