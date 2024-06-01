// Manga.jsx
import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Product from "../Products/Product/Product.js";
import useStyles from "../Products/styles.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../ProductView/style.css";
import axios from "axios";

const Manga = ({ onAddToCart }) => {
  const classes = useStyles();
  const [mangaProducts, setMangaProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7101/api/Libri")
      .then((response) => {
        console.log("Fetched data:", response.data); // Log the fetched data
        const mangas = response.data.filter(
          (product) => product.zhanri.emri === "Romance"
        );
        console.log("Filtered manga products:", mangas); // Log the filtered manga products
        setMangaProducts(mangas);
      })
      .catch((error) => console.error("Error fetching manga data:", error));
  }, []);

  return (
    <main className={classes.mainPage}>
      <div className={classes.toolbar} />
      <div className={classes.categorySection}>
        <h3 className={classes.categoryHeader}>
          <span style={{ color: "#f1361d" }}>Romance</span>
        </h3>
        <h3 className={classes.categoryDesc}>
          Browse our handpicked selection of Romance series
        </h3>
        <Grid
          className={classes.categoryFeatured}
          container
          justifyContent="center" // Change justify to justifyContent
          spacing={1}
        >
          {mangaProducts.length === 0 ? (
            <p>No manga products available</p>
          ) : (
            mangaProducts.map((product) => (
              <Grid
                key={product.id} // Ensure each child in a list has a unique key prop
                className={classes.categoryFeatured}
                item
                xs={6}
                sm={5}
                md={3}
                lg={2}
                id="pro"
              >
                <Product product={product} onAddToCart={onAddToCart} />
              </Grid>
            ))
          )}
        </Grid>
      </div>
    </main>
  );
};

export default Manga;
