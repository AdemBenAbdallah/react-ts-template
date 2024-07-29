import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <AppShell>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
