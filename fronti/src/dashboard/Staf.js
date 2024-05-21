import React,{useState,useEffect, Fragment} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import  axios  from "axios";

import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Staf = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [emri, setEmri] = useState("");
    const [mbiemri, setMbiemri] = useState("");
    const [nrPersonal, setNrPersonal] = useState("");
    const [email, setEmail] = useState("");
    const [adresa, setAdresa] = useState("");
    const [orari, setOrari] = useState("");
    const [nrTelefonit, setNrTel] = useState("");
    const [gjinia, setGjinia] = useState("");
  
    const [editId, setEditId] = useState("");
    const [editEmri, setEditEmri] = useState("");
    const [editMbiemri, setEditMbiemri] = useState("");
    const [editNrPersonal, setEditNrPersonal] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editAdresa, setEditAdresa] = useState("");
    const [editOrari, setEditOrari] = useState("");
    const [editNrTel, setEditNrTel] = useState("");
    const [editGjinia, setEditGjinia] = useState("");
  
    const [data, setData] = useState([]);


    useEffect(()=>{
        getData();
    },[])
    
    const getData = () => {
        axios.get('https://localhost:7165/api/Stafi')
        .then((result) => {
            setData(result.data);
        })
        .catch((error) => {
            console.error();
        });
    }
    

    const handleEdit =(id) =>{
        handleShow();
        axios.get(`https://localhost:7165/api/Stafi/${id}`)
        .then((result)=>{
            setEditEmri(result.data.emri);
        setEditMbiemri(result.data.mbiemri);
        setEditNrPersonal(result.data.nrPersonal);
        setEditEmail(result.data.email);
        setEditAdresa(result.data.adresa);
        setEditOrari(result.data.orari);
        setEditNrTel(result.data.nrTelefonit);
        setEditGjinia(result.data.gjinia);
        setEditId(id);
            })
        .catch((error)=>{
                toast.error(error);
        })
    }
    
    const handleDelete =(id) =>{
        if(window.confirm("Are you sure to delete?")==true)
        {
            axios.delete(`https://localhost:7165/api/Stafi/${id}`)
            .then((result)=>{
                if(result.status === 200){
                    toast.success('Stafi u fshi!');
                    getData();
                }
            })
            .catch((error)=>{
                    toast.error(error);
            })
        }   
    }

    const handleUpdate = () => {
    const url = `https://localhost:7165/api/Stafi/${editId}`;
    const data = {
      'id': editId,
      'emri': editEmri,
      'mbiemri': editMbiemri,
      'nrPersonal': editNrPersonal,
      'email': editEmail,
      'adresa': editAdresa,
      'orari': editOrari,
      'nrTelefonit': editNrTel,
      'gjinia': editGjinia,
    };

    axios.put(url, data).then((result) => {
        handleClose();
        getData();
        clear();
        toast.success("Stafi u mbishkrua!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred while updating the author.");
      });
};


    const handleSave=()=>{
        const url ='https://localhost:7165/api/Stafi';
        const data={
           'emri': emri,
            'mbiemri': mbiemri,
            'nrPersonal': nrPersonal,
            'email': email,
            'adresa': adresa,
            'orari': orari,
            'nrTelefonit': nrTelefonit,
            'gjinia': gjinia,
        }

        axios.post(url,data)
        .then((result) =>{
            getData();
            clear();
            toast.success('Stafi eshte shtuar!');
        })
        .catch((error)=>{
            toast.error(error);
        })
    }

    const clear = ()=>{
        setEmri("");
        setMbiemri("");
        setNrPersonal("");
        setEmail("");
        setAdresa("");
        setOrari("");
        setNrTel("");
        setGjinia("");
        setEditEmri("");
        setEditMbiemri("");
        setEditNrPersonal("");
        setEditEmail("");
        setEditAdresa("");
        setEditOrari("");
        setEditNrTel("");
        setEditGjinia("");
        setEditId("");
    }

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
                  style={{width:'200px'}}
                />
              </Col>
              <Col>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mbiemri..."
                  value={mbiemri}
                  onChange={(e) => setMbiemri(e.target.value)}
                  style={{width:'200px'}}
                />
              </Col>
              <Col>
                <input
                  type="text"
                  className="form-control"
                  placeholder="NrPersonal..."
                  value={nrPersonal}
                  onChange={(e) => setNrPersonal(e.target.value)}
                  style={{width:'200px'}}
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
                  style={{width:'200px'}}
                />
              </Col>
              <Col>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Adresa..."
                  value={adresa}
                  onChange={(e) => setAdresa(e.target.value)}
                  style={{width:'200px'}}
                />
              </Col>
              <Col>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Orari..."
                  value={orari}
                  onChange={(e) => setOrari(e.target.value)}
                  style={{width:'200px'}}
                />
              </Col>
              <Col>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nr Tel..."
                  value={nrTelefonit}
                  onChange={(e) => setNrTel(e.target.value)}
                  style={{width:'200px'}}
                />
              </Col>
              <Col>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Gjinia"
                  value={gjinia}
                  onChange={(e) => setGjinia(e.target.value)}
                  style={{width:'200px'}}
                />
              </Col>
                <Col>
                    <button className="btn btn-primary" onClick={()=> handleSave()}>Submit</button>
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
      <th>nrTel</th>
      <th>Gjinia</th>
      <th>Actions</th> {/* Added a new column for actions */}
    </tr>
  </thead>
  <tbody>
    {data && data.length > 0 ? (
      data.map((item, index) => (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.emri}</td>
          <td>{item.mbiemri}</td>
          <td>{item.nrPersonal}</td>
          <td>{item.email}</td>
          <td>{item.adresa}</td>
          <td>{item.orari}</td>
          <td>{item.nrTelefonit}</td>
          <td>{item.gjinia}</td>
          <td>
            <Button variant="primary" onClick={() => handleEdit(item.id)}>Edit</Button>{' '}
            <Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="10">Loading...</td> {/* Colspan is set to the number of columns in the table */}
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
              style={{width:'130px'}}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Mbiemri..."
              value={editMbiemri}
              onChange={(e) => setEditMbiemri(e.target.value)}
              style={{width:'130px'}}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="NrPersonal..."
              value={editNrPersonal}
              onChange={(e) => setEditNrPersonal(e.target.value)}
              style={{width:'130px'}}
            />
          </Col>
          <Col>
            <input
              type="email"
              className="form-control"
              placeholder="Email..."
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              style={{width:'130px'}}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Adresa..."
              value={editAdresa}
              onChange={(e) => setEditAdresa(e.target.value)}
              style={{width:'130px'}}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Statusi..."
              value={editOrari}
              onChange={(e) => setEditOrari(e.target.value)}
              style={{width:'130px'}}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Nr Tel..."
              value={editNrTel}
              onChange={(e) => setEditNrTel(e.target.value)}
              style={{width:'130px'}}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Gjinia"
              value={editGjinia}
              onChange={(e) => setEditGjinia(e.target.value)}
              style={{width:'130px'}}
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

export default Staf;