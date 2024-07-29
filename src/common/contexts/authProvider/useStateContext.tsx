import React from "react";
import { StateContext } from "./AuthProvider";

export const useAuthContext = () => {
  const context = React.useContext(StateContext);

  if (context) {
    return context;
  }

  throw new Error(`useStateContext must be used within a StateContextProvider`);
};
