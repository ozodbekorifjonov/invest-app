import React from 'react';
import Cover from './Cover';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const HeaderBox = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  box-shadow: inset 0px -70px 60px 0px rgba(0, 0, 0, 1);
`;

const CenterBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  h3 {
    font-weight: 900;
    text-transform: uppercase;
  }

  .btn {
    border: 1px solid rgba(0, 0, 0, 0.8);

    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.8);
      color: white;
      background-color: rgba(0, 0, 0, 0.8);
    }
  }

  .btn-second-warning {
    background-color: #ffde03;
    color: #040001;
  }
`;

function Header() {
  return (
    <>
      <Cover />
      <HeaderBox>
        <Navbar />
        <CenterBox>
          <h3>
            Investing in your future today <br /> can secure a comfortable and stable financial
            tomorrow.
          </h3>
          <Link to="/ideas" className="btn btn-second-warning">
            See ideas
          </Link>
        </CenterBox>
      </HeaderBox>
    </>
  );
}

export default Header;
