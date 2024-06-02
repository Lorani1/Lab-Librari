import React, { useState, useEffect, Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Table, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const Autori = () => {
  const [show, setShow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const [emri, setEmri] = useState('');
  const [mbiemri, setMbiemri] = useState('');
  const [nofka, setNofka] = useState('');
  const [gjinia, setGjinia] = useState('');
  const [data_E_Lindjes, setData_E_Lindjes] = useState('');
  const [nacionaliteti, setNacionaliteti] = useState('');

  const [editAutori_ID, setEditAutori_ID] = useState('');
  const [editEmri, setEditEmri] = useState('');
  const [editMbiemri, setEditMbiemri] = useState('');
  const [editNofka, setEditNofka] = useState('');
  const [editGjinia, setEditGjinia] = useState('');
  const [editData_E_Lindjes, setEditData_E_Lindjes] = useState('');
  const [editNacionaliteti, setEditNacionaliteti] = useState('');

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get(`https://localhost:7101/api/Autori/getAll`)
      .then((result) => {
        const authors = result.data;
        const promises = authors.map(author => {
          return axios.get(`https://localhost:7101/api/Autori/librat/${author.autori_ID}/count`)
            .then(res => ({ ...author, bookCount: res.data }));
        });

        Promise.all(promises)
          .then(authorsWithBookCounts => {
            setData(authorsWithBookCounts);
          })
          .catch(error => {
            console.error(error);
            toast.error("An error occurred while fetching book counts.");
          });
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while fetching data.");
      });
  }

  const handleEdit = (Autori_ID) => {
    handleShow();
    axios.get(`https://localhost:7101/api/Autori/getByID/${Autori_ID}`)
      .then((result) => {
        setEditEmri(result.data.emri);
        setEditMbiemri(result.data.mbiemri);
        setEditNofka(result.data.nofka);
        setEditGjinia(result.data.gjinia);
        setEditData_E_Lindjes(result.data.data_E_Lindjes);
        setEditNacionaliteti(result.data.nacionaliteti);
        setEditAutori_ID(Autori_ID);
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while fetching the author details.");
      });
  }

  const handleDelete = (autori_ID) => {
    if (window.confirm("Are you sure you want to delete?")) {
      axios.delete(`https://localhost:7101/api/Autori/delete/${autori_ID}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success('Author deleted successfully!');
            getData();
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("An error occurred while deleting the author.");
        });
    }
  };

  const handleUpdate = () => {
    const url = `https://localhost:7101/api/Autori/update/${editAutori_ID}`;
    const data = {
      'autori_ID': editAutori_ID,
      'emri': editEmri,
      'mbiemri': editMbiemri,
      'nofka': editNofka,
      'gjinia': editGjinia,
      'data_e_Lindjes': editData_E_Lindjes,
      'nacionaliteti': editNacionaliteti
    };

    axios.put(url, data).then((result) => {
      handleClose();
      getData();
      clear();
      toast.success("Author updated successfully!");
    })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while updating the author.");
      });
  };

  const handleSave = () => {
    const url = 'https://localhost:7101/api/Autori';
    const data = {
      'emri': emri,
      'mbiemri': mbiemri,
      'nofka': nofka,
      'gjinia': gjinia,
      'data_E_Lindjes': data_E_Lindjes,
      'nacionaliteti': nacionaliteti
    };

    axios.post(url, data)
      .then((result) => {
        getData();
        clear();
        toast.success('Author added successfully!');
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while adding the author.");
      });
  }

  const clear = () => {
    setEmri('');
    setMbiemri('');
    setNofka('');
    setGjinia('');
    setData_E_Lindjes('');
    setNacionaliteti('');
    setEditEmri('');
    setEditMbiemri('');
    setEditNofka('');
    setEditGjinia('');
    setEditData_E_Lindjes('');
    setEditNacionaliteti('');
    setEditAutori_ID('');
  }

  return (
    <Fragment>
      <ToastContainer />
      <Container fluid>
        <Row>
        <div className="d-flex justify-content-between mt-4 mb-4">
    <Button variant="primary" onClick={handleShowAddModal}>
      Shto Autor
    </Button>
    <Button
      variant="secondary"
      as={Link}
      to="/libri"
      className="ml-3"
    >
      Shko te Libri
    </Button>
  </div>
        </Row>
      </Container>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Emri</th>
            <th>Mbiemri</th>
            <th>Data E Lindjes</th>
            <th>Nacionaliteti</th>
            <th>Nofka</th>
            <th>Gjinia</th>
            <th>Books Written</th> 
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.autori_ID}>
              <td>{index + 1}</td>
              <td>{item.emri}</td>
              <td>{item.mbiemri}</td>
              <td>{item.data_E_Lindjes}</td>
              <td>{item.nacionaliteti}</td>
              <td>{item.nofka}</td>
              <td>{item.gjinia}</td>
              <td>{item.bookCount}</td>
              <td colSpan={2}>
                <button className="btn btn-warning" onClick={() => handleEdit(item.autori_ID)}>Update</button>
                &nbsp;
                <button className="btn btn-danger" onClick={() => handleDelete(item.autori_ID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Author</Modal.Title>
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
            <label>Data E Lindjes</label>
            <input type="date" className="form-control" value={editData_E_Lindjes} onChange={(e) => setEditData_E_Lindjes(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nacionaliteti</label>
            <input type="text" className="form-control" value={editNacionaliteti} onChange={(e) => setEditNacionaliteti(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nofka</label>
            <input type="text" className="form-control" value={editNofka} onChange={(e) => setEditNofka(e.target.value)} />
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Author</Modal.Title>
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
            <label>Data E Lindjes</label>
            <input type="date" className="form-control" value={data_E_Lindjes} onChange={(e) => setData_E_Lindjes(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nacionaliteti</label>
            <input type="text" className="form-control" value={nacionaliteti} onChange={(e) => setNacionaliteti(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Nofka</label>
            <input type="text" className="form-control" value={nofka} onChange={(e) => setNofka(e.target.value)} />
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Autori;

