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
import { Link } from "react-router-dom";
import { CgAlignCenter } from "react-icons/cg";

window.Buffer = Buffer;
window.process = process;

const Klienti = () => {
  const [show, setShow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [qytetiList, setQytetiList] = useState([]);
  const [selectedQyteti, setSelectedQyteti] = useState("");
  const [emri, setEmri] = useState("");
  const [mbiemri, setMbiemri] = useState("");
  const [email, setEmail] = useState("");
  const [nrPersonal, setNrPersonal] = useState("");
  const [password, setPassword] = useState("");
  const [statusi, setStatusi] = useState("");
  const [editStatusi, setEditStatusi] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adresa, setAdresa] = useState("");
  const [nrTel, setNrTel] = useState("");
  const [editId, setEditId] = useState("");
  const [editEmri, setEditEmri] = useState("");
  const [editMbiemri, setEditMbiemri] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editNrPersonal, setEditNrPersonal] = useState("");
  const [editConfirmPassword, setEditConfirmPassword] = useState("");
  const [editAdresa, setEditAdresa] = useState("");
  const [editNrTel, setEditNrTel] = useState("");
  const [editSelectedQytetiID, setEditSelectedQytetiID] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [editSelectedFile, setEditSelectedFile] = useState(null);
  const [editProfilePictureUrl, setEditProfilePictureUrl] = useState("");

  const [filteredKlientList, setFilteredKlientList] = useState([]);
  const [emriFilter, setEmriFilter] = useState("");

  const [data, setData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleOpenAddModal = () => {
    clear(); // Clear fields when opening add modal
    setShowAddModal(true);
  };
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleFileUpload = (e) => setSelectedFile(e.target.files[0]);

  useEffect(() => {
    getData();
    getQytetiList();
  }, []);

  const getData = () => {
    axios
      .get(`https://localhost:7101/api/Klient`)
      .then((result) => {
        setData(result.data);
        setFilteredKlientList(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const getQytetiList = () => {
    axios
      .get(`https://localhost:7101/api/Qyteti`)
      .then((result) => setQytetiList(result.data))
      .catch((error) => {
        console.error("Error fetching city data:", error);
        toast.error("Failed to fetch city data.");
      });
  };

  const handleEdit = (id) => {
    handleShow();
    axios
      .get(`https://localhost:7101/api/Klient/${id}`)
      .then((result) => {
        const clientData = result.data;
        setEditId(clientData.id);
        setEditEmri(clientData.emri);
        setEditMbiemri(clientData.mbiemri);
        setEditNrPersonal(clientData.nrPersonal);
        setEditEmail(clientData.email);
        setEditAdresa(clientData.adresa);
        setEditStatusi(clientData.statusi);
        setEditNrTel(clientData.nrTel);
        setEditSelectedQytetiID(clientData.qytetiID);
        setEditProfilePictureUrl(clientData.profilePictureUrl);
      })
      .catch((error) => {
        console.error("Error fetching client data:", error);
        toast.error("Failed to fetch client data.");
      });
  };

  const handleUpdate = () => {
    if (editPassword !== editConfirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const url = `https://localhost:7101/api/Klient/${editId}`;
    const formData = new FormData();

    formData.append("emri", editEmri);
    formData.append("mbiemri", editMbiemri);
    formData.append("nrPersonal", editNrPersonal);
    formData.append("email", editEmail);
    formData.append("adresa", editAdresa);
    formData.append("statusi", editStatusi);
    formData.append("nrTel", editNrTel);
    formData.append("qytetiID", editSelectedQytetiID);

    const selectedQyteti = qytetiList.find(
      (qyteti) => qyteti.qytetiID === editSelectedQytetiID
    );
    formData.append(
      "qyteti",
      JSON.stringify({
        qytetiID: editSelectedQytetiID,
        emri: selectedQyteti ? selectedQyteti.emri : "",
      })
    );

    if (editPassword) {
      formData.append("password", editPassword);
    }
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
          toast.success("Client has been updated");
        } else {
          console.error("Unexpected response status:", response.status);
          toast.error("Failed to update client.");
        }
      })
      .catch((error) => {
        console.error("Error updating client:", error);
        toast.error("Failed to update client.");
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
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const url = "https://localhost:7101/api/Klient";

    const formData = new FormData();
    formData.append("emri", emri);
    formData.append("mbiemri", mbiemri);
    formData.append("nrPersonal", nrPersonal);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("adresa", adresa);
    formData.append("nrTel", nrTel);
    formData.append("statusi", statusi);
    formData.append("qytetiID", selectedQyteti);
    formData.append(
      "qyteti",
      JSON.stringify({
        qytetiID: selectedQyteti,
        emri:
          qytetiList.find((qyteti) => qyteti.qytetiID === selectedQyteti)?.emri || "",
      })
    );
    formData.append("profilePicture", selectedFile);

    axios
      .post(url, formData)
      .then((result) => {
        getData();
        clear();
        toast.success("Client has been added");
      })
      .catch((error) => {
        toast.error("Failed to add client. Please try again.");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      axios
        .delete(`https://localhost:7101/api/Klient/${id}`)
        .then((response) => {
          console.log("Delete response:", response);
          if (response.status === 204) {
            toast.success("Book has been deleted");
            const updatedList = data.filter((item) => item.id !== id);
            setData(updatedList);
            setFilteredKlientList(updatedList);
          }
        })
        .catch((error) => {
          toast.error("Failed to delete book. Please try again later.");
          console.error("Error:", error);
        });
    }
  };
  const clear = () => {
    setEmri("");
    setMbiemri("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAdresa("");
    setNrTel("");
    setSelectedQyteti("");
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

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setEmriFilter(value);
    filterFn(data, value);
  };

  const filterFn = (data, filterValue) => {
    if (filterValue.trim() === "") {
      setFilteredKlientList(data);
    } else {
      const filteredData = data.filter((el) => {
        return (el.emri?.toString() ?? "")
          .toLowerCase()
          .includes(filterValue.toLowerCase().trim());
      });
      setFilteredKlientList(filteredData);
    }
  };
  const sortResult = (prop, asc) => {
    const sortedData = [...filteredKlientList].sort((a, b) => {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    setFilteredKlientList(sortedData);
  };

  return (
    <div className="container">
      <ToastContainer />
      <h1>Klienti List</h1>
  <div className="d-flex justify-content-between mt-4 mb-4">
    <Button variant="primary" onClick={handleOpenAddModal}>
      Add Client
    </Button>
    <Button
      variant="secondary"
      as={Link}
      to="/qyteti"
      className="ml-3"
    >
      Go to Qyteti
    </Button>
  </div>
        <div className="ml-auto d-flex">
          <input
            className="form-control m-2"
            value={emriFilter}
            onChange={handleFilterChange}
            placeholder="Filter by Emri"
          />
          <button
            type="button"
            className="btn btn-light"
            onClick={() => sortResult("title", true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-down-square-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
            </svg>
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => sortResult("emri", false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-up-square-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
            </svg>
          </button>
        </div>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Emri</th>
            <th>Mbiemri</th>
            <th>Nr. Personal</th>
            <th>Email</th>
            <th>Adresa</th>
            <th>Statusi</th>
            <th>Nr. Tel</th>
            <th>Password</th>
            <th>Qyteti</th>
            <th>Profile Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {filteredKlientList.map((client, index) => (
    <tr key={client.id}>
      <td>{index + 1}</td>
      <td>{client.emri}</td>
      <td>{client.mbiemri}</td>
      <td>{client.nrPersonal}</td>
      <td>{client.email}</td>
      <td>{client.adresa}</td>
      <td>{client.statusi}</td>
      <td>{client.nrTel}</td>
      <td>{client.password}</td>
      <td>{client.qytetiID}</td>
      <td>
        {client.profilePicturePath ? (
          <img
            src={client.profilePictureUrl}
            alt="Profile"
            style={{ width: "50px", height: "50px" }}
          />
        ) : (
          "No Image"
        )}
                  </td>
              <td>
                <Button
                  variant="outline-primary"
                  onClick={() => handleEdit(client.id)}
                >
                  <BsFillPencilFill />
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(client.id)}
                >
                  <BsFillTrashFill />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <form>
                  <div className="form-group">
                    <label htmlFor="emri">Emri</label>
                    <input
                      type="text"
                      className="form-control"
                      id="emri"
                      value={emri}
                      onChange={(e) => setEmri(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mbiemri">Mbiemri</label>
                    <input
                      type="text"
                      className="form-control"
                      id="mbiemri"
                      value={mbiemri}
                      onChange={(e) => setMbiemri(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nrPersonal">Nr. Personal</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nrPersonal"
                      value={nrPersonal}
                      onChange={(e) => setNrPersonal(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="adresa">Adresa</label>
                    <input
                      type="text"
                      className="form-control"
                      id="adresa"
                      value={adresa}
                      onChange={(e) => setAdresa(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="statusi">Statusi</label>
                    <input
                      type="text"
                      className="form-control"
                      id="statusi"
                      value={statusi}
                      onChange={(e) => setStatusi(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nrTel">Nr. Tel</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nrTel"
                      value={nrTel}
                      onChange={(e) => setNrTel(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="qyteti">Qyteti</label>
                    <select
                  value={selectedQyteti}
                  onChange={(e) => setSelectedQyteti(e.target.value)}
                  className="form-control"
                >
                  <option value="">Select Publisher</option>
                  {qytetiList.map((qyteti) => (
                    <option
                      key={qyteti.qytetiID}
                      value={qyteti.qytetiID}
                    >
                      {qyteti.emri}
                    </option>
                  ))}
                </select>
                  </div>
                  <div className="form-group">
                  <label>Profile Picture</label>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="form-control"
                />
                  </div>
                </form>
              </Col>
            </Row>
          </Container>
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <form>
                  <div className="form-group">
                    <label htmlFor="editEmri">Emri</label>
                    <input
                      type="text"
                      className="form-control"
                      id="editEmri"
                      value={editEmri}
                      onChange={(e) => setEditEmri(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editMbiemri">Mbiemri</label>
                    <input
                      type="text"
                      className="form-control"
                      id="editMbiemri"
                      value={editMbiemri}
                      onChange={(e) => setEditMbiemri(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editNrPersonal">Nr. Personal</label>
                    <input
                      type="text"
                      className="form-control"
                      id="editNrPersonal"
                      value={editNrPersonal}
                      onChange={(e) => setEditNrPersonal(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editEmail">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="editEmail"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editAdresa">Adresa</label>
                    <input
                      type="text"
                      className="form-control"
                      id="editAdresa"
                      value={editAdresa}
                      onChange={(e) => setEditAdresa(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editStatusi">Statusi</label>
                    <input
                      type="text"
                      className="form-control"
                      id="editStatusi"
                      value={editStatusi}
                      onChange={(e) => setEditStatusi(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editNrTel">Nr. Tel</label>
                    <input
                      type="text"
                      className="form-control"
                      id="editNrTel"
                      value={editNrTel}
                      onChange={(e) => setEditNrTel(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editPassword">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="editPassword"
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editConfirmPassword">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="editConfirmPassword"
                      value={editConfirmPassword}
                      onChange={(e) => setEditConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editQyteti">Qyteti</label>
                    <select
                      className="form-control"
                      id="editQyteti"
                      value={selectedQyteti}
                      onChange={(e) => setEditSelectedQyteti(e.target.value)}
                    >
                      <option value="">Select City</option>
                      {qytetiList.map((qyteti) => (
                        <option key={qyteti.qytetiID} value={qyteti.qytetiID}>
                          {qyteti.emri}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
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
                    
                  </div>
                </form>
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
    </div>
  );
}

export default Klienti;
