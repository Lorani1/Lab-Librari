import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Product = ({ product }) => {
  const classes = useStyles();

  return (
    <div className="col">
      <Card className={classes.card}>
        <Link to={`product-view/${product.id}`}>
          <div className={classes.imageContainer}>
            <Card.Img
              variant="top"
              src={product.profilePictureUrl}
              alt={product.titulli}
              className={classes.image}
            />
          </div>
        </Link>
        <Card.Body>
          <Card.Title className="text-center">{product.titulli}</Card.Title>
          <Card.Text className="text-center">
            Kategoria: {product.kategoria}
            <br />
            <span
              className={`book-stock ${
                product.inStock ? "text-success" : "text-danger"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
