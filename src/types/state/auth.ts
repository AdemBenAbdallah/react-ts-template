import { z } from 'zod';

const InputLoginForm = z.object({
  email: z.string().min(1, 'Email address is required').email('Email Address is invalid'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

type TLoginInput = z.infer<typeof InputLoginForm>;

type TLoginResponse = {
  status: string;
  access_token: string;
};

type RegisterInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export { InputLoginForm };
export type { RegisterInput, TLoginInput, TLoginResponse };
