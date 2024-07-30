import { authApi } from '@/api';
import { useAuthContext } from '@/common/contexts/authProvider/useAuthContext';
import { useNavigateTo } from '@/hooks';
import { PATHS } from '@/router/path';
import { Box, Button, Flex, Group, Text } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';

const Header = () => {
  const stateContext = useAuthContext();
  const user = stateContext.state.authUser;
  const navigateTo = useNavigateTo();

  const { mutate: $logoutUser, isPending } = useMutation({
    mutationFn: () => authApi.logoutUser(),
    onSuccess: () => {
      window.location.href = '/login';
    },
  });

  return (
    <Flex align="center" justify="space-between" h="100%" p={'md'}>
      <Text
        variant="gradient"
        fw={700}
        onClick={() => navigateTo('/')}
        style={{ cursor: 'pointer' }}
        gradient={{ from: 'blue', to: 'teal', deg: 90 }}
      >
        Application Logo
      </Text>
      <Box>
        {!user && (
          <Group gap={'sm'}>
            <Button onClick={() => navigateTo(PATHS.LOGIN)}>Login</Button>
            <Button variant="outline" mr={2} onClick={() => navigateTo(PATHS.REGISTER)}>
              SignUp
            </Button>
          </Group>
        )}
        {user && (
          <>
            <Button variant="subtle" loading={isPending} onClick={() => navigateTo(PATHS.PRROFILE)}>
              Profile
            </Button>
            <Button variant="outline" loading={isPending} onClick={() => $logoutUser()}>
              Logout
            </Button>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
