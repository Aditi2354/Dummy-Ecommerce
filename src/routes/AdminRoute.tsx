import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AdminRoute({
  children
}: Props) {

  const { user } = useAuth();

  
  if (!user) {

    return <Navigate to="/login" />;
  }

  
  if (user.role !== "admin") {

    return <Navigate to="/" />;
  }

 
  return children;
}