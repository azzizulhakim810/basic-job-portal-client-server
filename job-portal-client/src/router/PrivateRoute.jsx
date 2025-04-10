import { useContext, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  // console.log(location);

  if (loading) {
    return (
      <span className="loading loading-spinner text-error text-6xl mx-auto flex justify-center items-center py-5 "></span>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/signin" state={location.pathname} />;
};

export default PrivateRoute;
