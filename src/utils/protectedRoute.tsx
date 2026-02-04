import { JSX } from "react";
import { useAuth } from "../context/authContext";
import Loading from "../components/loading";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;

  // Redirect user to '/' if not authenticated when trying to access protected routes
  // TODO: Change this entry route, add "/login" and "/signup", redirect users to "/login" instead of "/"
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}
