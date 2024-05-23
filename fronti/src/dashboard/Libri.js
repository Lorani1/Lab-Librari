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
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Buffer } from "buffer";
import process from "process";

window.Buffer = Buffer;
window.process = process;

const Libri = () => {
  const [show, setShow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [shtepiaList, setShtepiaList] = useState([]);
  const [selectedShtepia, setSelectedShtepia] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [isbn, setIsbn] = useState("");
  const [titulli, setTitulli] = useState("");
  const [kategoria, setKategoria] = useState("");
  const [lloji, setLloji] = useState("");
  const [vitiPublikimit, setVitiPublikimit] = useState("");
  const [nrFaqeve, setNrFaqeve] = useState("");
  const [nrKopjeve, setNrKopjeve] = useState("");
  const [gjuha, setGjuha] = useState("");
  const [editProfilePictureUrl, setEditProfilePictureUrl] = useState("");
  const [inStock, setInStock] = useState(0);
  const [editId, setEditId] = useState("");
  const [editIsbn, setEditIsbn] = useState("");
  const [editTitulli, setEditTitulli] = useState("");
  const [editKategoria, setEditKategoria] = useState("");
  const [editLloji, setEditLloji] = useState("");

  const [editVitiPublikimit, setEditVitiPublikimit] = useState("");
  const [editNrFaqeve, setEditNrFaqeve] = useState("");
  const [editNrKopjeve, setEditNrKopjeve] = useState("");
  const [editGjuha, setEditGjuha] = useState("");
  const [editInStock, setEditInStock] = useState(0);
  const [editSelectedShtepiaID, setEditSelectedShtepiaID] = useState("");
  const [editSelectedFile, setEditSelectedFile] = useState(null);

  const [data, setData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleFileUpload = (e) => setSelectedFile(e.target.files[0]);

  const handleOpenAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  useEffect(() => {
    getData();
    getShtepiaList();
  }, []);

  const getData = () => {
    axios
      .get(`https://localhost:7249/api/Libri`)
      .then((result) => setData(result.data))
      .catch((error) => {
        console.error("Error fetching book data:", error);
        toast.error("Failed to fetch book data.");
      });
  };

  const getShtepiaList = () => {
    axios
      .get(`https://localhost:7249/api/ShtepiaBotuese`)
      .then((result) => setShtepiaList(result.data))
      .catch((error) => {
        console.error("Error fetching publisher data:", error);
        toast.error("Failed to fetch publisher data.");
      });
  };

  const handleEdit = (id) => {
    handleShow();
    axios
      .get(`https://localhost:7249/api/Libri/${id}`)
      .then((result) => {
        const bookData = result.data;
        setEditId(bookData.id);
        setEditIsbn(bookData.isbn);
        setEditTitulli(bookData.titulli);
        setEditKategoria(bookData.kategoria);
        setEditLloji(bookData.lloji);
        setEditVitiPublikimit(bookData.vitiPublikimit);
        setEditNrFaqeve(bookData.nrFaqeve);
        setEditNrKopjeve(bookData.nrKopjeve);
        setEditGjuha(bookData.gjuha);
        setEditInStock(bookData.inStock === 1 ? true : false);
        setEditSelectedShtepiaID(bookData.shtepiaBotueseID);
        setEditProfilePictureUrl(bookData.profilePictureUrl);
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
        toast.error("Failed to fetch book data.");
      });
  };

  const handleUpdate = () => {
    const url = `https://localhost:7249/api/Libri/${editId}`;
    const formData = new FormData();

    formData.append("isbn", editIsbn);
    formData.append("titulli", editTitulli);
    formData.append("kategoria", editKategoria);
    formData.append("lloji", editLloji);
    formData.append("vitiPublikimit", editVitiPublikimit);
    formData.append("nrFaqeve", editNrFaqeve);
    formData.append("nrKopjeve", editNrKopjeve);
    formData.append("gjuha", editGjuha);
    formData.append("inStock", editInStock ? 1 : 0);
    formData.append("shtepiaBotueseID", editSelectedShtepiaID);

    const selectedPublisher = shtepiaList.find(
      (shtepia) => shtepia.shtepiaBotueseID === editSelectedShtepiaID
    );
    formData.append(
      "shtepiaBotuese",
      JSON.stringify({
        shtepiaBotueseID: editSelectedShtepiaID,
        emri: selectedPublisher ? selectedPublisher.emri : "",
        adresa: selectedPublisher ? selectedPublisher.adresa : "",
      })
    );

    if (editSelectedFile) {
      formData.append("profilePicture", editSelectedFile);
    }

    // Log formData contents
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    axios
      .put(url, formData)
      .then((response) => {
        if (response.status === 204) {
          handleClose();
          getData();
          clear();
          toast.success("Book has been updated");
        } else {
          console.error("Unexpected response status:", response.status);
          toast.error("Failed to update book.");
        }
      })
      .catch((error) => {
        console.error("Error updating book:", error);
        toast.error("Failed to update book.");
      });
  };

  const handleEditFileUpload = (e) => {
    const file = e.target.files[0];
    setEditSelectedFile(file);

    // Update profile picture URL in state to show preview
    const reader = new FileReader();
    reader.onload = () => {
      setEditProfilePictureUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const url = "https://localhost:7249/api/Libri";

    const formData = new FormData();
    formData.append("isbn", isbn);
    formData.append("titulli", titulli);
    formData.append("kategoria", kategoria);
    formData.append("lloji", lloji);
    formData.append("vitiPublikimit", vitiPublikimit);
    formData.append("nrFaqeve", nrFaqeve);
    formData.append("nrKopjeve", nrKopjeve);
    formData.append("gjuha", gjuha);
    formData.append("inStock", inStock);
    formData.append("shtepiaBotueseID", selectedShtepia);
    formData.append(
      "shtepiaBotuese",
      JSON.stringify({
        shtepiaBotueseID: selectedShtepia,
        emri:
          shtepiaList.find(
            (shtepia) => shtepia.shtepiaBotueseID === selectedShtepia
          )?.emri || "",
        adresa:
          shtepiaList.find(
            (shtepia) => shtepia.shtepiaBotueseID === selectedShtepia
          )?.adresa || "",
      })
    );
    formData.append("profilePicture", selectedFile);

    axios
      .post(url, formData)
      .then((result) => {
        getData();
        clear();
        toast.success("Book has been added");
      })
      .catch((error) => {
        toast.error("Failed to add book. Please try again.");
      });
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axios
        .delete(`https://localhost:7249/api/Libri/${id}`)
        .then((response) => {
          console.log("Delete response:", response);
          if (response.status === 204) {
            toast.success("Book has been deleted");
            getData();
          } else {
            toast.error(
              "Failed to delete book. Server responded with status: " +
                response.status
            );
          }
        })
        .catch((error) => {
          toast.error("Failed to delete book. Please try again later.");
          console.error("Error:", error);
        });
    }
  };
  const clear = () => {
    setIsbn("");
    setTitulli("");
    setKategoria("");
    setLloji("");
    setVitiPublikimit("");
    setNrFaqeve("");
    setNrKopjeve("");
    setGjuha("");
    setInStock(0);
    setSelectedShtepia("");
    setSelectedFile(null);
    setProfilePictureUrl("");
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
      <Container className="py-5">
        <h1>Book List</h1>
        <Button variant="primary" onClick={handleOpenAddModal}>
          Add New Book
        </Button>
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Title</th>
              <th>Category</th>
              <th>Type</th>
              <th>Publication Year</th>
              <th>Pages</th>
              <th>Copies</th>
              <th>Language</th>
              <th>Publisher</th>
              <th>In Stock</th>
              <th>Images</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="12" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.isbn}</td>
                  <td>{item.titulli}</td>
                  <td>{item.kategoria}</td>
                  <td>{item.lloji}</td>
                  <td>{item.vitiPublikimit}</td>
                  <td>{item.nrFaqeve}</td>
                  <td>{item.nrKopjeve}</td>
                  <td>{item.gjuha}</td>
                  <td>{item.shtepiaBotueseID}</td>
                  <td>{item.inStock ? "Yes" : "No"}</td>
                  <td>
                    {item.profilePicturePath ? (
                      <img
                        src={item.profilePictureUrl}
                        alt="Profile"
                        style={{ width: "50px", height: "50px" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>
                    <Button
                      className="mr-2"
                      variant="warning"
                      onClick={() => handleEdit(item.id)}
                    >
                      <BsFillPencilFill />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      <BsFillTrashFill />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <label>ISBN</label>
                <input
                  type="text"
                  value={editIsbn}
                  onChange={(e) => setEditIsbn(e.target.value)}
                  className="form-control"
                />
              </Col>
              <Col>
                <label>Title</label>
                <input
                  type="text"
                  value={editTitulli}
                  onChange={(e) => setEditTitulli(e.target.value)}
                  className="form-control"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Category</label>
                <input
                  type="text"
                  value={editKategoria}
                  onChange={(e) => setEditKategoria(e.target.value)}
                  className="form-control"
                />
              </Col>
              <Col>
                <label>Type</label>
                <input
                  type="text"
                  value={editLloji}
                  onChange={(e) => setEditLloji(e.target.value)}
                  className="form-control"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Publication Year</label>
                <input
                  type="text"
                  value={editVitiPublikimit}
                  onChange={(e) => setEditVitiPublikimit(e.target.value)}
                  className="form-control"
                />
              </Col>
              <Col>
                <label>Pages</label>
                <input
                  type="text"
                  value={editNrFaqeve}
                  onChange={(e) => setEditNrFaqeve(e.target.value)}
                  className="form-control"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Copies</label>
                <input
                  type="text"
                  value={editNrKopjeve}
                  onChange={(e) => setEditNrKopjeve(e.target.value)}
                  className="form-control"
                />
              </Col>
              <Col>
                <label>Language</label>
                <input
                  type="text"
                  value={editGjuha}
                  onChange={(e) => setEditGjuha(e.target.value)}
                  className="form-control"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Publisher</label>
                <select
                  value={editSelectedShtepiaID}
                  onChange={(e) => setEditSelectedShtepiaID(e.target.value)}
                  className="form-control"
                >
                  <option value="">Select Publisher</option>
                  {shtepiaList.map((shtepia) => (
                    <option
                      key={shtepia.shtepiaBotueseID}
                      value={shtepia.shtepiaBotueseID}
                    >
                      {shtepia.emri}
                    </option>
                  ))}
                </select>
              </Col>
              <Col className="w-full sm:w-auto mb-3 sm:mb-0 flex items-center">
                <input
                  type="checkbox"
                  checked={editInStock}
                  onChange={(e) => setEditInStock(e.target.checked ? 1 : 0)}
                />
                <label>In-Stock</label>
              </Col>
            </Row>

            <Row>
              <Col>
                <label>Images</label>
                <input
                  type="file"
                  onChange={handleEditFileUpload}
                  className="form-control"
                />
                {editProfilePictureUrl && (
                  <img
                    src={editProfilePictureUrl}
                    alt="Profile"
                    style={{ width: "50px", height: "50px", marginTop: "10px" }}
                  />
                )}
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

        <Modal show={showAddModal} onHide={handleCloseAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <label>ISBN</label>
                <input
                  type="text"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  className="form-control"
                />
              </Col>
              <Col>
                <label>Title</label>
                <input
                  type="text"
                  value={titulli}
                  onChange={(e) => setTitulli(e.target.value)}
                  className="form-control"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Category</label>
                <input
                  type="text"
                  value={kategoria}
                  onChange={(e) => setKategoria(e.target.value)}
                  className="form-control"
                />
              </Col>
              <Col>
                <label>Type</label>
                <input
                  type="text"
                  value={lloji}
                  onChange={(e) => setLloji(e.target.value)}
                  className="form-control"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Publication Year</label>
                <input
                  type="text"
                  value={vitiPublikimit}
                  onChange={(e) => setVitiPublikimit(e.target.value)}
                  className="form-control"
                />
              </Col>
              <Col>
                <label>Pages</label>
                <input
                  type="text"
                  value={nrFaqeve}
                  onChange={(e) => setNrFaqeve(e.target.value)}
                  className="form-control"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Copies</label>
                <input
                  type="text"
                  value={nrKopjeve}
                  onChange={(e) => setNrKopjeve(e.target.value)}
                  className="form-control"
                />
              </Col>
              <Col>
                <label>Language</label>
                <input
                  type="text"
                  value={gjuha}
                  onChange={(e) => setGjuha(e.target.value)}
                  className="form-control"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Publisher</label>
                <select
                  value={selectedShtepia}
                  onChange={(e) => setSelectedShtepia(e.target.value)}
                  className="form-control"
                >
                  <option value="">Select Publisher</option>
                  {shtepiaList.map((shtepia) => (
                    <option
                      key={shtepia.shtepiaBotueseID}
                      value={shtepia.shtepiaBotueseID}
                    >
                      {shtepia.emri}
                    </option>
                  ))}
                </select>
              </Col>
              <Col className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
                <label>In Stock</label>
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked ? 1 : 0)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Profile Picture</label>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="form-control"
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Fragment>
  );
};

export default Libri;
