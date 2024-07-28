import React from "react";
import { RoutesType } from "../types";
import { PATHS } from "./path";

const Home = React.lazy(() => import("../pages/home.page"));
const Login = React.lazy(() => import("../pages/login.page"));
const Signup = React.lazy(() => import("../pages/Signup.page"));

const RoutePaths: Array<RoutesType> = [
  {
    path: PATHS.HOME.INDEX,
    component: Home,
    displayType: "ALL",
    isPrivate: false,
  },
  {
    path: PATHS.HOME.INDEX,
    component: Home,
    displayType: "ALL",
    isPrivate: false,
  },
  {
    path: PATHS.LOGIN,
    component: Login,
    displayType: "ALL",
    isPrivate: true,
  },
  {
    path: PATHS.SIGNUP,
    component: Signup,
    displayType: "ALL",
    isPrivate: false,
  },
];

export default RoutePaths;
