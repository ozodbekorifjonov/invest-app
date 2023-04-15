import React from 'react';
import Logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth-provider';
import { ROLE_ADMIN, ROLE_CLIENT, ROLE_RM, USER_ROLE } from '../consts';

function Layout({ children }) {
  const { isLogged } = useAuth();

  const role = localStorage.getItem(USER_ROLE);
  const firstname = localStorage.getItem('firstname');
  const lastname = localStorage.getItem('lastname');

  const pathByUserRole = (path) => {
    switch (role) {
      case ROLE_ADMIN:
        return `/admin/${path}`;
      case ROLE_CLIENT:
        return `/client/${path}`;
      case ROLE_RM:
        return `/rm/${path}`;
      default:
        return '/';
    }
  };

  if (isLogged) {
    return (
      <section className="user-page">
        <div className="container-fluid">
          <div className="row">
            <div className="px-sm-2 px-0 bg-dark admin-layout-left">
              <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <Link
                  to="/"
                  className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                >
                  <span className="fs-5 d-none d-sm-inline">
                    <img className="logo" src={Logo} alt="logo" />
                  </span>
                </Link>
                <ul
                  className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                  id="menu"
                >
                  <li className="nav-item">
                    <Link to={pathByUserRole('ideas')} className="nav-link align-middle px-0">
                      <i className="fs-4 bi-lightbulb"></i>{' '}
                      <span className="ms-1 d-none d-sm-inline">Ideas</span>
                    </Link>
                  </li>
                  {(role === ROLE_ADMIN || role === ROLE_RM) && (
                    <>
                      <li className="nav-item">
                        <Link to={pathByUserRole('users')} className="nav-link align-middle px-0">
                          <i className="fs-4 bi-people"></i>{' '}
                          <span className="ms-1 d-none d-sm-inline">Users</span>
                        </Link>
                      </li>
                    </>
                  )}
                  {role === ROLE_RM && (
                    <>
                      <li className="nav-item">
                        <Link to={pathByUserRole('potential-customers')} className="nav-link align-middle px-0">
                          <i className="fs-4 bi-person-gear"></i>{' '}
                          <span className="ms-1 d-none d-sm-inline">Potential customers</span>
                        </Link>
                      </li>
                    </>
                  )}
                  {role === ROLE_CLIENT && (
                    <li className="nav-item">
                      <Link to={pathByUserRole('holdings')} className="nav-link align-middle px-0">
                        <i className="fs-4 bi-wallet2"></i>{' '}
                        <span className="ms-1 d-none d-sm-inline">My holdings</span>
                      </Link>
                    </li>
                  )}

                  {(role === ROLE_CLIENT || role === ROLE_ADMIN) && (
                    <li className="nav-item">
                      <Link to={pathByUserRole('rm-list')} className="nav-link align-middle px-0">
                        <i className="fs-4 bi-telephone"></i>{' '}
                        <span className="ms-1 d-none d-sm-inline">Contact RM</span>
                      </Link>
                    </li>
                  )}

                  {role === ROLE_ADMIN && (
                    <li className="nav-item">
                      <Link
                        to={pathByUserRole('product-types')}
                        className="nav-link align-middle px-0"
                      >
                        <i className="fs-4 bi-box"></i>{' '}
                        <span className="ms-1 d-none d-sm-inline">Product Types</span>
                      </Link>
                    </li>
                  )}
                  {role === ROLE_ADMIN && (
                    <li className="nav-item">
                      <Link
                        to={pathByUserRole('currencies')}
                        className="nav-link align-middle px-0"
                      >
                        <i className="fs-4 bi-currency-exchange"></i>{' '}
                        <span className="ms-1 d-none d-sm-inline">Currencies</span>
                      </Link>
                    </li>
                  )}
                  {role === ROLE_ADMIN && (
                    <li className="nav-item">
                      <Link to={pathByUserRole('countries')} className="nav-link align-middle px-0">
                        <i className="fs-4 bi-globe-americas"></i>{' '}
                        <span className="ms-1 d-none d-sm-inline">Countries</span>
                      </Link>
                    </li>
                  )}
                  {role === ROLE_ADMIN && (
                    <li className="nav-item">
                      <Link
                        to={pathByUserRole('risk-rating')}
                        className="nav-link align-middle px-0"
                      >
                        <i className="fs-4 bi-asterisk"></i>{' '}
                        <span className="ms-1 d-none d-sm-inline">Risk ratings</span>
                      </Link>
                    </li>
                  )}
                  {role === ROLE_ADMIN && (
                    <li className="nav-item">
                      <Link
                        to={pathByUserRole('instruments')}
                        className="nav-link align-middle px-0"
                      >
                        <i className="fs-4 bi-sliders"></i>{' '}
                        <span className="ms-1 d-none d-sm-inline">Instruments</span>
                      </Link>
                    </li>
                  )}
                  {role === ROLE_ADMIN && (
                    <li className="nav-item">
                      <Link
                        to={pathByUserRole('major-sector')}
                        className="nav-link align-middle px-0"
                      >
                        <i className="fs-4 bi-layers-fill"></i>{' '}
                        <span className="ms-1 d-none d-sm-inline">Major sectors</span>
                      </Link>
                    </li>
                  )}
                  {role === ROLE_ADMIN && (
                    <li className="nav-item">
                      <Link
                        to={pathByUserRole('minor-sector')}
                        className="nav-link align-middle px-0"
                      >
                        <i className="fs-4 bi-layers"></i>{' '}
                        <span className="ms-1 d-none d-sm-inline">Minor sectors</span>
                      </Link>
                    </li>
                  )}
                  {role === ROLE_ADMIN && (
                    <li className="nav-item">
                      <Link to={pathByUserRole('region')} className="nav-link align-middle px-0">
                        <i className="fs-4 bi-globe-americas"></i>{' '}
                        <span className="ms-1 d-none d-sm-inline">Regions</span>
                      </Link>
                    </li>
                  )}
                </ul>
                <div className="pb-4">
                  <Link
                    to="/profile"
                    className="d-flex align-items-center text-white text-decoration-none"
                    id="dropdownUser1"
                  >
                    <span className="d-none d-sm-inline mx-1">
                      {firstname} {lastname}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="py-3 admin-layout-right">{children}</div>
          </div>
        </div>
      </section>
    );
  }

  return children;
}

export default Layout;
