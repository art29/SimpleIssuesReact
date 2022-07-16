import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  return token ? (
    children
  ) : (
    <Navigate
      to="/signin"
      state={{ pathname: location.pathname, search: location.search }}
      replace
    />
  );
};

export default PrivateRoute;
