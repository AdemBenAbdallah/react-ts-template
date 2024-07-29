import { authApi } from "@/api";
import { useAuthContext } from "@/common/contexts/authProvider/useAuthContext";
import { Box, Button, Flex, Text } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const stateContext = useAuthContext();
  const user = stateContext.state.authUser;

  const { mutate, isPending } = useMutation({
    mutationFn: () => authApi.logoutUser(),
    onSuccess: () => {
      window.location.href = "/login";
    },
    // onError: (error) => {
    //   Uncomment and adjust error handling as needed
    //   if (Array.isArray(error.response?.data?.error)) {
    //     error.response.data.error.forEach((el) =>
    //       console.log("error", el.message)
    //     );
    //   } else {
    //     console.log("error", error.response?.data?.error);
    //   }
    // },
  });

  return (
    <Flex align="center" justify="space-between" h="100%">
      <Text
        variant="gradient"
        w={700}
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        CodevoWeb
      </Text>
      <Box>
        {!user && (
          <>
            <Button
              variant="subtle"
              mr={2}
              onClick={() => navigate("/register")}
            >
              SignUp
            </Button>
            <Button variant="subtle" onClick={() => navigate("/login")}>
              Login
            </Button>
          </>
        )}
        {user && (
          <>
            <Button
              variant="subtle"
              loading={isPending}
              onClick={() => navigate("/profile")}
            >
              Profile
            </Button>
            <Button
              variant="subtle"
              loading={isPending}
              onClick={() => mutate()}
            >
              Logout
            </Button>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
