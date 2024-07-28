import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../common/contexts/authProvider/useAuth";
import { RoutesType } from "../types";
import { PATHS } from "./path";

type Props = {
  route: RoutesType;
};

const RouteMiddleware = ({ route }: Props) => {
  const location = useLocation();
  const { token } = useAuth();

  const [passport, setPassport] = React.useState({
    requestIsFinished: false,
    userIsConnected: false,
  });

  useEffect(() => {
    if (route.isPrivate) {
      if (token) {
        setPassport({
          requestIsFinished: true,
          userIsConnected: true,
        });
      } else {
        setPassport({
          requestIsFinished: true,
          userIsConnected: false,
        });
      }
    } else {
      setPassport({
        requestIsFinished: true,
        userIsConnected: true,
      });
    }
  }, [location, route.isPrivate, token]);

  const getElement = () => {
    return route.component ? (
      <React.Suspense fallback={<div>Loading...</div>}>
        {React.createElement(route.component)}
      </React.Suspense>
    ) : (
      escapeRoute()
    );
  };

  const escapeRoute = () => {
    return <Navigate to={route.fallback ? route.fallback : PATHS.FALLBACK} />;
  };
  console.log(passport);
  return (
    <>
      {!route.isPrivate
        ? getElement()
        : passport.requestIsFinished &&
          (passport.userIsConnected ? getElement() : escapeRoute())}
    </>
  );
};

export default RouteMiddleware;
