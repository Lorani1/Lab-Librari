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



const AUTORICRUD=()=>{

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

    const[emri,setEmri]=useState('')
    const[mbiemri,setMbiemri]=useState('')
    const[nofka,setNofka]=useState('')
    const[data_E_Lindjes,setData_E_Lindjes]=useState('')
    const[nacionaliteti,setNacionaliteti]=useState('')
    
    
    const[editAutori_ID,setEditAutori_ID]=useState('');
    const[editEmri,setEditEmri]=useState('')
    const[editMbiemri,setEditMbiemri]=useState('')
    const[editnofka,setEditNofka]=useState('')
    const[editData_E_Lindjes,setEditData_E_Lindjes]=useState('')
    const[editNacionaliteti,setEditNacionaliteti]=useState('')


    const [data, setData] = useState([]);


    useEffect(()=>{
        getData();
    },[])
    
    const getData = () => {
        axios.get('https://localhost:7165/api/Autori')
        .then((result) => {
            setData(result.data);
        })
        .catch((error) => {
            console.error();
        });
    }
    

    const handleEdit =(autori_ID) =>{
        handleShow();
        axios.get(`https://localhost:7165/api/Autori/${autori_ID}`)
        .then((result)=>{
            setEditEmri(result.data.emri);
            setEditMbiemri(result.data.mbiemri);
            setEditNofka(result.data.nofka);
            setEditData_E_Lindjes(result.data.data_E_Lindjes);
            setEditNacionaliteti(result.data.nacionaliteti);
            setEditAutori_ID(autori_ID);
            })
        .catch((error)=>{
                toast.error(error);
        })
    }
    
    const handleDelete =(autori_ID) =>{
        if(window.confirm("Are you sure to delete?")==true)
        {
            axios.delete(`https://localhost:7165/api/Autori/${autori_ID}`)
            .then((result)=>{
                if(result.status === 200){
                    toast.success('Autori u fshi!');
                    getData();
                }
            })
            .catch((error)=>{
                    toast.error(error);
            })
        }   
    }

    const handleUpdate = () => {
    const url = `https://localhost:7165/api/Autori/${editAutori_ID}`;
    const data = {
      'autori_ID': editAutori_ID,
      'emri': editEmri,
      'mbiemri': editMbiemri,
      'nofka': editnofka,
      'data_e_Lindjes': editData_E_Lindjes,
      'nacionaliteti': editNacionaliteti
    };

    axios.put(url, data).then((result) => {
        handleClose();
        getData();
        clear();
        toast.success("Autori u mbishkrua!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred while updating the author.");
      });
};


    const handleSave=()=>{
        const url ='https://localhost:7165/api/Autori';
        const data={
        'emri': emri,
        'mbiemri': mbiemri,
        'nofka': nofka,
        'data_E_Lindjes': data_E_Lindjes,
        'nacionaliteti': nacionaliteti
        }

        axios.post(url,data)
        .then((result) =>{
            getData();
            clear();
            toast.success('Autori eshte shtuar!');
        })
        .catch((error)=>{
            toast.error(error);
        })
    }

    const clear = ()=>{
        setEmri('');
        setMbiemri('');
        setNofka('');
        setData_E_Lindjes('');
        setNacionaliteti('');
        setEditEmri('');
        setEditMbiemri('');
        setEditNofka('');
        setEditData_E_Lindjes('');
        setEditNacionaliteti('');
        setEditAutori_ID('');
    }

    return(
        <Fragment>
            <ToastContainer/>
        <Container>
            <Row>
                <Col>
                    <input type="text" className="form-control" placeholder="Shkruani Emrin"
                    value={emri} onChange={(e)=> setEmri(e.target.value)}
                    />
                    
                </Col>
                <Col>
                    <input type="text" className="form-control" placeholder="Shkruani Mbiemrin"
                   value={mbiemri} onChange={(e)=> setMbiemri(e.target.value)}
                    />
                </Col>
                <Col>
                    <input type="text" className="form-control" placeholder="Shkruani nofken"
                     value={nofka} onChange={(e)=> setNofka(e.target.value)}
                    />
                </Col>
                <Col>
                    <input type="date" className="form-control" placeholder="Shkruani Daten_E_Lindjes"
                    value={data_E_Lindjes} onChange={(e)=> setData_E_Lindjes(e.target.value)}
                    />
                </Col>
                <Col>
                    <input type="text" className="form-control" placeholder="Shkruani Nacionalitetin "
                    value={nacionaliteti} onChange={(e)=> setNacionaliteti(e.target.value)}
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
          <th >Emri</th>
          <th>Mbiemri</th>
          <th>nofka</th>
          <th>Data_E_Lindjes</th>
          <th>Nacionaliteti</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {//conditions 
            data && data.length>0?
            data.map((item,index)=>{
                return(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.emri}</td>
                        <td>{item.mbiemri}</td>
                        <td>{item.nofka}</td>
                        <td>{item.data_E_Lindjes}</td>
                        <td>{item.nacionaliteti}</td>
                        <td colSpan={2}>
                            <button className="btn btn-primary" onClick={()=> handleEdit(item.autori_ID)}>Edit</button> &nbsp;
                            <button className="btn btn-danger"  onClick={()=> handleDelete(item.autori_ID)}>Delete</button>
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
                    <Modal.Title>Modifiko/Update Autorin.</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                <Container>
                <Row>
                    <Col>
                    <input type="text" className="form-control" placeholder="Shkruani Emrin"  
                     value={editEmri} onChange={(e)=> setEditEmri(e.target.value)}
                    />
                    </Col>
                </Row>
            <Row>
                <Col>
                    <input type="text" className="form-control" placeholder="Shkruani Mbiemrin"
                     value={editMbiemri} onChange={(e)=> setEditMbiemri(e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <input type="text" className="form-control" placeholder="Shkruani nofken"
                     value={editnofka} onChange={(e)=> setEditNofka(e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <input type="date" className="form-control" placeholder="Shkruani Daten_E_Lindjes"
                     value={editData_E_Lindjes} onChange={(e)=> setEditData_E_Lindjes(e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <input type="text" className="form-control" placeholder="Shkruani Nacionalitetin "
                     value={editNacionaliteti} onChange={(e)=> setEditNacionaliteti(e.target.value)}
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

export default AUTORICRUD;