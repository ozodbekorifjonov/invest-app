import React from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import SignIn from "./pages/sign-in";
import ClientIdeas from "./pages/client/client_ideas";
import { useAuth } from "./store/auth-provider";
import AdminIdeas from "./pages/admin/admin_ideas";
import RMIdeas from "./pages/rm/rm_ideas";
import {
  ROLE_ADMIN,
  ROLE_CLIENT,
  ROLE_RM,
  PATH_ADMIN_IDEAS,
  PATH_RM_IDEAS,
  PATH_CLIENT_IDEAS,
  PATH_ADMIN_PRODUCT_TYPES,
  PATH_ADMIN_CURRENCIES,
} from "./consts";
import Profile from "./pages/profile";
import SignUp from "./pages/sign-up";
import Recommend from "./pages/recommend";
import ProductTypes from "./pages/admin/product_types";
import Currencies from "./pages/admin/currencies";

function ProtectedPath() {
  const { isLogged, role } = useAuth();
  const { pathname } = useLocation();

  if (!isLogged) {
    return <Navigate to="/sign-in" replaced />;
  }

  if (pathname === "/") {
    if (role === ROLE_CLIENT) {
      return <Navigate to={PATH_CLIENT_IDEAS} replaced />;
    }
    if (role === ROLE_ADMIN) {
      return <Navigate to={PATH_ADMIN_IDEAS} replaced />;
    }
    if (role === ROLE_RM) {
      return <Navigate to={PATH_RM_IDEAS} replaced />;
    }
  }

  // paths for Client
  if (role === ROLE_CLIENT) {
    switch (pathname) {
      case PATH_CLIENT_IDEAS:
        return <ClientIdeas />;
      default:
        return <Navigate to={PATH_CLIENT_IDEAS} replaced />;
    }
  }

  // paths for Admin
  if (role === ROLE_ADMIN) {
    switch (pathname) {
      case PATH_ADMIN_IDEAS:
        return <AdminIdeas />;
      case PATH_ADMIN_PRODUCT_TYPES:
        return <ProductTypes />;
      case PATH_ADMIN_CURRENCIES:
        return <Currencies />;

      default:
        return <Navigate to={PATH_ADMIN_IDEAS} replaced />;
    }
  }

  // paths for RM
  if (role === ROLE_RM) {
    switch (pathname) {
      case PATH_RM_IDEAS:
        return <RMIdeas />;
      default:
        return <Navigate to={PATH_RM_IDEAS} replaced />;
    }
  }

  return <Outlet />;
}

function AppPath(props) {
  return (
    <Routes>
      <Route path={"/"} element={ProtectedPath()} />
      <Route path={"/sign-in"} element={<SignIn />} />
      <Route path={"/sign-up"} element={<SignUp />} />
      <Route path={"/recommend"} element={<Recommend />} />
      <Route path={"/profile"} element={<Profile />} />
      <Route path={PATH_CLIENT_IDEAS} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_IDEAS} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_PRODUCT_TYPES} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_CURRENCIES} element={ProtectedPath()} />
      <Route path={PATH_RM_IDEAS} element={ProtectedPath()} />
    </Routes>
  );
}

export default AppPath;
