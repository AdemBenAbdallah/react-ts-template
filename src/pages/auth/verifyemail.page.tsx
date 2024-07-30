import { authApi } from '@/api';
import { Box, Button, Container, Paper, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { TypeOf, object, string } from 'zod';

const verificationCodeSchema = object({
  verificationCode: string().min(1, 'Verification code is required'),
});
export type VerificationCodeInput = TypeOf<typeof verificationCodeSchema>;

const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const form = useForm<VerificationCodeInput>({
    validate: zodResolver(verificationCodeSchema),
    initialValues: { verificationCode: '' },
  });

  const { mutate: verifyEmail, isPending } = useMutation({
    mutationFn: (verificationCode: string) => authApi.verifyEmail(verificationCode),
    onSuccess: () => {
      navigate('/login');
    },
  });

  return (
    <Container size="xs" p="xl">
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Title order={1} w={600} mb="md">
          Verify Email Address
        </Title>

        <form onSubmit={form.onSubmit((values) => verifyEmail(values.verificationCode))}>
          <Paper component="form" noValidate autoComplete="off" p="lg" withBorder>
            <TextInput name="verificationCode" label="Verification Code" required />

            <Button
              variant="filled"
              color="blue"
              mt="md"
              fullWidth
              loading={isPending}
              type="submit"
            >
              Verify Email
            </Button>
          </Paper>
        </form>
      </Box>
    </Container>
  );
};

export default EmailVerificationPage;
