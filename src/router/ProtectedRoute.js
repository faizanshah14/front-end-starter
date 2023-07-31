import React from "react";
import { Routes, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  

  return (
    <Routes
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate
            to={{ pathname: "/auth/sign-in", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
