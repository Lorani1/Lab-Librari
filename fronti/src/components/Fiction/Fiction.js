import { Grid } from "@material-ui/core";
import Product from "../Products/Product/Product.js";
import useStyles from "../Products/styles.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../ProductView/style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Fiction = ({ onAddToCart }) => {
  const classes = useStyles();
  const [fictionProducts, setFictionProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7101/api/Libri")
      .then((response) => {
        console.log("Fetched data:", response.data); // Log the fetched data
        const fetchedProducts = response.data?.["$values"];

        if (Array.isArray(fetchedProducts)) {
          const fictions = fetchedProducts.filter(
            (product) => product.zhanri.emri === "Thriller"
          );
          console.log("Filtered thriller products:", fictions); // Log the filtered thriller products
          setFictionProducts(fictions);
        } else {
          console.error("Fetched data is not an array:", fetchedProducts);
        }
      })
      .catch((error) => console.error("Error fetching thriller data:", error));
  }, []);

  return (
    <main className={classes.mainPage}>
      <div className={classes.toolbar} />
      <div className={classes.categorySection}>
        <h3 className={classes.categoryHeader}>
          <span style={{ color: "#f1361d" }}>Thriller&nbsp;</span>Books
        </h3>
        <h3 className={classes.categoryDesc}>
          Browse our Thriller books Collection
        </h3>
        <Grid
          className={classes.categoryFeatured}
          container
          justify="center"
          spacing={3}
        >
          {fictionProducts.length === 0 ? (
            <p>No Thriller books available</p>
          ) : (
            fictionProducts.map((product) => (
              <Grid
                className={classes.categoryFeatured}
                item
                xs={8}
                sm={5}
                md={3}
                lg={2}
                key={product.id} // Added key prop for React list rendering
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

export default Fiction;
