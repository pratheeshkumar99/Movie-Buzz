import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { UserContext } from "../context/userContext";
import { FaSpinner } from "react-icons/fa";

interface ProtectedRouteProps {
  Component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ Component }) => {
  const { user, loading, setUser } = useContext(UserContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-full w-full flex justify-center items-center">
        <FaSpinner className="animate-spin w-100 h-100 mt-2" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return <Component />;
};

export default ProtectedRoute;
