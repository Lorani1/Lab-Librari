import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AddShoppingCart } from "@material-ui/icons";

const Product = ({ product, onAddToCart }) => {
  return (
    <Card style={{ maxWidth: "100%" }}>
      <Link to={`product-view/${product.id}`}>
        <Card.Img variant="top" src={product.media.source} alt={product.name} />
      </Link>
      <Card.Body>
        <Card.Title className="text-center">{product.name}</Card.Title>
        <Card.Text className="text-center">
          <b>{product.price.formatted_with_symbol}</b>
        </Card.Text>
        <Button
          variant="primary"
          className="w-100"
          onClick={() => onAddToCart(product.id, 1)}
        >
          <b>Huazo</b> <AddShoppingCart />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
