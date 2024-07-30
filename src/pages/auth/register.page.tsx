import { MainAuthForm } from '@/core/components/MainAuthForm';
import { Box } from '@mantine/core';

const RegisterPage = () => {
  return (
    <Box h={'100dvh'}>
      <MainAuthForm initialFormType="register" />
    </Box>
  );
};

export default RegisterPage;
