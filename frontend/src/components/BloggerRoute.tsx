import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { UserContext } from "../context/userContext";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";

interface BloggerRouteProps {
  Component: React.ComponentType;
}

const BloggerRoute: React.FC<BloggerRouteProps> = ({ Component }) => {
  const { user, loading, setUser } = useContext(UserContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-full w-full flex justify-center items-center">
        <FaSpinner className="animate-spin w-100 h-100 mt-2" />
      </div>
    );
  }

  if(user && user.role !== "blogger"){
    toast.error("Forbidden");
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }

  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return <Component />;
};

export default BloggerRoute;
