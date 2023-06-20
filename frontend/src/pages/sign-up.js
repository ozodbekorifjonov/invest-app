import React, { useRef } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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

function SignUp() {
  const firstname = useRef();
  const lastname = useRef();
  const telephone = useRef();
  const email = useRef();
  const password = useRef();
  /*const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;*/

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const createUserAccount = async (e) => {
    e.preventDefault();

    /*if (!password.current.value.match(passwordRegEx))
      return toast.warning(
        'Password must be minimum 8 characters, at least 1 letter and 1 number.'
      );*/

    const newAccount = {
      firstname: firstname.current.value,
      lastname: lastname.current.value,
      telephone: telephone.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    const res = await signUp(newAccount);
    if (res.data.success) {
      navigate('/recommend');
    }
  };

  return (
    <BgDiv>
      <BoxDiv>
        <h4>Sign Up</h4>
        <form onSubmit={createUserAccount}>
          <div className="app-form-control">
            <input
              name="firstname"
              type="text"
              ref={firstname}
              required={true}
              placeholder="First Name"
            />
          </div>
          <div className="app-form-control">
            <input
              name="lastname"
              type="text"
              ref={lastname}
              required={true}
              placeholder="Last Name"
            />
          </div>
          <div className="app-form-control">
            <input
              name="telephone"
              type="tel"
              ref={telephone}
              required={true}
              placeholder="Telephone"
            />
          </div>
          <div className="app-form-control">
            <input name="email" type="email" ref={email} required={true} placeholder="Email" />
          </div>
          <div className="app-form-control">
            <input
              name="password"
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
            <span className="txt1">Already have an account? </span>
            <Link to="/sign-in">Sign in</Link>
          </div>
        </WarmDiv>
      </BoxDiv>
    </BgDiv>
  );
}

export default SignUp;
