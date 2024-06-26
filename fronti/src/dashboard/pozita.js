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

const Pozita = () => { 

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [roli, setRoli] = useState('');
    const [editPozita_ID, setEditPozita_ID] = useState('');
    const [editRoli, setEditRoli] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('https://localhost:7101/api/Pozita/KejtPozitat')
            .then((result) => {
                const data= result.data?.$values
                setData(data);
            })
            .catch((error) => {
                toast.error(error.message); // Extracting the error message
            });
    }

    const handleEdit = (Pozita_ID) => {
        handleShow();
        axios.get(`https://localhost:7101/api/Pozita/${Pozita_ID}`)
            .then((result) => {
                console.log(result.data.roli);
                setEditRoli(result.data.roli);
                setEditPozita_ID(Pozita_ID);
            })
            .catch((error) => {
                toast.error(error.message); // Extracting the error message
            })
    }

    const handleDelete = (Pozita_ID) => {
        if (window.confirm("Are you sure to delete?") === true) {
            axios.delete(`https://localhost:7101/api/Pozita/delete/${Pozita_ID}`)
                .then((result) => {
                    if (result.status === 200) {
                        toast.success('Pozita u fshi!');
                        getData();
                    }
                })
                .catch((error) => {
                    toast.error(error.message); // Extracting the error message
                })
        }
    }

    const handleUpdate = () => {
        const url = `https://localhost:7101/api/Pozita/update/${editPozita_ID}`;
        const data = {
            'pozita_ID': editPozita_ID,
            'roli': editRoli
        };

        axios.put(url, data).then((result) => {
            handleClose();
            getData();
            clear();
            toast.success("Roli u mbishkrua!");
        })
            .catch((error) => {
                console.log(error);
                toast.error("An error occurred while updating the role.");
            });
    };

    const handleSave = () => {
        const url = 'https://localhost:7101/api/Pozita/add/ShtoPozita';
        const data = {
            'roli': roli
        }

        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Roli eshte shtuar!');
            })
            .catch((error) => {
                toast.error(error.message); // Extracting the error message
            })
    }

    const clear = () => {
        setRoli('');
        setEditPozita_ID('');
        setEditRoli('');
    }

    return (
        <Fragment>
            <ToastContainer />
            <Container>
                <Row>
                    <Col>
                        <input type="text" className="form-control" placeholder="Shkruani Rolin"
                            value={roli} onChange={(e) => setRoli(e.target.value)}
                        />
                    </Col>

                    <Col>
                        <button className="btn btn-primary" onClick={() => handleSave()}>Submit</button>
                    </Col>
                </Row>
            </Container>
            <br />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Pozita_ID</th>
                        <th>Roli</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {//conditions 
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.pozita_ID}</td>
                                        <td>{item.roli}</td>
                                        <td colSpan={2}>
                                            <button className="btn btn-primary" onClick={() => handleEdit(item.pozita_ID)}>Edit</button> &nbsp;
                                            <button className="btn btn-danger" onClick={() => handleDelete(item.pozita_ID)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            'Loading..'
                    }

                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifiko/Update Rolin.</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <input type="text" className="form-control" placeholder="Shkruani Rolin"
                                    value={editRoli} onChange={(e) => setEditRoli(e.target.value)}
                                />
                            </Col>
                        </Row>

                    </Container>
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
    )
}

export default Pozita;
