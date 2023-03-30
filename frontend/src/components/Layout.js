import React from "react";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth-provider";
import { ROLE_ADMIN, ROLE_CLIENT, ROLE_RM } from "../consts";

function Layout({ children }) {
  const { isLogged, role } = useAuth();

  const pathByUserRole = (path) => {
    switch (role) {
      case ROLE_ADMIN:
        return `/admin/${path}`;
      case ROLE_CLIENT:
        return `/client/${path}`;
      case ROLE_RM:
        return `/rm/${path}`;
      default:
        return "/";
    }
  };

  if (isLogged) {
    return (
      <section className="user-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
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
                    <Link
                      to={pathByUserRole("ideas")}
                      className="nav-link align-middle px-0"
                    >
                      <i className="fs-4 bi-lightbulb"></i>{" "}
                      <span className="ms-1 d-none d-sm-inline">Ideas</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={pathByUserRole("holdings")}
                      className="nav-link align-middle px-0"
                    >
                      <i className="fs-4 bi-wallet2"></i>{" "}
                      <span className="ms-1 d-none d-sm-inline">
                        My holdings
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={pathByUserRole("bank-details")}
                      className="nav-link align-middle px-0"
                    >
                      <i className="fs-4 bi bi-credit-card"></i>{" "}
                      <span className="ms-1 d-none d-sm-inline">
                        Bank details
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={pathByUserRole("contact")}
                      className="nav-link align-middle px-0"
                    >
                      <i className="fs-4 bi-telephone"></i>{" "}
                      <span className="ms-1 d-none d-sm-inline">
                        Contact RM
                      </span>
                    </Link>
                  </li>
                </ul>
                <hr />
                <div className="pb-4">
                  <Link
                    to="/profile"
                    className="d-flex align-items-center text-white text-decoration-none"
                    id="dropdownUser1"
                  >
                    <img
                      src="https://github.com/mdo.png"
                      alt="hugenerd"
                      width="30"
                      height="30"
                      className="rounded-circle"
                    />
                    <span className="d-none d-sm-inline mx-1">
                      Ozodbek Oripjonov
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col py-3">{children}</div>
          </div>
        </div>
      </section>
    );
  }

  return children;
}

export default Layout;
