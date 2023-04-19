import React from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import SignIn from './pages/sign-in';
import ClientIdeas from './pages/client/client_ideas';
import { useAuth } from './store/auth-provider';
import AdminIdeas from './pages/admin/ideas/admin_ideas';
import {
  PATH_ADMIN_COUNTRIES,
  PATH_ADMIN_CURRENCIES,
  PATH_ADMIN_IDEA_CREATE,
  PATH_ADMIN_IDEA_DETAILS,
  PATH_ADMIN_IDEAS,
  PATH_ADMIN_INSTRUMENTS,
  PATH_ADMIN_MAJOR_SECTOR,
  PATH_ADMIN_MINOR_SECTOR,
  PATH_ADMIN_PRODUCT_TYPES,
  PATH_ADMIN_REGION,
  PATH_ADMIN_RISK_RATING,
  PATH_ADMIN_USERS,
  PATH_CLIENT_HOLDINGS,
  PATH_CLIENT_IDEA_DETAILS,
  PATH_CLIENT_IDEA_RECOMMENDED_BY_RM,
  PATH_CLIENT_IDEAS,
  PATH_CLIENT_RM_LIST,
  PATH_RM_IDEA_DETAILS,
  PATH_RM_IDEAS,
  PATH_RM_POTENTIAL_CLIENTS,
  PATH_RM_USERS,
  ROLE_ADMIN,
  ROLE_CLIENT,
  ROLE_RM,
  USER_ROLE,
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
import AdminIdeaCreate from './pages/admin/ideas/admin_idea_create';
import ClientIdeaDetails from './pages/client/client_idea_details';
import ClientHoldings from './pages/client/client_holdings';
import ClientRms from './pages/client/client_rms';
import { RMIdeas } from './pages/rm/rm_ideas';
import RmUsers from './pages/rm/rm_users';
import RmIdeaDetails from './pages/rm/rm_idea_details';
import RmPossibleClients from './pages/rm/rm_possible_clients';
import ClientRecommendedIdeas from './pages/client/client_recommended_ideas';

function ProtectedPath() {
  const { isLogged } = useAuth();
  const role = localStorage.getItem(USER_ROLE);
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
      case PATH_CLIENT_IDEA_DETAILS:
        return <ClientIdeaDetails />;
      case PATH_CLIENT_HOLDINGS:
        return <ClientHoldings />;
      case PATH_CLIENT_RM_LIST:
        return <ClientRms />;
      case PATH_CLIENT_IDEA_RECOMMENDED_BY_RM:
        return <ClientRecommendedIdeas />;
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
      case PATH_ADMIN_IDEA_CREATE:
        return <AdminIdeaCreate />;
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
      case PATH_RM_USERS:
        return <RmUsers />;
      case PATH_RM_IDEA_DETAILS:
        return <RmIdeaDetails />;
      case PATH_RM_POTENTIAL_CLIENTS:
        return <RmPossibleClients />;
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
      <Route path={PATH_RM_IDEAS} element={ProtectedPath()} />
      <Route path={PATH_RM_USERS} element={ProtectedPath()} />
      <Route path={PATH_RM_IDEA_DETAILS} element={ProtectedPath()} />
      <Route path={PATH_RM_POTENTIAL_CLIENTS} element={ProtectedPath()} />
      <Route path={PATH_CLIENT_IDEAS} element={ProtectedPath()} />
      <Route path={PATH_CLIENT_IDEA_DETAILS} element={ProtectedPath()} />
      <Route path={PATH_CLIENT_HOLDINGS} element={ProtectedPath()} />
      <Route path={PATH_CLIENT_RM_LIST} element={ProtectedPath()} />
      <Route path={PATH_CLIENT_IDEA_RECOMMENDED_BY_RM} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_IDEAS} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_IDEA_DETAILS} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_IDEA_CREATE} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_PRODUCT_TYPES} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_CURRENCIES} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_COUNTRIES} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_RISK_RATING} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_INSTRUMENTS} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_MAJOR_SECTOR} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_MINOR_SECTOR} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_REGION} element={ProtectedPath()} />
      <Route path={PATH_ADMIN_USERS} element={ProtectedPath()} />
    </Routes>
  );
}

export default AppPath;
