import { userApi } from '@/api';
import FullScreenLoader from '@/core/components/FullScreenLoader';
import { useQuery } from '@tanstack/react-query';
import React, { useLayoutEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useAuthContext } from '../contexts/authProvider/useAuthContext';

type AuthMiddlewareProps = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const [cookies] = useCookies(['logged_in']);
  const authContext = useAuthContext();

  const {
    isLoading,
    data: user,
    isSuccess,
  } = useQuery({
    retry: 1,
    queryKey: ['authUser'],
    queryFn: () => userApi.getMe(),
    enabled: !!cookies,
    select: (data) => data.data.user,
  });

  useLayoutEffect(() => {
    if (user && isSuccess) {
      authContext.dispatch({
        type: 'SET_USER',
        payload: user,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (isLoading && cookies.logged_in) {
    return <FullScreenLoader />;
  }

  return children;
};

export default AuthMiddleware;
