import { useNavigate } from 'react-router-dom';

const useNavigateTo = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string, params?: Record<string, string>) => {
    const url = new URL(path, window.location.href);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }
    navigate(url.pathname + url.search);
  };

  return navigateTo;
};

export default useNavigateTo;
