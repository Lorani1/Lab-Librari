import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Button, Modal, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./styles.css";
const Zhanri = () => {
  const [zhanriList, setZhanriList] = useState([]);
  const [filteredZhanriList, setFilteredZhanriList] = useState([]);
  const [show, setShow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [emri, setEmri] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState("");
  const [editEmri, setEditEmri] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [emriFilter, setEmriFilter] = useState("");

  useEffect(() => {
    fetchZhanriList();
  }, []);

  const fetchZhanriList = () => {
    axios
      .get(`https://localhost:7101/api/Zhanri`)
      .then((result) => {
        console.log("API Response:", result.data); 
        if (Array.isArray(result.data)) {
          setZhanriList(result.data);
          setFilteredZhanriList(result.data);
        } else if (result.data.$values) {
          setZhanriList(result.data.$values);
          setFilteredZhanriList(result.data.$values);
        } else {
          console.error("Unexpected data format:", result.data);
          toast.error("Unexpected data format");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch data");
      });
  };

  const handleEdit = (id) => {
    setShow(true);
    axios
      .get(`https://localhost:7101/api/Zhanri/${id}`)
      .then((result) => {
        setEditEmri(result.data.emri);
        setEditDescription(result.data.description);
        setEditId(id);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch data");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this genre?")) {
      axios
        .delete(`https://localhost:7101/api/Zhanri/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Genre has been deleted");
            const updatedList = zhanriList.filter(
              (item) => item.zhanriId !== id
            );
            setZhanriList(updatedList);
            setFilteredZhanriList(updatedList);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to delete data");
        });
    }
  };

  const handleUpdate = () => {
    const url = `https://localhost:7101/api/Zhanri/${editId}`;
    const data = {
      zhanriId: editId,
      emri: editEmri,
      description: editDescription,
    };
    axios
      .put(url, data)
      .then((result) => {
        setShow(false);
        fetchZhanriList();
        clear();
        toast.success("Genre has been updated");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update data");
      });
  };

  const handleSave = () => {
    const url = "https://localhost:7101/api/Zhanri";
    const data = { emri: emri, description: description };
    axios
      .post(url, data)
      .then((result) => {
        fetchZhanriList();
        clear();
        toast.success("Genre has been added");
        setShowAddModal(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to save data");
      });
  };

  const clear = () => {
    setEmri("");
    setDescription("");
    setEditEmri("");
    setEditDescription("");
    setEditId("");
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setEmriFilter(value);
    filterFn(value);
  };

  const filterFn = (filterValue) => {
    if (filterValue.trim() === "") {
      setFilteredZhanriList(zhanriList);
    } else {
      const filteredData = zhanriList.filter((el) => {
        return (el.emri?.toString() ?? "")
          .toLowerCase()
          .includes(filterValue.toLowerCase().trim());
      });
      setFilteredZhanriList(filteredData);
    }
  };

  const sortResult = (prop, asc) => {
    const sortedData = [...filteredZhanriList].sort((a, b) => {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    setFilteredZhanriList(sortedData);
  };

  return (
    <Fragment>
      <ToastContainer />
      <Container className="py-5">
        <h1>Genre List</h1>
        <Button
          variant="custom"
          className="other-button"
          onClick={() => setShowAddModal(true)}
        >
          Add New Genre
        </Button>
        <Button
          variant="custom"
          as={Link}
          to="/libri"
          className="ml-3 other-button"
        >
          Go to Libri
        </Button>
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
              <th>
                Emri
                <Button variant="link" onClick={() => sortResult("emri", true)}>
                  Asc
                </Button>
                <Button
                  variant="link"
                  onClick={() => sortResult("emri", false)}
                >
                  Desc
                </Button>
              </th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredZhanriList) &&
            filteredZhanriList.length > 0 ? (
              filteredZhanriList.map((item, key) => (
                <tr key={key}>
                  <td>{item.zhanriId}</td>
                  <td>{item.emri}</td>
                  <td>{item.description}</td>
                  <td>
                    <Button
                      variant="custom"
                      onClick={() => handleEdit(item.zhanriId)}
                      className="mr-2 edit-button"
                    >
                      <BsFillPencilFill />
                    </Button>
                    <Button
                      variant="custom"
                      onClick={() => handleDelete(item.zhanriId)}
                      className="mr-2 delete-button"
                    >
                      <BsFillTrashFill />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data available</td>
              </tr>
            )}
          </tbody>
        </Table>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Genre</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <label>Name</label>
                <input
                  type="text"
                  value={editEmri}
                  onChange={(e) => setEditEmri(e.target.value)}
                  className="form-control"
                />
              </Col>
              <Col>
                <label>Description</label>
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="form-control"
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="custom"
              className="edit-button"
              onClick={() => setShow(false)}
            >
              Close
            </Button>
            <Button
              variant="custom"
              className="delete-button"
              onClick={handleUpdate}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Genre</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <label>Name</label>
                <input
                  type="text"
                  value={emri}
                  onChange={(e) => setEmri(e.target.value)}
                  className="form-control"
                />
              </Col>
              <Col>
                <label>Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="custom"
              className="edit-button"
              onClick={() => setShowAddModal(false)}
            >
              Close
            </Button>
            <Button
              variant="custom"
              className="delete-button"
              onClick={handleSave}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Fragment>
  );
};

export default Zhanri;
