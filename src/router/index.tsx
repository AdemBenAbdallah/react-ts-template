import Layout from '@/core/layouts/Layout';
import React from 'react';
import { RouteObject } from 'react-router-dom';
import { Loadable } from './Loadable';

const Home = Loadable(React.lazy(() => import('../pages/home.page')));
const Login = Loadable(React.lazy(() => import('../pages/auth/login.page')));

const authRoutes: RouteObject = {
  path: '*',
  children: [
    {
      path: 'login',
      element: <Login />,
    },
  ],
};

const normalRoutes: RouteObject = {
  path: '*',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Home />,
    },
  ],
};

const routes: RouteObject[] = [authRoutes, normalRoutes];

export default routes;
