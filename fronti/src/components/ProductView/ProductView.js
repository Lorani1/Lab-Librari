import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
//import { commerce } from "../../../public/lib/commerce";

const createMarkup = (text) => {
  return { __html: text };
};

const ProductView = () => {
  const [product, setProduct] = useState({});

  const fetchProduct = async (id) => {
    const response = await commerce.products.retrieve(id);
    console.log({ response });
    const { name, price, media, quantity, description } = response;
    setProduct({
      name,
      quantity,
      description,
      src: media.source,
      price: price.formatted_with_symbol,
    });
  };

  useEffect(() => {
    const id = window.location.pathname.split("/");
    fetchProduct(id[2]);
  }, []);

  return (
    <Container className="my-5">
      <Row>
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <img src={product.src} alt={product.name} className="img-fluid" />
        </Col>
        <Col
          xs={12}
          md={5}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <h2 className="mb-3">{product.name}</h2>
          <div
            dangerouslySetInnerHTML={createMarkup(product.description)}
            className="mb-3"
          />
          <h3 className="text-secondary mb-3">
            Cmimi: <b>{product.price}</b>
          </h3>
          <Button variant="primary" as={Link} to="/" className="w-100">
            Vazhdo blerjen
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductView;
