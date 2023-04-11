import React, { useEffect, useState } from 'react';
import Loader from '../../UI/Loader';
import FormatDateTime from '../../helper/formatDateTime';
import { Modal } from 'react-bootstrap';
import { updateUserRoleAPI } from '../../api/investApi';
import { toast } from 'react-toastify';
import { useUsers } from '../../store/user-provider';

function User() {
  const [currentItem, setCurrentItem] = useState(null);
  const [show, setShow] = useState(false);
  const [role, setRole] = useState('oranges');

  const { isLoading, usersList, getUsersList } = useUsers();

  useEffect(() => {
    getUsersList();
  }, [getUsersList]);

  const selectCurrentItem = (item) => {
    setCurrentItem(item);
    handleShowModal();
  };

  const handleCloseModal = () => {
    setShow(false);
    setCurrentItem(null);
  };
  const handleShowModal = () => setShow(true);

  const editUserRole = async () => {
    try {
      console.log(currentItem);
      const res = await updateUserRoleAPI(currentItem.id, role);
      console.log(res);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }

    getUsersList();
    handleCloseModal();
  };

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
              {usersList &&
                usersList.map((item, id) => (
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
                      <button
                        className="app-form-button-sm app-button-warning mx-1"
                        onClick={() => selectCurrentItem(item)}
                      >
                        Edit role
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="app-form-control">
            <h5>
              {currentItem?.firstname} {currentItem?.lastname}
            </h5>
            <select
              onChange={(event) => setRole(event.target.value)}
              defaultValue={currentItem?.role}
            >
              <option value="CLIENT">Client</option>
              <option value="RM">RM</option>
            </select>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="app-form-button-sm app-button-danger"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <button className="app-form-button-sm app-button-success mx-2" onClick={editUserRole}>
              Add
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default User;
