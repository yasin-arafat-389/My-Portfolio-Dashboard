/* eslint-disable react/prop-types */
import { useContext } from "react";
import { authContext } from "../Contexts/AuthContext";
import useRole from "../Hooks/useRole";
import { Navigate } from "react-router-dom";
import Loader from "../Utilities/Loader/Loader";

const RestaurantHandlersRoute = ({ children }) => {
  const { user, loading } = useContext(authContext);
  const [role, isAdminLoading] = useRole();

  if (loading || isAdminLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user && role === "restaurant-handler") {
    return children;
  }

  return <Navigate state={location.pathname} to="/dashboard/overview" />;
};

export default RestaurantHandlersRoute;
