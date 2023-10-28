import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAuth } from '../store/auth-provider';
import { useNavigate } from 'react-router-dom';

const TitleStyle = styled.div`
  h5 {
    color: #555;
  }
`;

function Profile() {
  const firstname_ref = useRef();
  const lastname_ref = useRef();
  const telephone_ref = useRef();
  const email_ref = useRef();
  const { userData, getUserData, updateUserData, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const handleChangeUserData = async (e) => {
    e.preventDefault();
    const firstname = firstname_ref.current.value || userData.firstname;
    const lastname = lastname_ref.current.value || userData.lastname;
    const telephone = telephone_ref.current.value || userData.telephone;
    const email = email_ref.current.value || userData.email;

    await updateUserData(userData.id, firstname, lastname, telephone, email);
  };

  const handleLogout = () => {
    logOut();
    navigate('/sign-in');
    navigate(0);
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-8 offset-2">
          <div className="row">
            <div className="col-4 offset-4">
              <h4>Profile settings</h4>
              <TitleStyle>
                <h5>Credentials</h5>
              </TitleStyle>
              <div>
                <form onSubmit={handleChangeUserData}>
                  <div className="app-form-control">
                    <input
                      name="firstname"
                      type="text"
                      defaultValue={userData?.firstname}
                      placeholder="First Name"
                      ref={firstname_ref}
                    />
                  </div>
                  <div className="app-form-control">
                    <input
                      name="lastname"
                      type="text"
                      defaultValue={userData?.lastname}
                      placeholder="Last Name"
                      ref={lastname_ref}
                    />
                  </div>

                  <div className="app-form-control">
                    <input
                      name="telephone"
                      type="text"
                      defaultValue={userData?.telephone}
                      placeholder="Telephone"
                      ref={telephone_ref}
                    />
                  </div>
                  <div className="app-form-control">
                    <input
                      name="email"
                      type="email"
                      defaultValue={userData?.email}
                      placeholder="Email"
                      ref={email_ref}
                    />
                  </div>
                  <button className="app-form-button app-button-primary w-100">Change</button>
                </form>
              </div>
            </div>
            <div className="col-4">
              <button onClick={handleLogout} className="app-form-button app-button-danger w-100">
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
