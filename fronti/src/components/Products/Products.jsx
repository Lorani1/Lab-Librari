import React, { useState, useEffect, useRef } from "react";
import { Grid, InputAdornment, Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Product from "./Product/Product.js";
import useStyles from "./styles";
import logo1 from "../../assets/Bookshop.gif";
import scrollImg from "../../assets/scroll.gif";
import { Link } from "react-router-dom";
import mangaBg from "../../assets/romance.webp";
import bioBg from "../../assets/his.jpg";
import thrillerBg from "../../assets/thriller.jpg";
import crimeBg from "../../assets/crime.jpg";
import animeBg from "../../assets/anime.jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";

const Products = ({ onAddToCart }) => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const sectionRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    axios
      .get("https://localhost:7101/api/Libri")
      .then((response) => {
        if (isMounted) {
          setProducts(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
      });

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, []);

  const handleInputClick = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const uniqueProducts = Array.from(
    new Set(products.map((product) => product.id))
  ).map((id) => products.find((product) => product.id === id));

  const filteredProducts = uniqueProducts.filter((product) => {
    if (searchTerm === "") {
      return true;
    } else if (product.titulli) {
      // Use product.titulli instead of product.title
      const lowercaseTitulli = product.titulli.toLowerCase();
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      const isMatch = lowercaseTitulli.includes(lowercaseSearchTerm);
      return isMatch;
    }
    return false; // If product.titulli doesn't exist, filter it out
  });

  useEffect(() => {
    console.log("Filtered products list:", filteredProducts);
  }, [filteredProducts]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const FeaturedBooks = ({ filteredProducts, onAddToCart }) => {
    const [featuredBooks, setFeaturedBooks] = useState([]);

    useEffect(() => {
      const shuffledProducts = shuffleArray(filteredProducts);
      const selectedBooks = shuffledProducts.slice(0, 3);
      setFeaturedBooks(selectedBooks);
    }, [filteredProducts]);

    return (
      <Grid
        className={classes.contentFeatured}
        container
        justifyContent="center"
        spacing={1}
      >
        {filteredProducts.map((product) => (
          <Grid
            key={product.id}
            className={classes.content}
            item
            xs={6}
            sm={6}
            md={4}
            lg={3}
            id="pro"
          >
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <main className={classes.mainPage}>
      <div className={classes.toolbar} />
      <img
        src={scrollImg}
        className={`${classes.scrollImg} copy`}
        alt="scroll"
      />
      <div className={classes.hero}>
        <img
          className={classes.heroImg}
          src={logo1}
          height="720px"
          alt="Bookshop Logo"
        />

        <div className={classes.heroCont}>
          <h1 className={classes.heroHeader}>
            Gjeni librin tuaj të preferuar.
          </h1>
          <h3 className={classes.heroDesc} ref={sectionRef}>
            Eksploroni në koleksionin tonë të librave dhe gjeni librin tuaj të
            radhës që doni ta lexoni.
          </h3>
          <div className={classes.searchs}>
            <Input
              className={classes.searchb}
              type="text"
              placeholder="Cilin libër po kërkoni?"
              onClick={handleInputClick}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </div>
        </div>
      </div>

      {searchTerm === "" && (
        <div className={classes.categorySection}>
          <h1 className={classes.categoryHeader}>Kategoritë</h1>
          <h3 className={classes.categoryDesc}>
            Shfletoni kategoritë tona të librave
          </h3>
          <div className={classes.buttonSection}>
            <div>
              <Link to="manga">
                <button
                  className={classes.categoryButton}
                  style={{ backgroundImage: `url(${mangaBg})` }}
                ></button>
              </Link>
              <div className={classes.categoryName}>Romance</div>
            </div>
            <div>
              <Link to="biography">
                <button
                  className={classes.categoryButton}
                  style={{ backgroundImage: `url(${bioBg})` }}
                ></button>
              </Link>
              <div className={classes.categoryName}>Biografi</div>
            </div>
            <div>
              <Link to="fiction">
                <button
                  className={classes.categoryButton}
                  style={{ backgroundImage: `url(${thrillerBg})` }}
                ></button>
              </Link>
              <div className={classes.categoryName}>Thriller</div>
            </div>
            <div>
              <Link to="crime">
                <button
                  className={classes.categoryButton}
                  style={{ backgroundImage: `url(${crimeBg})` }}
                ></button>
              </Link>
              <div className={classes.categoryName}>Crime</div>
            </div>
            <div>
              <Link to="anime">
                <button
                  className={classes.categoryButton}
                  style={{ backgroundImage: `url(${animeBg})` }}
                ></button>
              </Link>
              <div className={classes.categoryName}>Animuar</div>
            </div>
          </div>
        </div>
      )}

      <div className={classes.carouselSection}>
        <Carousel
          showIndicators={false}
          autoPlay={true}
          infiniteLoop={true}
          showArrows={true}
          showStatus={false}
        >
          <div>
            <Link to="manga">
              <button
                className={classes.categoryButton}
                style={{ backgroundImage: `url(${mangaBg})` }}
              ></button>
            </Link>
            <div className={classes.categoryName}>Romance</div>
          </div>
          <div>
            <Link to="biography">
              <button
                className={classes.categoryButton}
                style={{ backgroundImage: `url(${bioBg})` }}
              ></button>
            </Link>
            <div className={classes.categoryName}>Biografi</div>
          </div>
          <div>
            <Link to="fiction">
              <button
                className={classes.categoryButton}
                style={{ backgroundImage: `url(${thrillerBg})` }}
              ></button>
            </Link>
            <div className={classes.categoryName}>Thriller</div>
          </div>

          <div>
            <Link to="crime">
              <button
                className={classes.categoryButton}
                style={{ backgroundImage: `url(${crimeBg})` }}
              ></button>
            </Link>
            <div className={classes.categoryName}>Crime</div>
          </div>
          <div>
            <Link to="anime">
              <button
                className={classes.categoryButton}
                style={{ backgroundImage: `url(${animeBg})` }}
              ></button>
            </Link>
            <div className={classes.categoryName}>Animuar</div>
          </div>
        </Carousel>
      </div>

      {searchTerm === "" && (
        <>
          <div>
            <h3 className={classes.contentHeader}>
              Më të <span style={{ color: "#f1361d" }}>huazuarat</span>
            </h3>
            <FeaturedBooks
              filteredProducts={filteredProducts}
              onAddToCart={onAddToCart}
            />
          </div>
        </>
      )}

      <div>
        {searchTerm === "" && (
          <>
            <h1 className={classes.booksHeader}>
              Zbulo <span style={{ color: "#f1361d" }}>librat</span>
            </h1>
            <h3 className={classes.booksDesc}>
              Shfleto koleksionin tonë të librave.
            </h3>
          </>
        )}
        <div className={classes.mobileSearch}>
          <div className={classes.mobSearchs}>
            <Input
              className={classes.mobSearchb}
              type="text"
              placeholder="Search for books"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </div>
        </div>
        <div>
          <Grid
            className={classes.contentFeatured}
            container
            justifyContent="center"
            spacing={1}
          >
            {filteredProducts.map((product) => (
              <Grid
                key={product.id}
                className={classes.content}
                item
                xs={6}
                sm={6}
                md={4}
                lg={3}
                id="pro"
              >
                <Product product={product} onAddToCart={onAddToCart} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </main>
  );
};

export default Products;
