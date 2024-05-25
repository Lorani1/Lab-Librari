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

const Shtepia = () => {
  const [shtepiaList, setShtepiaList] = useState([]);
  const [filteredShtepiaList, setFilteredShtepiaList] = useState([]);
  const [show, setShow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [emri, setEmri] = useState("");
  const [adresa, setAdresa] = useState("");
  const [editIdShB, setEditIdShB] = useState("");
  const [editEmri, setEditEmri] = useState("");
  const [editAdresa, setEditAdresa] = useState("");

  const [emriFilter, setEmriFilter] = useState("");

  useEffect(() => {
    fetchShtepiaList();
  }, []);

  const fetchShtepiaList = () => {
    axios
      .get(`https://localhost:7101/api/ShtepiaBotuese`)
      .then((result) => {
        setShtepiaList(result.data);
        setFilteredShtepiaList(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (shtepiaBotueseID) => {
    setShow(true);
    axios
      .get(`https://localhost:7101/api/ShtepiaBotuese/${shtepiaBotueseID}`)
      .then((result) => {
        setEditEmri(result.data.emri);
        setEditAdresa(result.data.adresa);
        setEditIdShB(shtepiaBotueseID);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (shtepiaBotueseID) => {
    if (window.confirm("Are you sure to delete this publishing house?")) {
      axios
        .delete(`https://localhost:7101/api/ShtepiaBotuese/${shtepiaBotueseID}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("ShtepiaBotuese has been deleted");
            const updatedList = shtepiaList.filter(
              (item) => item.shtepiaBotueseID !== shtepiaBotueseID
            );
            setShtepiaList(updatedList);
            setFilteredShtepiaList(updatedList);
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleUpdate = () => {
    const url = `https://localhost:7101/api/ShtepiaBotuese/${editIdShB}`;
    const data = {
      shtepiaBotueseID: editIdShB,
      emri: editEmri,
      adresa: editAdresa,
    };
    axios
      .put(url, data)
      .then((result) => {
        setShow(false);
        fetchShtepiaList();
        clear();
        toast.success("ShtepiaBotuese has been updated");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleSave = () => {
    const url = `https://localhost:7101/api/ShtepiaBotuese`;

    const newData = {
      emri: emri,
      adresa: adresa,
    };

    axios
      .post(url, newData)
      .then((result) => {
        fetchShtepiaList();
        clear();
        toast.success("Publishing house has been added");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setEmri("");
    setAdresa("");
    setEditEmri("");
    setEditAdresa("");
    setEditIdShB("");
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setEmriFilter(value);
    filterFn(value);
  };

  const filterFn = (filterValue) => {
    if (filterValue.trim() === "") {
      setFilteredShtepiaList(shtepiaList);
    } else {
      const filteredData = shtepiaList.filter((el) => {
        return (el.emri?.toString() ?? "")
          .toLowerCase()
          .includes(filterValue.toLowerCase().trim());
      });
      setFilteredShtepiaList(filteredData);
    }
  };

  const sortResult = (prop, asc) => {
    const sortedData = [...filteredShtepiaList].sort((a, b) => {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    setFilteredShtepiaList(sortedData);
  };

  return (
    <Fragment>
      <ToastContainer />

      <Container className="py-5">
        <h1>ShtepiaBotuese List</h1>

        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Add New ShtepiaBotuese
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
              <th>Adresa</th>
            </tr>
          </thead>
          <tbody>
            {filteredShtepiaList.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No Data Found
                </td>
              </tr>
            ) : (
              filteredShtepiaList.map((item, key) => (
                <tr key={key}>
                  <td>{item.shtepiaBotueseID}</td>
                  <td>{item.emri}</td>
                  <td>{item.adresa}</td>
                  <td>
                    <Button
                      className="mr-2"
                      variant="warning"
                      onClick={() => handleEdit(item.shtepiaBotueseID)}
                    >
                      <BsFillPencilFill />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.shtepiaBotueseID)}
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
            <Modal.Title>Edit Publishing House</Modal.Title>
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
                <label>Address</label>
                <input
                  type="text"
                  value={editAdresa}
                  onChange={(e) => setEditAdresa(e.target.value)}
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
            <Modal.Title>Add New ShtepiaBotuese</Modal.Title>
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
                <label>Address</label>
                <input
                  type="text"
                  value={adresa}
                  onChange={(e) => setAdresa(e.target.value)}
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

export default Shtepia;
