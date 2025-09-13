/** @format */

import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contextos/AuthContext";
import { TipoPapel } from "../tipos/Usuario";
import LoadingSpinner from "./Spinner";
import Spinner from "./Spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: TipoPapel[];
  redirectPath?: string;
  showLoading?: boolean;
}

const ProtectedRoute = ({
  children,
  allowedRoles = [],
  redirectPath = "/academia/login",
  showLoading = true,
}: ProtectedRouteProps) => {
  const { usuario, isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  // Se estiver carregando, mostra um spinner (opcional)
  if (showLoading) {
    return <Spinner />;
  }

  // Se não há usuário logado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Se há roles específicos requeridos
  if (allowedRoles.length > 0 && usuario) {
    // Verifica se o usuário tem algum dos roles permitidos
    const temAcesso = allowedRoles.includes(usuario.papel);

    if (!temAcesso) {
      // Redireciona para página não autorizada ou home
      return <Navigate to="/academia" replace />;
    }
  }

  // Se passou por todas as verificações, renderiza o children
  return <>{children}</>;
};

export default ProtectedRoute;
