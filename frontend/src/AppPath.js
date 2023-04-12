import React from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import SignIn from './pages/sign-in';
import ClientIdeas from './pages/client/client_ideas';
import { useAuth } from './store/auth-provider';
import AdminIdeas from './pages/admin/ideas/admin_ideas';
import RMIdeas from './pages/rm/rm_ideas';
import {
  ROLE_ADMIN,
  ROLE_CLIENT,
  ROLE_RM,
  PATH_ADMIN_IDEAS,
  PATH_RM_IDEAS,
  PATH_CLIENT_IDEAS,
  PATH_ADMIN_PRODUCT_TYPES,
  PATH_ADMIN_CURRENCIES,
  PATH_ADMIN_COUNTRIES,
  PATH_ADMIN_RISK_RATING,
  PATH_ADMIN_INSTRUMENTS,
  PATH_ADMIN_MAJOR_SECTOR,
  PATH_ADMIN_MINOR_SECTOR,
  PATH_ADMIN_REGION,
  PATH_ADMIN_USERS,
  PATH_ADMIN_IDEA_DETAILS,
} from './consts';
import Profile from './pages/profile';
import SignUp from './pages/sign-up';
import Recommend from './pages/recommend';
import ProductTypes from './pages/admin/product_types';
import Currencies from './pages/admin/currencies';
import Countries from './pages/admin/countries';
import RiskRating from './pages/admin/risk_rating';
import Instruments from './pages/admin/instruments';
import MajorSector from './pages/admin/major_sector';
import MinorSector from './pages/admin/minor_sector';
import Region from './pages/admin/region';
import User from './pages/admin/users';
import AdminIdeaDetails from './pages/admin/ideas/admin_ideas_details';

function ProtectedPath() {
  const { isLogged, role } = useAuth();
  const { pathname } = useLocation();

  if (!isLogged) {
    return <Navigate to="/sign-in" replaced />;
  }

  if (pathname === '/') {
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
      case PATH_ADMIN_IDEA_DETAILS:
        return <AdminIdeaDetails />;
      case PATH_ADMIN_PRODUCT_TYPES:
        return <ProductTypes />;
      case PATH_ADMIN_CURRENCIES:
        return <Currencies />;
      case PATH_ADMIN_COUNTRIES:
        return <Countries />;
      case PATH_ADMIN_RISK_RATING:
        return <RiskRating />;
      case PATH_ADMIN_INSTRUMENTS:
        return <Instruments />;
      case PATH_ADMIN_MAJOR_SECTOR:
        return <MajorSector />;
      case PATH_ADMIN_MINOR_SECTOR:
        return <MinorSector />;
      case PATH_ADMIN_REGION:
        return <Region />;
      case PATH_ADMIN_USERS:
        return <User />;

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

function AppPath() {
  return (
    <Routes>
      <Route path={'/'} element={ProtectedPath()} />
      <Route path={'/sign-in'} element={<SignIn />} />
      <Route path={'/sign-up'} element={<SignUp />} />
      <Route path={'/recommend'} element={<Recommend />} />
      <Route path={'/profile'} element={<Profile />} />
      <Route path={PATH_CLIENT_IDEAS} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_IDEAS} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_IDEA_DETAILS} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_PRODUCT_TYPES} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_CURRENCIES} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_COUNTRIES} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_RISK_RATING} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_INSTRUMENTS} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_MAJOR_SECTOR} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_MINOR_SECTOR} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_REGION} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_USERS} element={ProtectedPath()} />
      <Route path={PATH_RM_IDEAS} element={ProtectedPath} />
    </Routes>
  );
}

export default AppPath;
