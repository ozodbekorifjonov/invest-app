import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  PATH_ALL_IDEAS,
  PATH_BLOG,
  PATH_CONTACT_RM,
  PATH_HOLDINGS,
  PATH_NEW_IDEA,
} from '../consts';
import { useAuth } from '../store/auth-provider';

const NavbarBox = styled.div`
  position: relative;
  z-index: 10;
  backdrop-filter: blur(33px);
  background-blend-mode: overlay;
  background: rgba(255, 255, 255, 0.15);

  .navbar-brand {
    letter-spacing: 5px;
    font-weight: 600;
  }

  .nav-item {
    position: relative;
    color: rgba(0, 0, 0, 0.8);
    margin: 0 5px;
    border-radius: 5px;
    transition: all linear 0.2s;

    &:hover {
      text-decoration: underline;
    }

    .nav-link {
      color: black;
    }
  }

  .btn {
    border: 1px solid rgba(0, 0, 0, 0.8);

    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.8);
      color: white;
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
`;

function Navbar() {
  const { isLogged } = useAuth();
  const firstname = localStorage.getItem('firstname');
  const lastname = localStorage.getItem('lastname');

  return (
    <NavbarBox>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              INVEST APP
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#about-us">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={PATH_ALL_IDEAS}>
                    Ideas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={PATH_BLOG}>
                    Blog
                  </Link>
                </li>
                {isLogged && (
                  <li className="nav-item">
                    <Link className="nav-link" to={PATH_HOLDINGS}>
                      Holdings
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to={PATH_NEW_IDEA}>
                    New idea
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={PATH_CONTACT_RM}>
                    Contact RM
                  </Link>
                </li>
              </ul>
              <div className="d-flex">
                {isLogged ? (
                  <Link to={'/profile'}>
                    {firstname} {lastname}
                  </Link>
                ) : (
                  <Link to="/sign-in" className="btn">
                    Log In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </NavbarBox>
  );
}

export default Navbar;
