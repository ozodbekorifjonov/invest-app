import React from 'react';
import useAsyncLoader from '../../hooks/useAsyncLoader';
import { userListByRoleAPI } from '../../api/investApi';
import { ROLE_RM } from '../../consts';
import Loader from '../../UI/Loader';
import FormatDateTime from '../../helper/formatDateTime';

function ClientRms() {
  const { isLoading, data } = useAsyncLoader(userListByRoleAPI, ROLE_RM);
  const rmList = data?.data?.data;

  return (
    <div className="row">
      <div className="col-10 offset-1">
        <h5>Users list</h5>
        {isLoading && <Loader />}
        {!isLoading && (
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Email</th>
                <th scope="col">Telephone</th>
                <th scope="col">Role</th>
                <th scope="col">Updated At</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {rmList &&
                rmList.map((item, id) => (
                  <tr key={id}>
                    <th scope="row">{id + 1}</th>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                    <td>{item.telephone}</td>
                    <td>{item.role}</td>
                    <td>
                      <FormatDateTime date={item.updated_at} type="DATE" />,{' '}
                      <FormatDateTime date={item.updated_at} type="TIME" />
                    </td>
                    <td>
                      <a
                        className="app-form-button-sm app-button-success mx-1 text-decoration-none"
                        href={`tel:${item.telephone}`}
                      >
                        Call
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ClientRms;
