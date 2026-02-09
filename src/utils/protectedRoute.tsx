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

  // User is redirected to '/login' if unauthenticated
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
