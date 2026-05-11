import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

export default function PublicRoute({
  children
}: Props) {

  const { user } = useAuth();


  if (user) {

  
    if (user.role === "admin") {

      return <Navigate to="/dashboard" />;
    }

   
    return <Navigate to="/" />;
  }

 
  return children;
}