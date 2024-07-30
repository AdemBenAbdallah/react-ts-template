import { Box, Group } from "@mantine/core";
import { GoogleButton } from "./Icons/GoogleButton";

const SocialButtonAuth = () => {
  return (
    <Group grow mb="md" mt="md">
      <Box w={"100%"} component="a" href="/api/auth/google">
        <GoogleButton w={"100%"} radius="xl">
          Google
        </GoogleButton>
      </Box>
    </Group>
  );
};

export default SocialButtonAuth;
