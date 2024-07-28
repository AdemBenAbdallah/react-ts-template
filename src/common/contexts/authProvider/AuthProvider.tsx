import { InternalAxiosRequestConfig } from "axios";
import {
  ReactNode,
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { api } from "../../../services/api";

type CustomAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type AuthContextType = {
  token: string | null | undefined;
  setToken: (token: string | null | undefined) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | undefined | null>(undefined);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        // const response = await api.get("/get/me");
        const response = {
          data: {
            accessToken: "fakeToken",
          },
        };
        setToken(response.data.accessToken);
      } catch (error) {
        setToken(null);
      }
    };
    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        if (token && !config._retry) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response?.status === 403 &&
          error.response?.data?.message === "Unauthorized" &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const response = await api.get("/refresh");
            setToken(response.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return api(originalRequest);
          } catch (error) {
            setToken(null);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
