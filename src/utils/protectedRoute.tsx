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

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}
