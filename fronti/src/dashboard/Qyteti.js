import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Button, Modal, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Qyteti = () => {
  const [qytetiList, setQytetiList] = useState([]);
  const [filteredQytetiList, setFilteredQytetiList] = useState([]);
  const [show, setShow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [emri, setEmri] = useState("");
  const [editId, setEditId] = useState("");
  const [editEmri, setEditEmri] = useState("");

  const [emriFilter, setEmriFilter] = useState("");

  useEffect(() => {
    fetchQytetiList();
  }, []);

  const fetchQytetiList = () => {
    axios
      .get(`https://localhost:7101/api/Qyteti`)
      .then((result) => {
        setQytetiList(result.data);
        setFilteredQytetiList(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (id) => {
    setShow(true);
    axios
      .get(`https://localhost:7101/api/Qyteti/${id}`)
      .then((result) => {
        setEditEmri(result.data.emri);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this qyteti?")) {
      axios
        .delete(`https://localhost:7101/api/Qyteti/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Qyteti has been deleted");
            const updatedList = qytetiList.filter(
              (item) => item.id !== id
            );
            setQytetiList(updatedList);
            setFilteredQytetiList(updatedList);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const handleUpdate = () => {
    const url = `https://localhost:7101/api/Qyteti/${editId}`;
    const data = { id: editId, emri: editEmri };
    axios
      .put(url, data)
      .then((result) => {
        setShow(false);
        fetchQytetiList();
        clear();
        toast.success("Qyteti has been updated");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleSave = () => {
    const url = "https://localhost:7101/api/Qyteti";
    const data = { emri: emri };
    axios
      .post(url, data)
      .then((result) => {
        fetchQytetiList();
        clear();
        toast.success("Qyteti has been added");
        setShowAddModal(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const clear = () => {
    setEmri("");
    setEditEmri("");
    setEditId("");
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setEmriFilter(value);
    filterFn(value);
  };

  const filterFn = (filterValue) => {
    if (filterValue.trim() === "") {
      setFilteredQytetiList(qytetiList);
    } else {
      const filteredData = qytetiList.filter((el) => {
        return (el.emri?.toString() ?? "")
          .toLowerCase()
          .includes(filterValue.toLowerCase().trim());
      });
      setFilteredQytetiList(filteredData);
    }
  };

  const sortResult = (prop, asc) => {
    const sortedData = [...filteredQytetiList].sort((a, b) => {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    setFilteredQytetiList(sortedData);
  };

  return (
    <Fragment>
      <ToastContainer />
      <Container className="py-5">
      <h1>Qyteti List</h1>
  <div className="d-flex justify-content-between mt-4 mb-4">
    <Button variant="primary" onClick={() => setShowAddModal(true)}>
      Add Client
    </Button>
    <Button
      variant="secondary"
      as={Link}
      to="/klienti"
      className="ml-3"
    >
      Go to Klienti
    </Button>
        </div>
        <div className="ml-auto d-flex">
          <input
            className="form-control m-2"
            value={emriFilter}
            onChange={handleFilterChange}
            placeholder="Filter by Emri"
          />
          <button
            type="button"
            className="btn btn-light"
            onClick={() => sortResult("emri", true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-down-square-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
            </svg>
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => sortResult("emri", false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-up-square-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
            </svg>
          </button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQytetiList.map((qyteti) => (
              <tr key={qyteti.id}>
                <td>{qyteti.id}</td>
                <td>{qyteti.emri}</td>
                <td>
                  <Button
                    className="mr-2"
                    variant="warning"
                    onClick={() => handleEdit(qyteti.id)}
                  >
                    <BsFillPencilFill />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(qyteti.id)}
                  >
                    <BsFillTrashFill />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Qyteti</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Emri:</label>
            <input
              type="text"
              value={editEmri}
              onChange={(e) => setEditEmri(e.target.value)}
              className="form-control"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Qyteti</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Emri:</label>
            <input
              type="text"
              value={emri}
              onChange={(e) => setEmri(e.target.value)}
              className="form-control"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Fragment>
  );
};

export default Qyteti;
