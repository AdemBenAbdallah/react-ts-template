import { authApi } from '@/api';
import { InputLoginForm, TLoginInput } from '@/types';
import {
  Anchor,
  Button,
  Divider,
  Flex,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

export function LoginForm(props: { toggle: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state?.from.pathname as string) || '/';
  const queryClient = useQueryClient();

  const { mutate: $loginUser, isPending } = useMutation({
    mutationKey: ['loginUser'],
    mutationFn: (data: TLoginInput) => authApi.loginUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate(from, { replace: true });
    },
  });

  const form = useForm<TLoginInput>({
    initialValues: { email: '', password: '' },
    validate: zodResolver(InputLoginForm),
    validateInputOnBlur: true,
    validateInputOnChange: ['email', 'password'],
  });

  return (
    <Stack h="100%" align="center" justify="center">
      <Paper radius="md" p={{ base: 'lg', md: 'xl' }} maw={400} withBorder>
        <Text size="lg" fw={500} fz={{ base: rem(14), md: rem(19) }}>
          Bienvenue sur l'application{' '}
        </Text>

        <Divider label="Connectez-vous avec votre email" labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit(async (values) => {
            $loginUser(values);
          })}
        >
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              {...form.getInputProps('email')}
              radius="md"
            />

            <Stack gap={'xs'}>
              <PasswordInput
                required
                label="Mot de passe"
                placeholder="Votre mot de passe"
                {...form.getInputProps('password')}
                radius="md"
              />
              <Text fz={'xs'} c={'dimed'} style={{ alignSelf: 'flex-end' }}>
                Mot de passe oublié ?
              </Text>
            </Stack>
          </Stack>

          <Flex justify="space-between" mt="xl" gap={10}>
            <Anchor
              style={{ textAlign: 'start' }}
              component="button"
              type="button"
              c="gray.7"
              size="xs"
              onClick={props.toggle}
            >
              Vous n'avez pas de compte ? Inscrivez-vous
            </Anchor>
            <Button
              loading={isPending}
              size="sm"
              disabled={!form.isValid()}
              type="submit"
              radius="xl"
            >
              Connexion
            </Button>
          </Flex>
        </form>
      </Paper>
    </Stack>
  );
}
