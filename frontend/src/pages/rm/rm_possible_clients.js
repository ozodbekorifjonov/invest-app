import React from 'react';
import useAsyncLoader from '../../hooks/useAsyncLoader';
import { possibleClientsListAPI } from '../../api/investApi';
import { PATH_RM_IDEA_DETAILS, ROLE_RM } from '../../consts';
import Loader from '../../UI/Loader';

function RmPossibleClients() {
  const { isLoading, data } = useAsyncLoader(possibleClientsListAPI, ROLE_RM);
  let possibleClients = data?.data?.data;

  if (possibleClients) {
    possibleClients = Object.values(data?.data?.data);
  }

  return (
    <div className="row">
      <div className="col-10 offset-1">
        <h5>All possible clients list with ideas</h5>
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
                <th scope="col">Idea title</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {possibleClients &&
                possibleClients?.map((item, id) => (
                  <tr key={id}>
                    <th scope="row">{id + 1}</th>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>
                      <a href={`mailto:${item.email}`}>{item.email}</a>
                    </td>
                    <td>{item.telephone}</td>
                    <td>
                      {item.possible_ideas.map((kitem, k) => (
                        <a key={k} href={`${PATH_RM_IDEA_DETAILS}?id=${kitem.id}`}>
                          {kitem.title}
                        </a>
                      ))}
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

export default RmPossibleClients;
