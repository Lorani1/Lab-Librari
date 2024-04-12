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

const Libri = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isbn, setIsbn] = useState("");
  const [titulli, setTitulli] = useState("");
  const [kategoria, setKategoria] = useState("");
  const [lloji, setLloji] = useState("");
  const [vitiPublikimit, setVitiPublikimit] = useState("");
  const [nrFaqeve, setNrFaqeve] = useState("");
  const [nrKopjeve, setNrkopjeve] = useState("");
  const [gjuha, setGjuha] = useState("");
  const [inStock, setInStock] = useState(0);

  const [editId, setEditId] = useState("");
  const [editIsbn, setEditIsbn] = useState("");
  const [editTitulli, setEditTitulli] = useState("");
  const [editKategoria, setEditKategoria] = useState("");
  const [editLloji, setEditLloji] = useState("");
  const [editVitiPublikimit, setEditVitiPublikimit] = useState("");
  const [editNrFaqeve, setEditNrFaqeve] = useState("");
  const [editNrKopjeve, setEditNrkopjeve] = useState("");
  const [editGjuha, setEditGjuha] = useState("");
  const [editInStock, setEditInStock] = useState(0);

  const bookdata = [
    {
      id: 1,
      isbn: "1-1-1",
      titulli: "T1",
      kategoria: "K1",
      lloji: "l1",
      vitiPublikimit: 2003,
      nrFaqeve: 20,
      nrKopjeve: 30,
      gjuha: "albanian",
      inStock: 0,
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`https://localhost:7011/api/Libri`)
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
      .get(`https://localhost:7011/api/Libri/${id}`)
      .then((result) => {
        setEditIsbn(result.data.isbn);
        setEditTitulli(result.data.titulli);
        setEditKategoria(result.data.kategoria);
        setEditLloji(result.data.lloji);
        setEditVitiPublikimit(result.data.vitiPublikimit);
        setEditNrFaqeve(result.data.nrFaqeve);
        setEditNrkopjeve(result.data.nrKopjeve);
        setEditGjuha(result.data.gjuha);
        setEditInStock(result.data.inStock);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this book") == true) {
      axios
        .delete(`https://localhost:7011/api/Libri/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Book has been deleted");
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleUpdate = () => {
    const url = `https://localhost:7011/api/Libri/${editId}`;
    const data = {
      id: editId,
      isbn: editIsbn,
      titulli: editTitulli,
      kategoria: editKategoria,
      lloji: editLloji,
      vitiPublikimit: editVitiPublikimit,
      nrFaqeve: editNrFaqeve,
      nrKopjev: editNrKopjeve,
      gjuha: editGjuha,
      inStock: editInStock,
    };

    axios
      .put(url, data)
      .then((result) => {
        handleClose();
        getData();
        clear();
        toast.success("Book has been updated");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleSave = () => {
    // Check if any required field is empty
    if (
      !isbn ||
      !titulli ||
      !kategoria ||
      !lloji ||
      !vitiPublikimit ||
      !nrFaqeve ||
      !nrKopjeve ||
      !gjuha
    ) {
      // Display an alert if any required field is empty
      alert("Please fill up all the input fields.");
      return;
    }

    // Proceed with saving if all fields are filled
    const url = `https://localhost:7011/api/Libri`;
    const data = {
      isbn: isbn,
      titulli: titulli,
      kategoria: kategoria,
      lloji: lloji,
      vitiPublikimit: vitiPublikimit,
      nrFaqeve: nrFaqeve,
      nrKopjeve: nrKopjeve,
      gjuha: gjuha,
      inStock: inStock,
    };

    // Make API call with the data
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // Handle response
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    axios
      .post(url, data)
      .then((result) => {
        getData();
        clear();
        toast.success("Book has been added");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setIsbn("");
    setTitulli("");
    setKategoria("");
    setLloji("");
    setVitiPublikimit("");
    setNrFaqeve("");
    setNrkopjeve("");
    setGjuha("");
    setInStock(0);

    setEditIsbn("");
    setEditTitulli("");
    setEditKategoria("");
    setEditLloji("");
    setEditVitiPublikimit("");
    setEditNrFaqeve("");
    setEditNrkopjeve("");
    setEditGjuha("");
    setEditInStock(0);
    setEditId("");
  };

  const handleActiveChange = (e) => {
    if (e.target.checked) {
      setInStock(1);
    } else {
      setInStock(0);
    }
  };

  const handleEditActiveChange = (e) => {
    if (e.target.checked) {
      setEditInStock(1);
    } else {
      setEditInStock(0);
    }
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
              placeholder="Enter ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
          </Col>
          <Col className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <input
              type="text"
              className="w-full bg-gray-100 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter Title"
              value={titulli}
              onChange={(e) => setTitulli(e.target.value)}
            />
          </Col>
          <Col className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <input
              type="text"
              className="w-full bg-gray-100 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter Category"
              value={kategoria}
              onChange={(e) => setKategoria(e.target.value)}
            />
          </Col>
          <Col className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <input
              type="text"
              className="w-full bg-gray-100 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter Type"
              value={lloji}
              onChange={(e) => setLloji(e.target.value)}
            />
          </Col>
          <Col className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <input
              type="text"
              className="w-full bg-gray-100 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter Year of Publication"
              value={vitiPublikimit}
              onChange={(e) => setVitiPublikimit(e.target.value)}
            />
          </Col>
          <Col className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <input
              type="text"
              className="w-full bg-gray-100 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter Number of Pages"
              value={nrFaqeve}
              onChange={(e) => setNrFaqeve(e.target.value)}
            />
          </Col>
          <Col className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <input
              type="text"
              className="w-full bg-red-100 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter Number of Copies"
              value={nrKopjeve}
              onChange={(e) => setNrkopjeve(e.target.value)}
            />
          </Col>
          <Col className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <input
              type="text"
              className="w-full bg-gray-100 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter Language"
              value={gjuha}
              onChange={(e) => setGjuha(e.target.value)}
            />
          </Col>
          <Col className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500 focus:outline-none focus:ring focus:border-blue-300"
              checked={inStock === 1 ? true : false}
              onChange={(e) => handleActiveChange(e)}
              value={inStock}
            />
            <label className="ml-2 text-gray-700"> Is the book in stock?</label>
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
            <th>ISBN</th>
            <th>Title</th>
            <th>Category</th>
            <th>Type</th>
            <th>Year of Publication</th>
            <th>Number of Pages</th>
            <th>Number of Copies</th>
            <th>Language</th>
            <th>In-Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0
            ? data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    <td>{item.isbn}</td>
                    <td>{item.titulli}</td>
                    <td>{item.kategoria}</td>
                    <td>{item.lloji}</td>
                    <td>{item.vitiPublikimit}</td>
                    <td>{item.nrFaqeve}</td>
                    <td>{item.nrKopjeve}</td>
                    <td>{item.gjuha}</td>
                    <td>{item.inStock}</td>
                    <td colSpan={2}>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>{" "}
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : "Loading..."}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify /Update Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="flex flex-wrap">
            <Col className="w-full sm:w-auto mb-3 sm:mb-0">
              <input
                type="text"
                className="w-full sm:w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter ISBN"
                value={editIsbn}
                onChange={(e) => setEditIsbn(e.target.value)}
              />
            </Col>
            <Col className="w-full sm:w-auto mb-3 sm:mb-0">
              <input
                type="text"
                className="w-full sm:w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter titulli"
                value={editTitulli}
                onChange={(e) => setEditTitulli(e.target.value)}
              />
            </Col>
            <Col className="w-full sm:w-auto mb-3 sm:mb-0">
              <input
                type="text"
                className="w-full sm:w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter kategoria"
                value={editKategoria}
                onChange={(e) => setEditKategoria(e.target.value)}
              />
            </Col>
            <Col className="w-full sm:w-auto mb-3 sm:mb-0">
              <input
                type="text"
                className="w-full sm:w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter lloji"
                value={editLloji}
                onChange={(e) => setEditLloji(e.target.value)}
              />
            </Col>
            <Col className="w-full sm:w-auto mb-3 sm:mb-0">
              <input
                type="text"
                className="w-full sm:w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter vitipublikimit"
                value={editVitiPublikimit}
                onChange={(e) => setEditVitiPublikimit(e.target.value)}
              />
            </Col>
            <Col className="w-full sm:w-auto mb-3 sm:mb-0">
              <input
                type="text"
                className="w-full sm:w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter nrFaqeve"
                value={editNrFaqeve}
                onChange={(e) => setEditNrFaqeve(e.target.value)}
              />
            </Col>
            <Col className="w-full sm:w-auto mb-3 sm:mb-0">
              <input
                type="text"
                className="w-full sm:w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter nrKopjeve"
                value={editNrKopjeve}
                onChange={(e) => setEditNrkopjeve(e.target.value)}
              />
            </Col>
            <Col className="w-full sm:w-auto mb-3 sm:mb-0">
              <input
                type="text"
                className="w-full sm:w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter Gjuhen"
                value={editGjuha}
                onChange={(e) => setEditGjuha(e.target.value)}
              />
            </Col>

            <Col className="w-full sm:w-auto mb-3 sm:mb-0 flex items-center">
              <input
                type="checkbox"
                checked={editInStock === 1 ? true : false}
                onChange={(e) => handleEditActiveChange(e)}
                value={editInStock}
                className="form-checkbox h-5 w-5 text-blue-500 mr-2"
              />
              <label>In-Stock</label>
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

export default Libri;
