import { Navigate, Route } from "react-router-dom";
import { RoutesType } from "../types";
import RouteMiddleware from "./routeMiddleware";

export const routesRenderer = (routesList: Array<RoutesType>) => {
  return routesList.map((route: RoutesType, index: number) => (
    <Route
      key={index}
      path={route.path}
      element={<RouteMiddleware route={route} />}
    >
      {route.children && routesRenderer(route.children)}
      {route?.fallback && route.children && route.children.length > 0 && (
        <>
          <Route path={route.path} element={<Navigate to={route.fallback} />} />
          <Route path={"*"} element={<Navigate to={route.fallback} />} />
        </>
      )}
    </Route>
  ));
};
