import React, { useEffect, useState } from 'react';
import { useRecommends } from '../../store/recommend-provider';
import Loader from '../../UI/Loader';
import FormatDateTime from '../../helper/formatDateTime';
import { Modal } from 'react-bootstrap';
import {
  createMinorSectorAPI,
  deleteMinorSectorAPI,
  updateMinorSectorAPI,
} from '../../api/investApi';
import { toast } from 'react-toastify';

function MinorSector() {
  const [currentItem, setCurrentItem] = useState(null);
  const [itemName, setItemName] = useState('');
  const [show, setShow] = useState(false);

  const { isLoading, minorSectorList, getMinorSectorList } = useRecommends();

  useEffect(() => {
    getMinorSectorList();
  }, [getMinorSectorList]);

  const selectCurrentItem = (item) => {
    setCurrentItem(item);
    handleShowModal();
  };

  const handleCloseModal = () => {
    setShow(false);
    setCurrentItem(null);
    setItemName('');
  };
  const handleShowModal = () => setShow(true);

  const deleteItem = async (id) => {
    try {
      const res = await deleteMinorSectorAPI(id);
      toast.success(res.data.message);
      getMinorSectorList();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addItem = async () => {
    if (currentItem) {
      try {
        const res = await updateMinorSectorAPI(currentItem.id, itemName);
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        await createMinorSectorAPI(itemName);
      } catch (error) {
        toast.error(error.message);
      }
    }

    getMinorSectorList();
    handleCloseModal();
    setItemName('');
  };

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <h5>Minor sectors list</h5>
        <button className="app-form-button-sm app-button-success mb-2" onClick={handleShowModal}>
          Add new minor sector
        </button>
        {isLoading && <Loader />}
        {!isLoading && (
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Updated At</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {minorSectorList &&
                minorSectorList.map((item, id) => (
                  <tr key={id}>
                    <th scope="row">{id + 1}</th>
                    <td>{item.name}</td>
                    <td>
                      <FormatDateTime date={item.updated_at} type="DATE" />,{' '}
                      <FormatDateTime date={item.updated_at} type="TIME" />
                    </td>
                    <td>
                      <button
                        className="app-form-button-sm app-button-warning mx-1"
                        onClick={() => selectCurrentItem(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="app-form-button-sm app-button-danger"
                        onClick={() => deleteItem(item.id)}
                      >
                        Delete
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
          <Modal.Title>{currentItem ? 'Edit minor sector' : 'Add new minor sector'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="app-form-control">
            <input
              defaultValue={currentItem ? currentItem.name : ''}
              onChange={(e) => setItemName(e.target.value)}
              name="name"
              type="text"
              placeholder="Title"
            />
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="app-form-button-sm app-button-danger"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <button className="app-form-button-sm app-button-success mx-2" onClick={addItem}>
              Add
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default MinorSector;
