import { userApi } from '@/api/auth/userApi';
import { useAuthContext } from '@/common/contexts/authProvider/useAuthContext';
import { useQuery } from '@tanstack/react-query';
import { useLayoutEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import FullScreenLoader from './FullScreenLoader';

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const [cookies] = useCookies(['logged_in']);
  const location = useLocation();
  const authContext = useAuthContext();

  const {
    isLoading,
    isFetching,
    data: user,
    isSuccess,
  } = useQuery({
    retry: 1,
    queryKey: ['authUser'],
    queryFn: () => userApi.getMe(),
    select: (data) => data.data.user,
  });

  useLayoutEffect(() => {
    if (user && isSuccess) {
      authContext.dispatch({ type: 'SET_USER', payload: user });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loading = isLoading || isFetching;

  if (loading) {
    return <FullScreenLoader />;
  }

  return (cookies.logged_in || user) && allowedRoles.includes(user?.role as string) ? (
    <Outlet />
  ) : cookies.logged_in && user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireUser;
