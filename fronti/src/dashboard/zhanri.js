import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const zhanri = () => {
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
        setZhanriList(result.data);
        setFilteredZhanriList(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (zhanriId) => {
    setShow(true);
    axios
      .get(`https://localhost:7101/api/Zhanri/${zhanriId}`)
      .then((result) => {
        setEditEmri(result.data.emri);
        setEditDescription(result.data.description);
        setEditId(zhanriId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (zhanriId) => {
    if (window.confirm("Are you sure to delete this genre?")) {
      axios
        .delete(`https://localhost:7101/api/Zhanri/${zhanriId}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Genre has been deleted");
            const updatedList = zhanriList.filter(
              (item) => item.zhanriId !== zhanriId
            );
            setZhanriList(updatedList);
            setFilteredZhanriList(updatedList);
          }
        })
        .catch((error) => {
          toast.error(error);
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
        toast.error(error);
      });
  };

  const handleSave = () => {
    const url = `https://localhost:7101/api/Zhanri`;

    const newData = {
      emri: emri,
      description: description,
    };

    axios
      .post(url, newData)
      .then((result) => {
        fetchZhanriList();
        clear();
        toast.success("Genre has been added");
      })
      .catch((error) => {
        toast.error(error);
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

        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Add New Genre
        </Button>
        <Button variant="secondary" as={Link} to="/libri" className="ml-3">
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
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredZhanriList.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No Data Found
                </td>
              </tr>
            ) : (
              filteredZhanriList.map((item, key) => (
                <tr key={key}>
                  <td>{item.zhanriId}</td>
                  <td>{item.emri}</td>
                  <td>{item.description}</td>
                  <td>
                    <Button
                      className="mr-2"
                      variant="warning"
                      onClick={() => handleEdit(item.zhanriId)}
                    >
                      <BsFillPencilFill />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.zhanriId)}
                    >
                      <BsFillTrashFill />
                    </Button>
                  </td>
                </tr>
              ))
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
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
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

export default zhanri;
