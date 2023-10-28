import React, { useEffect, useState } from 'react';
import {
  createAboutUsAPI,
  deleteAboutUsAPI,
  deleteRegionAPI,
  updateAboutUsAPI,
} from '../../api/investApi';
import Loader from '../../UI/Loader';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRecommends } from '../../store/recommend-provider';

function AboutUs() {
  const [currentItem, setCurrentItem] = useState(null);
  const [itemContent, setItemContent] = useState('');
  const [show, setShow] = useState(false);

  const { isLoading, aboutUsList, getAboutUsList } = useRecommends();

  useEffect(() => {
    getAboutUsList();
  }, [getAboutUsList]);

  const handleShowModal = () => setShow(true);

  const selectCurrentItem = (item) => {
    setCurrentItem(item);
    handleShowModal();
  };

  const handleCloseModal = () => {
    setShow(false);
    setCurrentItem(null);
    setItemContent('');
  };

  const addItem = async () => {
    if (currentItem) {
      try {
        const res = await updateAboutUsAPI(currentItem.id, itemContent);
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        await createAboutUsAPI(itemContent);
      } catch (error) {
        toast.error(error.message);
      }
    }

    getAboutUsList();
    handleCloseModal();
    setItemContent('');
  };

  const deleteItem = async (id) => {
    try {
      const res = await deleteAboutUsAPI(id);
      toast.success(res.data.message);
      getAboutUsList();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="row">
      <div className="col-10 offset-1">
        <h5>About us</h5>
        {aboutUsList?.length === 0 && (
          <button className="app-form-button-sm app-button-success mb-2" onClick={handleShowModal}>
            Add new description
          </button>
        )}

        {isLoading && <Loader />}
        {!isLoading &&
          aboutUsList.map((item, i) => (
            <div key={i}>
              {item.content}
              <hr />
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
            </div>
          ))}
      </div>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentItem ? 'Edit description' : 'Add new description'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="app-form-control">
            <textarea
              id="content"
              name="content"
              rows="8"
              cols="50"
              maxLength="200"
              defaultValue={currentItem ? currentItem.content : ''}
              onChange={(e) => setItemContent(e.target.value)}
              placeholder="Content"
            ></textarea>
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

export default AboutUs;
