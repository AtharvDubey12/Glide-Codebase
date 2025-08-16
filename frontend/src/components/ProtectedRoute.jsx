import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("token");

  if (!user) {
    return <Navigate to="/authentication" replace />;
  }

  return children;
};

export default ProtectedRoute;