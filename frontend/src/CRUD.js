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

const CRUD = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [emri, setEmri] = useState("");
  const [mbiemri, setMbiemri] = useState("");
  const [nrPersonal, setNrPersonal] = useState("");
  const [email, setEmail] = useState("");
  const [adresa, setAdresa] = useState("");
  const [statusi, setStatusi] = useState("");
  const [nrTel, setNrTel] = useState("");
  const [password, setPassword] = useState("");

  const [editId, setEditId] = useState("");
  const [editEmri, setEditEmri] = useState("");
  const [editMbiemri, setEditMbiemri] = useState("");
  const [editNrPersonal, setEditNrPersonal] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAdresa, setEditAdresa] = useState("");
  const [editStatusi, setEditStatusi] = useState("");
  const [editNrTel, setEditNrTel] = useState("");
  const [editPassword, setEditPassword] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get(`https://localhost:7101/api/Klient`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (id) => {
    handleShow();
    axios
      .get(`https://localhost:7101/api/Klient/${id}`)
      .then((result) => {
        setEditEmri(result.data.emri);
        setEditMbiemri(result.data.mbiemri);
        setEditNrPersonal(result.data.nrPersonal);
        setEditEmail(result.data.email);
        setEditAdresa(result.data.adresa);
        setEditStatusi(result.data.statusi);
        setEditNrTel(result.data.nrTel);
        setEditPassword(result.data.password);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this client?") == true) {
      axios
        .delete(`https://localhost:7101/api/Klient/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Client has been deleted");
            setData(data.filter((item) => item.id !== id));
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  const handleUpdate = () => {
    const url = `https://localhost:7101/api/Klient/${editId}`;
    const data = {
      id: editId,
      emri: editEmri,
      mbiemri: editMbiemri,
      nrPersonal: editNrPersonal,
      email: editEmail,
      adresa: editAdresa,
      statusi: editStatusi,
      nrTel: editNrTel,
      password: editPassword,
    };
    axios
      .put(url, data)
      .then((result) => {
        handleClose();
        getData();
        clear();
        toast.success("Client has been updated");
      })
      .catch((error) => {
        toast.success(error);
      });
  };
  const handleSave = () => {
    const url = "https://localhost:7101/api/Klient";
    const data = {
      emri: emri,
      mbiemri: mbiemri,
      nrPersonal: nrPersonal,
      email: email,
      adresa: adresa,
      statusi: statusi,
      nrTel: nrTel,
      password: password,
    };
    axios
      .post(url, data)
      .then((result) => {
        getData();
        clear();
        toast.success("Client has been addded");
      })
      .catch((error) => {
        toast.success(error);
      });
  };
  const clear = () => {
    setEmri("");
    setMbiemri("");
    setNrPersonal("");
    setEmail("");
    setAdresa("");
    setStatusi("");
    setNrTel("");
    setPassword("");
    setEditEmri("");
    setEditMbiemri("");
    setEditNrPersonal("");
    setEditEmail("");
    setEditAdresa("");
    setEditStatusi("");
    setEditNrTel("");
    setEditPassword("");
    setEditId("");
  };

  return (
    <Fragment>
      <ToastContainer />
      <Container fluid>
        <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Emri..."
              value={emri}
              onChange={(e) => setEmri(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Mbiemri..."
              value={mbiemri}
              onChange={(e) => setMbiemri(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="NrPersonal..."
              value={nrPersonal}
              onChange={(e) => setNrPersonal(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type="email"
              className="form-control"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Adresa..."
              value={adresa}
              onChange={(e) => setAdresa(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Statusi..."
              value={statusi}
              onChange={(e) => setStatusi(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Nr Tel..."
              value={nrTel}
              onChange={(e) => setNrTel(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Password"
              value={nrTel}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
          <Col>
            <button className="btn btn-primary" onClick={() => handleSave()}>
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
            <th>Emri</th>
            <th>Mbiemri</th>
            <th>nrPersonal</th>
            <th>email</th>
            <th>Adresa</th>
            <th>Statusi</th>
            <th>nrTel</th>
            <th>password</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.emri}</td>
                <td>{item.mbiemri}</td>
                <td>{item.nrPersonal}</td>
                <td>{item.email}</td>
                <td>{item.adresa}</td>
                <td>{item.statusi}</td>
                <td>{item.nrTel}</td>
                <td>{item.password}</td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
                &nbsp;
                <button
                  className="btn btn-primary"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">loading...</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Emri..."
                value={editEmri}
                onChange={(e) => setEditEmri(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Mbiemri..."
                value={editMbiemri}
                onChange={(e) => setEditMbiemri(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="NrPersonal..."
                value={editNrPersonal}
                onChange={(e) => setEditNrPersonal(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="email"
                className="form-control"
                placeholder="Email..."
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Adresa..."
                value={editAdresa}
                onChange={(e) => setEditAdresa(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Statusi..."
                value={editStatusi}
                onChange={(e) => setEditStatusi(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Nr Tel..."
                value={editNrTel}
                onChange={(e) => setEditNrTel(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Nr Tel..."
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
              />
            </Col>
            <Col>
              <button className="btn btn-primary">Submit</button>
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

export default CRUD;