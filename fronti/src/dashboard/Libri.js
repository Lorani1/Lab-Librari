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
// import Sidebar from "./Sidebar";
// import "./dashb.css";
// import "./SideBar.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsBookFill,
} from "react-icons/bs"; // Adjust the path as needed
// import "./sidebar.css";

window.Buffer = Buffer;
window.process = process;

const Libri = () => {
  const [show, setShow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [shtepiaList, setShtepiaList] = useState([]);
  const [selectedShtepia, setSelectedShtepia] = useState("");
  const [zhanriList, setZhanriList] = useState([]);
  const [selectedZhanri, setSelectedZhanri] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [isbn, setIsbn] = useState("");
  const [titulli, setTitulli] = useState("");

  const [vitiPublikimit, setVitiPublikimit] = useState("");
  const [nrFaqeve, setNrFaqeve] = useState("");
  const [nrKopjeve, setNrKopjeve] = useState("");
  const [gjuha, setGjuha] = useState("");
  const [editProfilePictureUrl, setEditProfilePictureUrl] = useState("");
  const [inStock, setInStock] = useState(0);
  const [description, setDescriptioni] = useState("");
  const [editId, setEditId] = useState("");
  const [editIsbn, setEditIsbn] = useState("");
  const [editTitulli, setEditTitulli] = useState("");

  const [editVitiPublikimit, setEditVitiPublikimit] = useState("");
  const [editNrFaqeve, setEditNrFaqeve] = useState("");
  const [editNrKopjeve, setEditNrKopjeve] = useState("");
  const [editGjuha, setEditGjuha] = useState("");
  const [editInStock, setEditInStock] = useState(0);
  const [editDescriptioni, setEditDescriptioni] = useState("");
  const [editSelectedShtepiaID, setEditSelectedShtepiaID] = useState("");
  const [editSelectedZhanriID, setEditSelectedZhanriID] = useState("");
  const [editSelectedFile, setEditSelectedFile] = useState(null);

  const [filteredLibriList, setFilteredLibriList] = useState([]);
  const [titulliFilter, setTitulliFilter] = useState("");
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const [showSidebar, setShowSidebar] = useState(false);

  const [data, setData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleFileUpload = (e) => setSelectedFile(e.target.files[0]);

  const handleOpenAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const [itemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1); // Change the number of items per page as needed

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (
    Array.isArray(filteredLibriList) ? filteredLibriList : []
  ).slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(
    (Array.isArray(filteredLibriList) ? filteredLibriList : []).length /
      itemsPerPage
  );

  useEffect(() => {
    getData();
    getShtepiaList();
    getZhanriList();
  }, []);
  const getData = () => {
    axios
      .get(`https://localhost:7101/api/Libri`)
      .then((result) => {
        const libridata = result.data?.$values;
        if (Array.isArray(libridata)) {
          setData(libridata);
          setFilteredLibriList(libridata);
        } else {
          console.error("Unexpected data format:", result.data);
          toast.error("Failed to fetch client data.");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to fetch client data.");
      });
  };

  const getShtepiaList = () => {
    axios
      .get(`https://localhost:7101/api/ShtepiaBotuese`)
      .then((result) => {
        const shtepiaData = result.data?.$values;
        if (Array.isArray(shtepiaData)) {
          setShtepiaList(shtepiaData);
        } else {
          console.error("Unexpected data format:", result.data);
          toast.error("Failed to fetch city data.");
        }
      })
      .catch((error) => {
        console.error("Error fetching city data:", error);
        toast.error("Failed to fetch city data.");
      });
  };
  const getZhanriList = () => {
    axios
      .get(`https://localhost:7101/api/Zhanri`)
      .then((result) => {
        const zhanriData = result.data?.$values;
        if (Array.isArray(zhanriData)) {
          setZhanriList(zhanriData);
        } else {
          console.error("Unexpected data format:", result.data);
          toast.error("Failed to fetch city data.");
        }
      })
      .catch((error) => {
        console.error("Error fetching city data:", error);
        toast.error("Failed to fetch city data.");
      });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const handleCustomersClick = () => {
    setShowKlienti(true);
    setShowLibri(false); // Hide Libri when showing Klienti
  };

  const handleLibriClick = () => {
    setShowLibri(true);
    setShowKlienti(false); // Hide Klienti when showing Libri
  };
  const handleAutoriClick = () => {
    setShowLibri(false);
    setShowKlienti(false);
    setShowAutori(true);
  };
  const handleStafiClick = () => {
    setShowLibri(false);
    setShowKlienti(false);
    setShowAutori(false);
    setShowStafi(true);
  };

  const handleEdit = (id) => {
    handleShow();
    axios
      .get(`https://localhost:7101/api/Libri/${id}`)
      .then((result) => {
        const bookData = result.data;
        setEditId(bookData.id);
        setEditIsbn(bookData.isbn);
        setEditTitulli(bookData.titulli);
        setEditVitiPublikimit(bookData.vitiPublikimit);
        setEditNrFaqeve(bookData.nrFaqeve);
        setEditNrKopjeve(bookData.nrKopjeve);
        setEditGjuha(bookData.gjuha);
        setEditInStock(bookData.inStock === 1);
        setEditDescriptioni(bookData.description);
        setEditSelectedShtepiaID(bookData.shtepiaBotueseID);
        setEditSelectedZhanriID(bookData.zhanriId);
        setEditProfilePictureUrl(bookData.profilePictureUrl);
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
        toast.error("Failed to fetch book data.");
      });
  };

  const handleEditFileUpload = (e) => {
    const file = e.target.files[0];

    try {
      if (!file) {
        throw new Error("No file selected");
      }

      setEditSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setEditProfilePictureUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error handling file upload:", error);
    }
  };

  const handleUpdate = () => {
    const url = `https://localhost:7101/api/Libri/${editId}`;
    const formData = new FormData();

    formData.append("isbn", editIsbn);
    formData.append("titulli", editTitulli);
    formData.append("vitiPublikimit", editVitiPublikimit);
    formData.append("nrFaqeve", editNrFaqeve);
    formData.append("nrKopjeve", editNrKopjeve);
    formData.append("gjuha", editGjuha);
    formData.append("inStock", editInStock ? 1 : 0);
    formData.append("description", editDescriptioni);
    formData.append("shtepiaBotueseID", editSelectedShtepiaID);
    formData.append("zhanriID", editSelectedZhanriID);

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

    if (editSelectedFile && editSelectedFile instanceof File) {
      formData.append("profilePicture", editSelectedFile);
    }

    formData.append("profilePicturePath", editProfilePictureUrl || ""); // Add the existing profile picture path if needed

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
        if (error.response && error.response.status === 400) {
          console.error("Bad request error:", error.response.data);
        } else {
          console.error("Error updating book:", error);
        }
        toast.error("Failed to update book.");
      });
  };

  const handleSave = () => {
    const url = "https://localhost:7101/api/Libri";

    const formData = new FormData();
    formData.append("isbn", isbn);
    formData.append("titulli", titulli);
    formData.append("vitiPublikimit", vitiPublikimit);
    formData.append("nrFaqeve", nrFaqeve);
    formData.append("nrKopjeve", nrKopjeve);
    formData.append("gjuha", gjuha);
    formData.append("inStock", inStock);
    formData.append("description", description);
    formData.append("shtepiaBotueseID", selectedShtepia);
    formData.append("zhanriID", selectedZhanri);
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
    formData.append(
      "zhanri",
      JSON.stringify({
        zhanriId: selectedZhanri,
        emri:
          zhanriList.find((zhanri) => zhanri.zhanriId === selectedZhanri)
            ?.emri || "",
        description:
          zhanriList.find((zhanri) => zhanri.zhanriId === selectedZhanri)
            ?.description || "",
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
        .delete(`https://localhost:7101/api/Libri/${id}`)
        .then((response) => {
          console.log("Delete response:", response);
          if (response.status === 204) {
            toast.success("Book has been deleted");
            const updatedList = data.filter((item) => item.id !== id);
            setData(updatedList);
            setFilteredLibriList(updatedList);
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
    setVitiPublikimit("");
    setNrFaqeve("");
    setNrKopjeve("");
    setGjuha("");
    setInStock(0);
    setDescriptioni("");
    setSelectedShtepia("");
    setSelectedZhanri("");
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

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setTitulliFilter(value);
    filterFn(data, value);
  };

  const filterFn = (data, filterValue) => {
    if (filterValue.trim() === "") {
      setFilteredLibriList(data || []); // Ensure it is an array
    } else {
      const filteredData = data.filter((el) => {
        return (el.titulli?.toString() ?? "")
          .toLowerCase()
          .includes(filterValue.toLowerCase().trim());
      });
      setFilteredLibriList(filteredData);
    }
  };

  const sortResult = (prop, asc) => {
    const sortedData = [...filteredLibriList].sort((a, b) => {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    setFilteredLibriList(sortedData);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <Fragment>
      <div className="sidebar-container">
        {/* Icon to toggle sidebar visibility */}
        <div className="sidebar-toggle-icon-container">
          <BsThreeDotsVertical
            className="sidebar-toggle-icon"
            onClick={toggleSidebar}
          />
        </div>

        {/* Render the Sidebar component conditionally */}
        {showSidebar && <Sidebar />}
      </div>

      <ToastContainer />
      <Container className="py-5">
        <h1>Book List</h1>
        <Button variant="primary" onClick={handleOpenAddModal}>
          Add New Book
        </Button>
        <Button
          variant="secondary"
          as={Link}
          to="/ShtepiaBotuese"
          className="ml-3"
        >
          Go to Shtepia Botuese
        </Button>
        <Button variant="secondary" as={Link} to="/zhanri" className="ml-3">
          Go to Zhanri
        </Button>
        <div className="ml-auto d-flex">
          <input
            className="form-control m-2"
            value={titulliFilter}
            onChange={handleFilterChange}
            placeholder="Filter by Titulli"
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
            onClick={() => sortResult("title", false)}
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
              <th>id</th>
              <th>ISBN</th>
              <th>Title</th>
              <th>Publication Year</th>
              <th>Pages</th>
              <th>Copies</th>
              <th>Language</th>
              <th>Publisher</th>
              <th>Genre</th>
              <th>In Stock</th>
              <th>Description</th>
              <th>Images</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredLibriList) &&
              filteredLibriList.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{index + 1}</td>
                  <td>{item.isbn}</td>
                  <td>{item.titulli}</td>
                  <td>{item.vitiPublikimit}</td>
                  <td>{item.nrFaqeve}</td>
                  <td>{item.nrKopjeve}</td>
                  <td>{item.gjuha}</td>
                  <td>{item.shtepiaBotueseID}</td>
                  <td>{item.zhanriId}</td>
                  <td>{item.inStock ? "Yes" : "No"}</td>
                  <td>{item.description}</td>

                  <td>
                    {item.profilePicturePath ? (
                      <img
                        src={item.profilePictureUrl}
                        alt="Book Cover"
                        style={{ width: "100px", height: "100px" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  {/* <Product
                    key={item.id}
                    item={item}
                    onAddToCart={handleAddToCart} // Pass the function to the Product component
                  /> */}
                  {/* <div>
                    <Product books={books} />
                  </div> */}
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
              ))}
          </tbody>
        </Table>
        {/* Pagination Controls */}
        <div className="d-flex justify-content-center align-items-center mt-4">
          <Button
            variant="secondary"
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
            className="mr-3"
            style={{
              backgroundColor: "#C39898",
              borderColor: "#C39898",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </Button>
          <div className="mx-4">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="secondary"
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
            className="ml-3"
            style={{
              backgroundColor: "#C39898",
              borderColor: "#C39898",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next
          </Button>
        </div>

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
                  {Array.isArray(shtepiaList) &&
                    shtepiaList.map((shtepia, index) => (
                      <option
                        key={shtepia.shtepiaBotueseID}
                        value={shtepia.shtepiaBotueseID}
                      >
                        {shtepia.emri}
                      </option>
                    ))}
                </select>
              </Col>
              <Col>
                <label>Genre</label>
                <select
                  value={editSelectedZhanriID}
                  onChange={(e) => setEditSelectedZhanriID(e.target.value)}
                  className="form-control"
                >
                  <option value="">Select Genre</option>
                  {Array.isArray(zhanriList) &&
                    zhanriList.map((zhanri, index) => (
                      <option key={zhanri.zhanriId} value={zhanri.zhanriId}>
                        {zhanri.emri}
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
              <Row>
                <Row>
                  <Col>
                    <label>Description</label>
                    <textarea
                      value={editDescriptioni}
                      onChange={(e) => setEditDescriptioni(e.target.value)}
                      className="form-control"
                    />
                  </Col>
                </Row>
              </Row>
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
              <Col>
                <label>Genre</label>
                <select
                  value={selectedZhanri}
                  onChange={(e) => setSelectedZhanri(e.target.value)}
                  className="form-control"
                >
                  <option value="">Select Genre</option>
                  {zhanriList.map((zhanri) => (
                    <option key={zhanri.zhanriId} value={zhanri.zhanriId}>
                      {zhanri.emri}
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
              <Row>
                <Col>
                  <label>Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescriptioni(e.target.value)}
                    className="form-control"
                  />
                </Col>
              </Row>
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
