import React, { useState, useEffect, Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Staf = () => {
  const [show, setShow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [pozitaList, setPozitaList] = useState([]);
  const [selectedPozita, setSelectedPozita] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const [emri, setEmri] = useState("");
  const [mbiemri, setMbiemri] = useState("");
  const [nrPersonal, setNrPersonal] = useState("");
  const [adresa, setAdresa] = useState("");
  const [orari, setOrari] = useState("");
  const [nrTelefonit, setNrTel] = useState("");
  const [gjinia, setGjinia] = useState("");
  const [active, setActive] = useState(1);
  const [data_E_Punesimit, setData_E_Punesimit] = useState("");
  const [data_E_doreheqjes, setData_E_doreheqjes] = useState("");

  const [editId, setEditId] = useState("");
  const [editEmri, setEditEmri] = useState("");
  const [editMbiemri, setEditMbiemri] = useState("");
  const [editNrPersonal, setEditNrPersonal] = useState("");
  const [editAdresa, setEditAdresa] = useState("");
  const [editOrari, setEditOrari] = useState("");
  const [editNrTel, setEditNrTel] = useState("");
  const [editGjinia, setEditGjinia] = useState("");
  const [editSelectedPozita_ID, setEditSelectedPozita_ID] = useState("");
  const [editActive, setEditActive] = useState(1);
  const [editData_E_Punesimit, setEditData_E_Punesimit] = useState("");
  const [editData_E_doreheqjes, setEditData_E_doreheqjes] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    getPozitatList(); // Fetch existing positions when component mounts
    getData();
  }, []);

  const getPozitatList = () => {
    axios.get('https://localhost:7101/api/Pozita/KejtPozitat')
      .then((result) => {
        setPozitaList(result.data?.$values);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getData = () => {
    axios.get('https://localhost:7101/api/Stafi')
      .then((result) => {
        setData(result.data?.$values);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch data!");
      });
  };

  const handleEdit = (id) => {
    handleShow();
    axios.get(`https://localhost:7101/api/Stafi/${id}`)
      .then((result) => {
        const { data } = result;
        const {
          emri, mbiemri, nrPersonal,adresa, orari, nrTelefonit, gjinia, pozita_ID, active, data_E_Punesimit, data_E_doreheqjes
        } = data;
        setEditId(id); 
        setEditEmri(emri);
        setEditMbiemri(mbiemri);
        setEditNrPersonal(nrPersonal);
        setEditAdresa(adresa);
        setEditOrari(orari);
        setEditNrTel(nrTelefonit);
        setEditGjinia(gjinia);
        setEditSelectedPozita_ID(pozita_ID);
        setEditActive(active);
        setEditData_E_Punesimit(data_E_Punesimit ? data_E_Punesimit.split('T')[0] : "");
        setEditData_E_doreheqjes(data_E_doreheqjes ? data_E_doreheqjes.split('T')[0] : "");
      })
      .catch((error) => {
        console.error("Error fetching staff data:", error);
        toast.error("Failed to fetch staff data for editing.");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete?") === true) {
      axios.delete(`https://localhost:7101/api/Stafi/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success('Stafi u fshi!');
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleUpdate = () => {
   
    if (!editId) {
      toast.error("Edit ID is not set.");
      return;
    }

    if (!editEmri || !editMbiemri || !editNrPersonal || !editAdresa || !editOrari || !editNrTel || !editGjinia || !editSelectedPozita_ID) {
      toast.error("All fields are required.");
      return;
    }

    const url = `https://localhost:7101/api/Stafi/update/${editId}`;
    const data = {
      id: editId,
      emri: editEmri,
      mbiemri: editMbiemri,
      nrPersonal: editNrPersonal,
      adresa: editAdresa,
      orari: editOrari,
      nrTelefonit: editNrTel,
      gjinia: editGjinia,
      pozita_ID: parseInt(editSelectedPozita_ID), 
      pozita: {
        pozita_ID: parseInt(editSelectedPozita_ID),
        roli: pozitaList.find((role) => role.pozita_ID === parseInt(editSelectedPozita_ID))?.roli || "",
      },
      active: editActive,
      data_E_Punesimit: editData_E_Punesimit,
      data_E_doreheqjes: editData_E_doreheqjes
    };

    console.log("Updating staff with ID:", editId);
    console.log("URL:", url);
    console.log("Payload data:", data);

    axios.put(url, data)
      .then((result) => {
        console.log("Update result:", result);
        if (result.status === 204) {
          handleClose();
          getData();
          clear();
          toast.success("Stafi has been updated");
        } else {
          toast.error("Failed to update stafi.");
        }
      })
      .catch((error) => {
        console.error("Error updating stafi:", error);
        toast.error("Failed to update stafi.");
      });
  };
  
  const handleSave = () => {
    // Validate input fields
    if (!emri || !mbiemri || !nrPersonal || !adresa || !orari || !nrTelefonit || !gjinia || !selectedPozita) {
      toast.error("All fields are required.");
      return;
    }
    const url = 'https://localhost:7101/api/Stafi/add';
    const data = {
      id: 0,
      emri: emri,
      mbiemri: mbiemri,
      nrPersonal: nrPersonal,
      adresa: adresa,
      orari: orari,
      nrTelefonit: nrTelefonit,
      gjinia: gjinia,
      pozita_ID: parseInt(selectedPozita),
      pozita: {
        pozita_ID: parseInt(selectedPozita),
        roli: pozitaList.find((role) => role.pozita_ID === parseInt(selectedPozita))?.roli || "",
      },
      active: active,
      data_E_Punesimit: data_E_Punesimit,
      data_E_doreheqjes: data_E_doreheqjes
    };

    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "/",
        },
      })
      .then((result) => {
        getData();
        clear();
        toast.success("Stafi has been added");
        handleCloseAddModal();
      })
      .catch((error) => {
        toast.error("Failed to add Stafi. Please try again.");
      });
  };

  const clear = () => {
    setEmri("");
    setMbiemri("");
    setNrPersonal("");
    setAdresa("");
    setOrari("");
    setNrTel("");
    setGjinia("");
    setSelectedPozita("");
    setActive(1);
    setData_E_Punesimit("");
    setData_E_doreheqjes("");

    setEditEmri("");
    setEditMbiemri("");
    setEditNrPersonal("");
    setEditAdresa("");
    setEditOrari("");
    setEditNrTel("");
    setEditGjinia("");
    setEditId("");
    setEditSelectedPozita_ID("");
    setEditActive(1);
    setEditData_E_Punesimit("");
    setEditData_E_doreheqjes("");
  };

  return (
    <Fragment>
      <ToastContainer />
      <Container fluid>
        <Row>
          <Col>
            <div className="text-left">
              <Link to="/pozita">
                <button className="btn btn-secondary">Go to Pozita</button>
              </Link>
            </div>
          </Col>
          <Col className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleShowAddModal}>+</button>
          </Col>
        </Row>
      </Container>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Emri</th>
            <th>Mbiemri</th>
            <th>Nr Personal</th>
            <th>Adresa</th>
            <th>Orari</th>
            <th>Nr Telefonit</th>
            <th>Gjinia</th>
            <th>Pozita</th>
            <th>Active</th>
            <th>Data e Punesimit</th>
            <th>Data e Doreheqjes</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.emri}</td>
              <td>{item.mbiemri}</td>
              <td>{item.nrPersonal}</td>
              <td>{item.adresa}</td>
              <td>{item.orari}</td>
              <td>{item.nrTelefonit}</td>
              <td>{item.gjinia}</td>
              <td>{item.pozita?.roli}</td>
              <td>{item.active ? "Yes" : "No"}</td>
              <td>{item.data_E_Punesimit ? item.data_E_Punesimit.split('T')[0] : ""}</td>
              <td>{item.data_E_doreheqjes ? item.data_E_doreheqjes.split('T')[0] : ""}</td>
              <td colSpan={2}>
                <button className="btn btn-warning" onClick={() => handleEdit(item.id)}>Update</button>
                &nbsp;
                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Stafi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Emri</label>
            <input type="text" className="form-control" value={editEmri} onChange={(e) => setEditEmri(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Mbiemri</label>
            <input type="text" className="form-control" value={editMbiemri} onChange={(e) => setEditMbiemri(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nr Personal</label>
            <input type="text" className="form-control" value={editNrPersonal} onChange={(e) => setEditNrPersonal(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Adresa</label>
            <input type="text" className="form-control" value={editAdresa} onChange={(e) => setEditAdresa(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Orari</label>
            <input type="text" className="form-control" value={editOrari} onChange={(e) => setEditOrari(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nr Telefonit</label>
            <input type="text" className="form-control" value={editNrTel} onChange={(e) => setEditNrTel(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Gjinia</label>
            <select className="form-control" value={editGjinia} onChange={(e) => setEditGjinia(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Pozita</label>
            <select className="form-control" value={editSelectedPozita_ID} onChange={(e) => setEditSelectedPozita_ID(e.target.value)}>
              <option value="">Select Position</option>
              {pozitaList.map((pozita) => (
                <option key={pozita.pozita_ID} value={pozita.pozita_ID}>{pozita.roli}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Active</label>
            <select className="form-control" value={editActive} onChange={(e) => setEditActive(e.target.value)}>
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>
          <div className="form-group">
            <label>Data e Punesimit</label>
            <input type="date" className="form-control" value={editData_E_Punesimit} onChange={(e) => setEditData_E_Punesimit(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Data e Doreheqjes</label>
            <input type="date" className="form-control" value={editData_E_doreheqjes} onChange={(e) => setEditData_E_doreheqjes(e.target.value)} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
            <label>Emri</label>
            <input type="text" className="form-control" value={emri} onChange={(e) => setEmri(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Mbiemri</label>
            <input type="text" className="form-control" value={mbiemri} onChange={(e) => setMbiemri(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nr Personal</label>
            <input type="text" className="form-control" value={nrPersonal} onChange={(e) => setNrPersonal(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Adresa</label>
            <input type="text" className="form-control" value={adresa} onChange={(e) => setAdresa(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Orari</label>
            <input type="text" className="form-control" value={orari} onChange={(e) => setOrari(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nr Telefonit</label>
            <input type="text" className="form-control" value={nrTelefonit} onChange={(e) => setNrTel(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Gjinia</label>
            <select className="form-control" value={gjinia} onChange={(e) => setGjinia(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Pozita</label>
            <select className="form-control" value={selectedPozita} onChange={(e) => setSelectedPozita(e.target.value)}>
              <option value="">Select Position</option>
              {pozitaList.map((pozita) => (
                <option key={pozita.pozita_ID} value={pozita.pozita_ID}>{pozita.roli}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Active</label>
            <select className="form-control" value={active} onChange={(e) => setActive(e.target.value)}>
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>
          <div className="form-group">
            <label>Data e Punesimit</label>
            <input type="date" className="form-control" value={data_E_Punesimit} onChange={(e) => setData_E_Punesimit(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Data e Doreheqjes</label>
            <input type="date" className="form-control" value={data_E_doreheqjes} onChange={(e) => setData_E_doreheqjes(e.target.value)} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Staf;