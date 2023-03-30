import React, { useEffect, useState } from "react";
import { useRecommends } from "../../store/recommend-provider";
import Loader from "../../UI/Loader";
import FormatDateTime from "../../helper/formatDateTime";
import { Modal } from "react-bootstrap";
import {
  createCurrencyAPI,
  createProductTypeAPI, deleteCurrencyAPI,
  deleteProductTypeAPI, updateCurrencyAPI,
  updateProductTypeAPI,
} from "../../api/investApi";
import { toast } from "react-toastify";

function Currencies() {
  const [currentItem, setCurrentItem] = useState(null);
  const [itemTitle, setItemTitle] = useState("");
  const [show, setShow] = useState(false);

  const { isLoading, currenciesList, getCurrenciesList } = useRecommends();

  useEffect(() => {
    getCurrenciesList();
  }, [getCurrenciesList]);

  const selectCurrentItem = (item) => {
    setCurrentItem(item);
    handleShowModal();
  };

  const handleCloseModal = () => {
    setShow(false);
    setCurrentItem(null);
    setItemTitle("");
  };
  const handleShowModal = () => setShow(true);

  const deleteItem = async (id) => {
    try {
      const res = await deleteCurrencyAPI(id);
      toast.success(res.data.message);
      getCurrenciesList();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addItem = async () => {
    if (currentItem) {
      try {
        const res = await updateCurrencyAPI(currentItem.id, itemTitle);
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        await createCurrencyAPI(itemTitle);
      } catch (error) {
        toast.error(error.message);
      }
    }

    getCurrenciesList();
    handleCloseModal();
    setItemTitle("");
  };

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <h5>Currencies list</h5>
        <button
          className="app-form-button-sm app-button-success mb-2"
          onClick={handleShowModal}
        >
          Add new currency
        </button>
        {isLoading && <Loader />}
        {!isLoading && (
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Updated At</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {currenciesList &&
                  currenciesList.map((item, id) => (
                  <tr key={id}>
                    <th scope="row">{id + 1}</th>
                    <td>{item.title}</td>
                    <td>
                      <FormatDateTime date={item.updated_at} type="DATE" />,{" "}
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
          <Modal.Title>
            {currentItem ? "Edit product type" : "Add new product type"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="app-form-control">
            <input
              defaultValue={currentItem ? currentItem.title : ""}
              onChange={(e) => setItemTitle(e.target.value)}
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
            <button
              className="app-form-button-sm app-button-success mx-2"
              onClick={addItem}
            >
              Add
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Currencies;
