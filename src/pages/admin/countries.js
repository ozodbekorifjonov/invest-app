import React, { useEffect, useState } from 'react';
import { useRecommends } from '../../store/recommend-provider';
import Loader from '../../UI/Loader';
import FormatDateTime from '../../helper/formatDateTime';
import { Modal } from 'react-bootstrap';
import { createCountryAPI, deleteCountryAPI, updateCountryAPI } from '../../api/investApi';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const ImgStyle = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

function Countries() {
  const [currentItem, setCurrentItem] = useState(null);
  const [itemName, setItemName] = useState(null);
  const [itemImage, setItemImage] = useState(null);
  const [show, setShow] = useState(false);

  const { isLoading, countriesList, getCountriesList } = useRecommends();

  useEffect(() => {
    getCountriesList();
  }, [getCountriesList]);

  const selectCurrentItem = (item) => {
    setCurrentItem(item);
    handleShowModal();
  };

  const handleCloseModal = () => {
    setShow(false);
    setCurrentItem(null);
    setItemName(null);
    setItemImage(null);
  };
  const handleShowModal = () => setShow(true);

  const deleteItem = async (id) => {
    try {
      const res = await deleteCountryAPI(id);
      toast.success(res.data.message);
      getCountriesList();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addItem = async () => {
    if (currentItem) {
      try {
        const image = itemImage ? itemImage : null;
        const res = await updateCountryAPI(currentItem.id, itemName, image);
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      if (!itemImage) {
        return;
      }
      try {
        await createCountryAPI(itemName, itemImage);
      } catch (error) {
        toast.error(error.message);
      }
    }

    getCountriesList();
    handleCloseModal();
    setItemName(null);
    setItemImage(null);
  };

  const handleChange = (e) => {
    if (e.target.files) {
      setItemImage(e.target.files[0]);
    }
  };

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <h5>Countries list</h5>
        <button className="app-form-button-sm app-button-success mb-2" onClick={handleShowModal}>
          Add new country
        </button>
        {isLoading && <Loader />}
        {!isLoading && (
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Flag</th>
                <th scope="col">Title</th>
                <th scope="col">Updated At</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {countriesList &&
                countriesList.map((item, id) => (
                  <tr key={id}>
                    <th scope="row">{id + 1}</th>
                    <td>
                      <ImgStyle
                        src={`${process.env.REACT_APP_API_URL}images/${item.image}`}
                        alt={item.name}
                      />
                    </td>
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
          <Modal.Title>{currentItem ? 'Edit country' : 'Add new country'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="app-form-control">
            <input
              defaultValue={currentItem ? currentItem.name : ''}
              onChange={(e) => setItemName(e.target.value)}
              name="name"
              type="text"
              placeholder="Name"
              required={!currentItem}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Default file input example
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={handleChange}
              required={!currentItem}
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

export default Countries;
