import React, { useRef } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth-provider';

const BoxDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
  padding: 55px 85px;
  width: 30%;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.1);

  h4 {
    font-size: 30px;
    color: #555;
    line-height: 1.2;
    text-align: center;
    padding-bottom: 20px;
  }
`;

const BgDiv = styled.div`
  background-color: #ebebeb;
  width: 100%;
  height: 100vh;
`;

const WarmDiv = styled.div`
  padding-top: 30px;

  .line-box {
    text-align: center;
    padding-bottom: 5px;
    font-size: 15px;
    line-height: 1.4;

    span {
      color: #999;
    }

    a {
      text-decoration: none;
      color: #0336ff;
    }
  }
`;

function SignIn() {
  const email = useRef();
  const password = useRef();

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const response = await signIn(email.current.value, password.current.value);
    if (response.success) {
      navigate('/');
    }
  };

  return (
    <BgDiv>
      <BoxDiv>
        <h4>Account Login</h4>
        <form onSubmit={loginUser}>
          <div className="app-form-control">
            <input name="email" type="email" ref={email} required={true} placeholder="Email" />
          </div>
          <div className="app-form-control">
            <input
              name="pass"
              type="password"
              ref={password}
              required={true}
              placeholder="Password"
            />
          </div>
          <button className="app-form-button app-button-primary w-100">Submit</button>
        </form>
        <WarmDiv>
          <div className="line-box">
            <span className="txt1">Create an account? </span>
            <Link to="/sign-up">Sign up</Link>
          </div>
        </WarmDiv>
      </BoxDiv>
    </BgDiv>
  );
}

export default SignIn;
