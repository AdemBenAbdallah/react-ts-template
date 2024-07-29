import { authApi } from '@/api';
import FullScreenLoader from '@/core/components/FullScreenLoader';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useAuthContext } from '../contexts/authProvider/useAuthContext';

type AuthMiddlewareProps = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const [cookies] = useCookies(['logged_in']);
  const authContext = useAuthContext();

  const { isLoading, data: user } = useQuery({
    retry: 1,
    queryKey: ['authUser'],
    queryFn: () => authApi.getMe(),
    select: (data) => data.data.user,
  });

  useEffect(() => {
    if (user) {
      authContext.dispatch({
        type: 'SET_USER',
        payload: user,
      });
    }
  }, [user, authContext]);

  if (isLoading && cookies.logged_in) {
    return <FullScreenLoader />;
  }

  return children;
};

export default AuthMiddleware;
