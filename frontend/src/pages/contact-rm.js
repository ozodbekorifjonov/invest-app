import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useAsyncLoader from '../hooks/useAsyncLoader';
import { userListByRoleAPI } from '../api/investApi';
import { ROLE_RM } from '../consts';
import Loader from '../UI/Loader';

function ContactRm() {
  const { isLoading, data } = useAsyncLoader(userListByRoleAPI, ROLE_RM);
  const rmList = data?.data?.data;
  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="row">
          <div className="col-10 offset-1">
            <h5>RMs list</h5>
            {isLoading && <Loader />}
            {!isLoading &&
              rmList &&
              rmList.map((item, id) => (
                <div key={id} className="col-4">
                  <div className="card">
                    <div className="card-header">
                      <h3>
                        {item.firstname} {item.lastname}
                      </h3>
                    </div>
                    <div className="card-body">
                      <a href={`mailto:${item.email}`}>{item.email}</a>
                      <h5>{item.telephone}</h5>
                    </div>
                    <div className="card-footer">
                      <a
                        className="app-form-button-sm app-button-success mx-1 text-decoration-none"
                        href={`tel:${item.telephone}`}
                      >
                        Call
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactRm;
