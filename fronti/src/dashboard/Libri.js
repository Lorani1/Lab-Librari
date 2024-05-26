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

window.Buffer = Buffer;
window.process = process;

const Libri = () => {
  const [show, setShow] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAuthorsModal, setShowAuthorsModal] = useState(false);



  const [shtepiaList, setShtepiaList] = useState([]);
  const [selectedShtepia, setSelectedShtepia] = useState("");
  
  const [zhanriList, setZhanriList] = useState([]);
  const [selectedZhanri, setSelectedZhanri] = useState("");
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  
  const [isbn, setIsbn] = useState("");
  const [titulli, setTitulli] = useState("");
  const [kategoria, setKategoria] = useState("");
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

  const [editVitiPublikimit, setEditVitiPublikimit] = useState("");
  const [editNrFaqeve, setEditNrFaqeve] = useState("");
  const [editNrKopjeve, setEditNrKopjeve] = useState("");
  const [editGjuha, setEditGjuha] = useState("");
  const [editInStock, setEditInStock] = useState(0);
  const [editSelectedShtepiaID, setEditSelectedShtepiaID] = useState("");
  const [editSelectedZhanriID, setEditSelectedZhanriID] = useState("");
  const [editSelectedFile, setEditSelectedFile] = useState(null);

  const [filteredLibriList, setFilteredLibriList] = useState([]);
  const [titulliFilter, setTitulliFilter] = useState("");

   //Libri-Autori Many to Many
   const [authors, setAuthors] = useState([]);
   const [selectedAuthors, setSelectedAuthors] = useState([]);
   const [allAuthors, setAllAuthors] = useState([]);
   const [selectedAuthorsForNewBook, setSelectedAuthorsForNewBook] = useState([]);
   const [editSelectedAuthors, setEditSelectedAuthors] = useState([]);
   const [showAuthorsViewModal, setShowAuthorsViewModal] = useState(false);
   const [selectedBookAuthors, setSelectedBookAuthors] = useState([])
 

  const [data, setData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleFileUpload = (e) => setSelectedFile(e.target.files[0]);

  const handleOpenAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleOpenAuthorsModal = () => setShowAuthorsModal(true);
  const handleCloseAuthorsModal = () => setShowAuthorsModal(false);

  useEffect(() => {
    getData();
    getShtepiaList();
    getZhanriList();
    getAllAuthors();
  }, []);

  const getData = () => {
    axios
      .get(`https://localhost:7101/api/Libri`)
      .then((result) => {
        setData(result.data);
        setFilteredLibriList(result.data);

        // Assuming the API response includes a field called 'photoPath' for each book
        // Set the photo path in component state
        result.data.forEach((book) => {
          if (book.photoPath) {
            // Update the book's profile picture URL in state to show preview
            setProfilePictureUrl(book.photoPath);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getShtepiaList = () => {
    axios
      .get(`https://localhost:7101/api/ShtepiaBotuese`)
      .then((result) => setShtepiaList(result.data))
      .catch((error) => {
        console.error("Error fetching publisher data:", error);
        toast.error("Failed to fetch publisher data.");
      });
  };
  const getZhanriList = () => {
    axios
      .get(`https://localhost:7101/api/Zhanri`)
      .then((result) => setZhanriList(result.data))
      .catch((error) => {
        console.error("Error fetching genre data:", error);
        toast.error("Failed to fetch genre data.");
      });
  };

  const getAllAuthors = () => {
    axios
      .get("https://localhost:7101/api/Autori/getAll")
      .then((result) => setAllAuthors(result.data))
      .catch((error) => console.error("Error fetching authors:", error));
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
        setEditKategoria(bookData.kategoria);
        setEditVitiPublikimit(bookData.vitiPublikimit);
        setEditNrFaqeve(bookData.nrFaqeve);
        setEditNrKopjeve(bookData.nrKopjeve);
        setEditGjuha(bookData.gjuha);
        setEditInStock(bookData.inStock === 1 ? true : false);
        setEditSelectedShtepiaID(bookData.shtepiaBotueseID);
        setEditSelectedZhanriID(bookData.zhanriId);
        setEditProfilePictureUrl(bookData.profilePictureUrl);
        fetchAuthorsForBook(bookData.id); // Ensure to fetch authors for the edited book
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
    formData.append("kategoria", editKategoria);
    formData.append("vitiPublikimit", editVitiPublikimit);
    formData.append("nrFaqeve", editNrFaqeve);
    formData.append("nrKopjeve", editNrKopjeve);
    formData.append("gjuha", editGjuha);
    formData.append("inStock", editInStock ? 1 : 0);
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
    
    // Append selected authors to form data
    editSelectedAuthors.forEach(author => {
      formData.append("authors", author.autori_ID); 
    });

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
    formData.append("kategoria", kategoria);
    formData.append("vitiPublikimit", vitiPublikimit);
    formData.append("nrFaqeve", nrFaqeve);
    formData.append("nrKopjeve", nrKopjeve);
    formData.append("gjuha", gjuha);
    formData.append("inStock", inStock);
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

    selectedAuthorsForNewBook.forEach(author => {
      formData.append("authors", author.autori_ID); // Append selected authors to form data
    });

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

   //Autori-Libri Many-To-Many

   const fetchAuthorsForBook = (id) => {
    axios.get(`https://localhost:7101/api/Libri/getAutoret/${id}`)
      .then(result => setAuthors(result.data))
      .catch(error => console.error('Error fetching authors:', error));
  };

  const fetchSelectedBookAuthors = (id) => {
    axios
      .get(`https://localhost:7101/api/Libri/getAutoret/${id}`)
      .then((result) => setSelectedBookAuthors(result.data))
      .catch((error) => console.error("Error fetching selected book authors:", error));
  };

  const addAuthorToBook = (id, autori_ID) => {
    axios.post(`https://localhost:7101/api/Libri/${id}/ShtoAutorin/${autori_ID}`)
      .then(() => {
        fetchAuthorsForBook(id);
        toast.success('Author added to book');
      })
      .catch(error => {
        console.error('Failed to add author to book:', error);
        toast.error('Failed to add author to book. Please try again.');
      });
  };


const handleAuthorSelection = (autori_ID) => {
  const authorToAdd = allAuthors.find(author => author.autori_ID === autori_ID);
  setSelectedAuthorsForNewBook([...selectedAuthorsForNewBook, authorToAdd]);
};

const handleOpenAuthorsViewModal = (id) => {
  fetchSelectedBookAuthors(id);
  setShowAuthorsViewModal(true);
};

const handleCloseAuthorsViewModal = () => setShowAuthorsViewModal(false);


  const clear = () => {
    setIsbn("");
    setTitulli("");
    setKategoria("");
    setVitiPublikimit("");
    setNrFaqeve("");
    setNrKopjeve("");
    setGjuha("");
    setInStock(0);
    setSelectedShtepia("");
    setSelectedZhanri("");
    setSelectedFile(null);
    setProfilePictureUrl("");
    setSelectedAuthorsForNewBook([]);
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
      setFilteredLibriList(data);
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

  return (
    <Fragment>
      <ToastContainer />
      <Container className="py-5">
        <h1>Book List</h1>
        <Button variant="primary" onClick={handleOpenAddModal}>
          Add New Book
        </Button>
        <Button
          variant="secondary"
          as={Link}
          to="/shtepiabotuese"
          className="ml-3"
        >
          Go to Shtepia Botuese
        </Button>
        <Button
          variant="secondary"
          as={Link}
          to="/zhanri"
          className="ml-3"
        >
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
              <th>ISBN</th>
              <th>Title</th>
              <th>Category</th>
              <th>Publication Year</th>
              <th>Pages</th>
              <th>Copies</th>
              <th>Language</th>
              <th>Publisher</th>
              <th>Autoret</th>
              <th>Genre</th>
              <th>In Stock</th>
              <th>Images</th>
            </tr>
          </thead>
          <tbody>
            {filteredLibriList.length === 0 ? (
              <tr>
                <td colSpan="12" className="text-center">
                  No Data Found
                </td>
              </tr>
            ) : (
              filteredLibriList.map((item, key) => (
                <tr key={key}>
                  <td>{item.isbn}</td>
                  <td>{item.titulli}</td>
                  <td>{item.kategoria}</td>
                  <td>{item.vitiPublikimit}</td>
                  <td>{item.nrFaqeve}</td>
                  <td>{item.nrKopjeve}</td>
                  <td>{item.gjuha}</td>
                  <td>{item.shtepiaBotueseID}</td>
                  <td>
                  <Button variant="secondary" onClick={() => handleOpenAuthorsViewModal(item.id)}>
                    View Authors
                  </Button>
                </td>
                  <td>{item.zhanriId}</td>
                  <td>{item.inStock ? "Yes" : "No"}</td>
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
              <Col>
                <label>Genre</label>
                <select
                  value={editSelectedZhanriID}
                  onChange={(e) => setEditSelectedZhanriID(e.target.value)}
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
            <Button variant="secondary" onClick={handleOpenAuthorsModal}>
                Manage Authors
            </Button>
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
        
        
        
        <Modal show={showAuthorsModal} onHide={handleCloseAuthorsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Authors</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Add Authors:</h5>
          <ul>
            {allAuthors.map(author => (
              <li key={author.autori_ID}>
                {author.emri}
                {!selectedAuthors.some(a => a.autori_ID === selectedAuthors.autori_ID) && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      handleAuthorSelection(author.autori_ID); // Handle author selection
                      addAuthorToBook(editId, author.autori_ID); // Add author to book
                    }}
                    className="ml-2"
                  >
                    Add
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>

      <Modal show={showAuthorsViewModal} onHide={handleCloseAuthorsViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Selected Book Authors</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {selectedBookAuthors.map((author) => (
              <li key={author.autori_ID}>{author.emri}</li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
   
    </Container>
  </Fragment>
  );
};

export default Libri;
