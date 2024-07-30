import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Radio,
  Stack,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { object, string, z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bindCheckboxToForm = (form: any, key: string) => {
  const inputProps = form.getInputProps(key);
  return {
    checked: form.values[key],
    ...inputProps,
  };
};

const InputSginUp = object({
  name: string().min(1, 'Full name is required').max(100),
  email: string().min(1, 'Email address is required').email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

type SignupFormType = z.infer<typeof InputSginUp>;

export function SignUpForm(props: { toggle: () => void }) {
  const form = useForm<SignupFormType>({
    validate: zodResolver(InputSginUp),
    validateInputOnBlur: true,
    validateInputOnChange: ['email', 'password', 'terms'],
  });

  return (
    <Stack w={'100%'} h={'100vh'} align="center" justify="center">
      <Paper radius="md" p={{ base: 'lg', md: 'xl' }} withBorder>
        <Text size="lg" fw={500} fz={{ base: rem(14), md: rem(19) }}>
          Bienvenue sur l'application
        </Text>

        <Divider label="Inscrivez-vous avec votre email" labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit(async (values) => {
            console.log(values);
          })}
        >
          <Stack>
            <TextInput
              required
              label="Nom"
              placeholder="Votre nom"
              {...form.getInputProps('name')}
              radius="md"
            />

            <TextInput
              required
              label="Email"
              placeholder="bonjour@mantine.dev"
              {...form.getInputProps('email')}
              radius="md"
            />

            <DateInput
              required
              {...form.getInputProps('birthdayDate')}
              clearable
              label="Date de naissance"
              placeholder="Entrée de la date"
              radius="md"
            />

            <Radio.Group {...form.getInputProps('gender')} label="Genre" withAsterisk>
              <Group mt="xs">
                <Radio value="MALE" label="Homme" />
                <Radio value="FEMALE" label="Femme" />
              </Group>
            </Radio.Group>

            <PasswordInput
              required
              label="Mot de passe"
              placeholder="Votre mot de passe"
              {...form.getInputProps('password')}
              radius="md"
            />

            <Checkbox
              label="J'accepte les termes et conditions"
              {...bindCheckboxToForm(form, 'terms')}
            />
          </Stack>

          <Flex justify="space-between" mt="xl" gap={10}>
            <Anchor
              style={{ textAlign: 'start' }}
              component="button"
              type="button"
              c="dimmed"
              size="xs"
              onClick={props.toggle}
            >
              Vous avez déjà un compte ? Connectez-vous
            </Anchor>
            <Button disabled={!form.isValid()} type="submit" radius="xl">
              S'inscrire{' '}
            </Button>
          </Flex>
        </form>
      </Paper>
    </Stack>
  );
}
