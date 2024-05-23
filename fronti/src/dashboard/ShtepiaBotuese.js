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

const Shtepia = () => {
  const [shtepiaList, setShtepiaList] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [emri, setEmri] = useState("");
  const [adresa, setAdresa] = useState("");

  const [editIdShB, setEditIdShB] = useState("");
  const [editEmri, setEditEmri] = useState("");
  const [editAdresa, setEditAdresa] = useState("");

  useEffect(() => {
    fetchShtepiaList();
  }, []);

  const fetchShtepiaList = () => {
    axios
      .get(`https://localhost:7249/api/ShtepiaBotuese`)
      .then((result) => {
        setShtepiaList(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (shtepiaBotueseID) => {
    handleShow();
    axios
      .get(`https://localhost:7249/api/ShtepiaBotuese/${shtepiaBotueseID}`)
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
    if (
      window.confirm("Are you sure to delete this publishing house ") == true
    ) {
      axios
        .delete(`https://localhost:7249/api/ShtepiaBotuese/${shtepiaBotueseID}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("ShtepiaBotuese has been delete");
            setShtepiaList(
              shtepiaList.filter(
                (item) => item.shtepiaBotueseID !== shtepiaBotueseID
              )
            );
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleUpdate = () => {
    const url = `https://localhost:7249/api/ShtepiaBotuese/${editIdShB}`;
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
    const url = `https://localhost:7249/api/ShtepiaBotuese`;

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

  return (
    <Fragment>
      <ToastContainer />
      <Container>
        <Row className="flex flex-wrap -mx-2">
          <Col className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <input
              type="text"
              className="w-full bg-gray-100 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter name"
              value={emri}
              onChange={(e) => setEmri(e.target.value)}
            />
          </Col>
          <Col className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <input
              type="text"
              className="w-full bg-gray-100 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter adresa"
              value={adresa}
              onChange={(e) => setAdresa(e.target.value)}
            />
          </Col>
          <Col className="w-full px-2 mb-4">
            <button
              className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              onClick={() => handleSave()}
            >
              Submit
            </button>
          </Col>
        </Row>
      </Container>
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            {/* <th>Adresa</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {shtepiaList && shtepiaList.length > 0
            ? shtepiaList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    <td>{item.emri}</td>
                    {/* <td>{item.adresa}</td> */}
                    <td colSpan={2}>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(item.shtepiaBotueseID)}
                      >
                        Edit
                      </button>{" "}
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.shtepiaBotueseID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : "Loading.."}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="flex flex-wrap">
            <Col className="w-full sm:w-auto mb-3 sm:mb-0">
              <input
                type="text"
                className="w-full sm:w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter Name"
                value={editEmri}
                onChange={(e) => setEditEmri(e.target.value)}
              />
            </Col>
            <Col className="w-full sm:w-auto mb-3 sm:mb-0">
              <input
                type="text"
                className="w-full sm:w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter Address"
                value={editAdresa}
                onChange={(e) => setEditAdresa(e.target.value)}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Shtepia;
