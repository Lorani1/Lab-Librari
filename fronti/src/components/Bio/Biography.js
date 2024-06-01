import { Grid } from "@material-ui/core";
import Product from "../Products/Product/Product.js";
import useStyles from "../Products/styles.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../ProductView/style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Biography = ({ onAddToCart }) => {
  const classes = useStyles();
  const [bioProducts, setBioProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://localhost:7101/api/Libri")
      .then((response) => {
        console.log("Fetched data:", response.data); // Log the fetched data
        const biografis = response.data.filter(
          (product) => product.zhanri.emri === "Biografi"
        );
        console.log("Filtered biografi products:", biografis); // Log the filtered manga products
        setBioProducts(biografis);
      })
      .catch((error) => console.error("Error fetching biografi data:", error));
  }, []);

  return (
    <main className={classes.mainPage}>
      <div className={classes.toolbar} />

      <div className={classes.categorySection}>
        <h3 className={classes.categoryHeader}>Biografitë</h3>
        <h3 className={classes.categoryDesc}>
          Shikoni koleksionin tonë të biografive
        </h3>
        <Grid
          className={classes.categoryFeatured}
          container
          justifyContent="center" // Change justify to justifyContent
          spacing={1}
        >
          {bioProducts.length === 0 ? (
            <p>No biografi books available</p>
          ) : (
            bioProducts.map((product) => (
              <Grid
                className={classes.categoryFeatured}
                item
                xs={8}
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

export default Biography;
