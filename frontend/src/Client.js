import React, { useState, useEffect, Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Client = () => {

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
  }, [])

  const getData = () => {
    axios.get('https://localhost:7165/api/Klient')
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.error();
      });
  }

  const handleEdit = (id) => {
    handleShow();
    axios.get(`https://localhost:7165/api/Klient/${id}`)
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
        toast.error(error);
      })
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete?") === true) {
      axios.delete(`https://localhost:7165/api/Klient/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success('Klienti u fshi!');
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        })
    }
  }

  const handleUpdate = () => {
    const url = `https://localhost:7165/api/Klient/${editId}`;
    const data = {
      'id': editId,
      'emri': editEmri,
      'mbiemri': editMbiemri,
      'nrPersonal': editNrPersonal,
      'email': editEmail,
      'adresa': editAdresa,
      'statusi': editStatusi,
      'nrTel': editNrTel,
      'password': editPassword,
    };

    axios.put(url, data).then((result) => {
      handleClose();
      getData();
      clear();
      toast.success("Libri u mbishkrua!");
    })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred while updating the author.");
      });
  };


  const handleSave = () => {
    if (
      !'emri' ||
      !'mbiemri' ||
      !'nrPersonal' ||
      !'email' ||
      !'adresa' ||
      !'statusi' ||
      !'nrTel' ||
      !'password'
    ) {
      // Display an alert if any required field is empty
      alert("Please fill up all the input fields.");
      return;
    }
    const url = "https://localhost:7165/api/Klient";
    const data = {
      'emri': emri,
      'mbiemri': mbiemri,
      'nrPersonal': nrPersonal,
      'email': email,
      'adresa': adresa,
      'statusi': statusi,
      'nrTel': nrTel,
      'password': password,
    };
    axios.post(url, data)
      .then((result) => {
        getData();
        clear();
        toast.success('Klienti eshte shtuar!');
      })
      .catch((error) => {
        toast.error(error);
      })
  }

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
  }

  return (
    <Fragment>
      <ToastContainer />
      <Container fluid>
        <Row className="flex flex-wrap -mx-2">
          <Col className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <input
              type="text"
              className="w-full bg-gray-100 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Emri..."
              value={emri}
              onChange={(e) => setEmri(e.target.value)}
            />
          </Col>
          <Col className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <input
              type="text"
              className="w-full bg-gray-100 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Mbiemri..."
              value={mbiemri}
              onChange={(e) => setMbiemri(e.target.value)}
            />
          </Col>
          <Col className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <input
              type="text"
              className="w-full bg-gray-100 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="NrPersonal..."
              value={nrPersonal}
              onChange={(e) => setNrPersonal(e.target.value)}
            />
          </Col>
          <Col className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <input
              type="email"
              className="w-full bg-gray-100 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
          <Col className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <input
              type="text"
              className="w-full bg-gray-100 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Adresa..."
              value={adresa}
              onChange={(e) => setAdresa(e.target.value)}
            />
          </Col>
          <Col className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <input
              type="text"
              className="w-full bg-gray-100 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Statusi..."
              value={statusi}
              onChange={(e) => setStatusi(e.target.value)}
            />
          </Col>
          <Col className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <input
              type="text"
              className="w-full bg-gray-100 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Nr Tel..."
              value={nrTel}
              onChange={(e) => setNrTel(e.target.value)}
            />
          </Col>
          <Col className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <input
              type="text"
              className="w-full bg-gray-100 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
          <Col className="w-full px-2 mb-4">
            <button
              className="bg-indigo-500 text-black py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
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
                <td colSpan={2}>
                  <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
                  <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            'Loading..'
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="flex flex-wrap">
            <Col className="w-full sm:w-auto mb-3 sm:mb-0">
              <input
                type="text"
                className="w-full sm:w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Emri..."
                value={editEmri}
                onChange={(e) => setEditEmri(e.target.value)}
              />
            </Col>
            <Col className="w-full sm:w-auto mb-3 sm:mb-0">
              <input
                type="text"
                className="w-full sm:w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Mbiemri..."
                value={editMbiemri}
                onChange={(e) => setEditMbiemri(e.target.value)}
              />
            </Col>
            <Col className="w-full sm:w-auto mb-3 sm:mb-0">
              <input
                type="text"
                className="w-full sm:w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="NrPersonal..."
                value={editNrPersonal}
                onChange={(e) => setEditNrPersonal(e.target.value)}
              />
            </Col>
            <Col className="w-full sm:w-auto mb-3 sm:mb-0">
              <input
                type="email"
                className="w-full sm:w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Email..."
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </Col>
            <Col className="w-full sm:w-auto mb-3 sm:mb-0">
              <input
                type="text"
                className="w-full sm:w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Adresa..."
                value={editAdresa}
                onChange={(e) => setEditAdresa(e.target.value)}
              />
            </Col>
            <Col className="w-full sm:w-auto mb-3 sm:mb-0">
              <input
                type="text"
                className="w-full sm:w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Statusi..."
                value={editStatusi}
                onChange={(e) => setEditStatusi(e.target.value)}
              />
            </Col>
            <Col className="w-full sm:w-auto mb-3 sm:mb-0">
              <input
                type="text"
                className="w-full sm:w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Nr Tel..."
                value={editNrTel}
                onChange={(e) => setEditNrTel(e.target.value)}
              />
            </Col>
            <Col className="w-full sm:w-auto mb-3 sm:mb-0">
              <input
                type="text"
                className="w-full sm:w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Password..."
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
              />
            </Col>
            <Col>
              <button className="btn btn-primary" onClick={() => handleSave()}>Submit</button>
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

export default Client;
