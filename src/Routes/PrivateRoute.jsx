/* eslint-disable react/prop-types */
import { useContext } from "react";
import { authContext } from "../Contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Utilities/Loader/Loader";
import toast from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(authContext);
  let location = useLocation();

  if (loading) return <Loader />;

  if (!user) {
    toast.error("You must login first");
    return <Navigate state={location.pathname} to="/login" />;
  }

  return <div>{children}</div>;
};

export default PrivateRoute;
