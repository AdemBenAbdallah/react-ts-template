import RequireUser from '@/core/components/RequiredUser';
import Layout from '@/core/layouts/Layout';
import React from 'react';
import { RouteObject } from 'react-router-dom';
import { Loadable } from './Loadable';
import { PATHS } from './path';

const HomePage = Loadable(React.lazy(() => import('../pages/home.page')));
const LoginPage = Loadable(React.lazy(() => import('../pages/auth/login.page')));
const RegisterPage = Loadable(React.lazy(() => import('../pages/auth/register.page')));
const EmailVerificationPage = Loadable(React.lazy(() => import('../pages/auth/verifyemail.page')));

const UnauthorizePage = Loadable(React.lazy(() => import('../pages/unauthorized.page')));
const ProfilePage = Loadable(React.lazy(() => import('../pages/profile.page')));

const authRoutes: RouteObject = {
  path: '*',
  children: [
    {
      path: PATHS.LOGIN,
      element: <LoginPage />,
    },
    {
      path: PATHS.REGISTER,
      element: <RegisterPage />,
    },
    {
      path: PATHS.VERIFY_EMAIL.INDEX,
      element: <EmailVerificationPage />,
      children: [
        {
          path: PATHS.VERIFY_EMAIL.VERIFY,
          element: <EmailVerificationPage />,
        },
      ],
    },
  ],
};

const normalRoutes: RouteObject = {
  path: '*',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: PATHS.PRROFILE,
      element: <RequireUser allowedRoles={['user', 'admin']} />,
      children: [
        {
          path: '',
          element: <ProfilePage />,
        },
      ],
    },
    {
      path: PATHS.UNAUTHORIZED,
      element: <UnauthorizePage />,
    },
  ],
};

const routes: RouteObject[] = [authRoutes, normalRoutes];

export default routes;
