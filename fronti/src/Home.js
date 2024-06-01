import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { commerce } from "./lib/commerce";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import ProductView from "./components/ProductView/ProductView";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import loadingImg from "./assets/loader.gif";
import "./style.css";
import Biography from "./components/Bio/Biography";
import axios from "axios";
import Manga from "./components/Manga/Manga";
import Crime from "./components/Crime/Crime";
import Fiction from "./components/Fiction/Fiction";
import { useHistory, Link } from "react-router-dom";
const Home = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [mangaProducts, setMangaProducts] = useState([]);
  const [fictionProducts, setFictionProducts] = useState([]);
  const [bioProducts, setBioProducts] = useState([]);
  const [crimeProducts, setCrimeProducts] = useState([]);
  const [animeProducts, setAnimeProducts] = useState([]);
  const [featureProducts, setFeatureProducts] = useState([]);
  const [books, setBooks] = useState([]); // New state for books
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [activeSection, setActiveSection] = useState("products");
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      history.push("/login");
    }
  }, [history]);
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    const uniqueProducts = Array.from(
      new Set(data.map((product) => product.id))
    ).map((id) => data.find((product) => product.id === id));
    setProducts(uniqueProducts);
  };

  const fetchMangaProducts = async () => {
    const { data } = await commerce.products.list({
      category_slug: ["manga"],
    });
    setMangaProducts(data);
  };
  const fetchAnimeProducts = async () => {
    try {
      const { data } = await commerce.products.list({
        category_slug: ["anime"],
      });
      setAnimeProducts(data);
    } catch (error) {
      console.error("Error fetching anime products:", error);
      // Handle the error appropriately, such as displaying a message to the user
      // or retrying the request after a delay
    }
  };

  const fetchFeatureProducts = async () => {
    const { data } = await commerce.products.list({
      category_slug: ["featured"],
    });
    setFeatureProducts(data);
  };

  const fetchFictionProducts = async () => {
    const { data } = await commerce.products.list({
      category_slug: ["fiction"],
    });
    setFictionProducts(data);
  };

  const fetchBioProducts = async () => {
    const { data } = await commerce.products.list({
      category_slug: ["biography"],
    });
    setBioProducts(data);
  };
  const fetchCrimeProducts = async () => {
    try {
      const { data } = await commerce.products.list({
        category_slug: ["crime"],
      });
      setCrimeProducts(data);
    } catch (error) {
      console.error("Error fetching crime products:", error);
    }
  };

  const fetchBooks = async () => {
    axios
      .get("https://localhost:7101/api/Libri")
      .then((response) => {
        const uniqueBooks = Array.from(
          new Set(response.data.map((book) => book.id))
        ).map((id) => response.data.find((book) => book.id === id));
        setBooks(uniqueBooks);
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
      });
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });
    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);
    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchFeatureProducts();
    fetchCart();
    fetchMangaProducts();
    fetchFictionProducts();
    fetchBioProducts();
    fetchCrimeProducts();
    fetchAnimeProducts();
    fetchBooks();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "cart":
        return (
          <Cart
            cart={cart}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}
            onEmptyCart={handleEmptyCart}
          />
        );
      case "checkout":
        return (
          <Checkout
            cart={cart}
            order={order}
            onCaptureCheckout={handleCaptureCheckout}
            error={errorMessage}
          />
        );
      case "product-view":
        return <ProductView />;
      case "manga":
        return mangaProducts.length > 0 ? (
          <Manga onAddToCart={handleAddToCart} mangaProducts={mangaProducts} />
        ) : (
          <p>Loading manga products...</p>
        );
      case "fiction":
        return (
          <Fiction
            fictionProducts={fictionProducts}
            onAddToCart={handleAddToCart}
          />
        );
      case "biography":
        return (
          <Biography bioProducts={bioProducts} onAddToCart={handleAddToCart} />
        );
      case "crime":
        return crimeProducts.length > 0 ? (
          <Crime onAddToCart={handleAddToCart} crimeProducts={crimeProducts} />
        ) : (
          <p>Loading crime products...</p>
        );
      case "anime":
        return animeProducts.length > 0 ? (
          <Anime onAddToCart={handleAddToCart} animeProducts={animeProducts} />
        ) : (
          <p>Loading anime products...</p>
        );
      case "books":
        return (
          <div className="container">
            <h1 className="text-center mt-5 mb-4">E-Library</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {books.map((book) => (
                <div key={book.id} className="col">
                  <div className="book-card">
                    <div className="book-cover">
                      <img
                        src={book.profilePictureUrl}
                        alt={book.titulli}
                        className="card-img-top"
                      />
                    </div>
                    <div className="book-details">
                      <h5 className="book-title">{book.titulli}</h5>
                      <p className="book-isbn">ISBN: {book.isbn}</p>
                      <p
                        className={`book-stock ${
                          book.inStock ? "text-success" : "text-danger"
                        }`}
                      >
                        {book.inStock ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <Products
            products={products}
            featureProducts={featureProducts}
            onAddToCart={handleAddToCart}
          />
        );
    }
  };

  console.log("Rendering Home component");
  return (
    <div>
      <CssBaseline />
      <Navbar
        totalItems={cart.total_items}
        handleDrawerToggle={handleDrawerToggle}
      />
      <div style={{ display: "flex" }}>{renderActiveSection()}</div>
      <Footer />
    </div>
  );
};

export default Home;
