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
  const [orari, setOrari] = useState("");
  const [nrTelefonit, setNrTelefonit] = useState("");
  const [gjinia, setGjinia] = useState("");

  const [editId, setEditId] = useState("");
  const [editEmri, setEditEmri] = useState("");
  const [editMbiemri, setEditMbiemri] = useState("");
  const [editNrPersonal, setEditNrPersonal] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAdresa, setEditAdresa] = useState("");
  const [editOrari, setEditOrari] = useState("");
  const [editNrTelefonit, setEditNrTelefonit] = useState("");
  const [editGjinia, setEditGjinia] = useState("");

  const klidata = [
    {
      id: 1,
      emri: "delfina",
      mbiemri: "plakolli",
      nrPersonal: 345678,
      email: "delfina@gmail.com",
      adresa: "Podujeve",
      orari: "weekend",
      nrTelefonit: 2345678,
      gjinia: "femer",
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get(`https://localhost:7165/api/Stafi`)
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
      .get(`https://localhost:7165/api/Stafi/${id}`)
      .then((result) => {
        setEditEmri(result.data.emri);
        setEditMbiemri(result.data.mbiemri);
        setEditNrPersonal(result.data.nrPersonal);
        setEditEmail(result.data.email);
        setEditAdresa(result.data.adresa);
        setEditOrari(result.data.orari);
        setEditNrTelefonit(result.data.nrTelefonit);
        setEditGjinia(result.data.gjinia);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this client?") == true) {
      axios
        .delete(`https://localhost:7165/api/Stafi/${id}`)
        .then((result) => {
          if (result.orari === 200) {
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
    const url = `https://localhost:7165/api/Stafi/${editId}`;
    const data = {
      id: editId,
      emri: editEmri,
      mbiemri: editMbiemri,
      nrPersonal: editNrPersonal,
      email: editEmail,
      adresa: editAdresa,
      orari: editOrari,
      nrTelefonit: editNrTelefonit,
      gjinia: editGjinia,
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
    const url = "https://localhost:7165/api/Stafi";
    const data = {
      emri: emri,
      mbiemri: mbiemri,
      nrPersonal: nrPersonal,
      email: email,
      adresa: adresa,
      orari: orari,
      nrTelefonit: nrTelefonit,
      gjinia: gjinia,
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
    setOrari("");
    setNrTelefonit("");
    setGjinia("");
    setEditEmri("");
    setEditMbiemri("");
    setEditNrPersonal("");
    setEditEmail("");
    setEditAdresa("");
    setEditOrari("");
    setEditNrTelefonit("");
    setEditGjinia("");
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
              placeholder="Orari..."
              value={orari}
              onChange={(e) => setOrari(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Nr Tel..."
              value={nrTelefonit}
              onChange={(e) => setNrTelefonit(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Gjinia..."
              value={gjinia}
              onChange={(e) => setGjinia(e.target.value)}
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
            <th>Orari</th>
            <th>NR. Telefonit</th>
            <th>Gjinia</th>
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
                <td>{item.orari}</td>
                <td>{item.nrTelefonit}</td>
                <td>{item.gjinia}</td>
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
                style={{ width: '130px'}}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Mbiemri..."
                value={editMbiemri}
                onChange={(e) => setEditMbiemri(e.target.value)}
                style={{ width: '130px'}}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="NrPersonal..."
                value={editNrPersonal}
                onChange={(e) => setEditNrPersonal(e.target.value)}
                style={{ width: '130px'}}
              />
            </Col>
            <Col>
              <input
                type="email"
                className="form-control"
                placeholder="Email..."
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                style={{ width: '130px'}}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Adresa..."
                value={editAdresa}
                onChange={(e) => setEditAdresa(e.target.value)}
                style={{ width: '130px'}}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Orari..."
                value={editOrari}
                onChange={(e) => setEditOrari(e.target.value)}
                style={{ width: '130px'}}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Nr Tel..."
                value={editNrTelefonit}
                onChange={(e) => setEditNrTelefonit(e.target.value)}
                style={{ width: '130px'}}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Nr Tel..."
                value={editGjinia}
                onChange={(e) => setEditGjinia(e.target.value)}
                style={{ width: '130px'}}
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
