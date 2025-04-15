import { useContext, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <span className="loading loading-spinner text-error text-6xl mx-auto flex justify-center items-center py-5 "></span>
    );
  }

  if (!user) {
    return <Navigate to="/signin" state={location.pathname} />;
    /*    return (
      <Navigate to="/signin" state={{ from: location.pathname }} replace />
    ); */
  }

  // return <Navigate to="/signin" state={location.pathname} />;
  return children;
};

export default PrivateRoute;
