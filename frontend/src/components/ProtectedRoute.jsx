import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roleRequired }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace/>;
  }

  // Wrong role
  if (user.role !== roleRequired) {
    return <Navigate to="/" replace/>;
  }

  return children;
}

export default ProtectedRoute;