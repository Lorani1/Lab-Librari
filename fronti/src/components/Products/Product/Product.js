import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
} from '@material-ui/core';
import useStyles from './styles';
import ExchangeForm from '../../../Exchange/ExchangeForm'; 

const Product = ({ product }) => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card}>
        <div className={classes.imageContainer}>
          <CardMedia
            component="img"
            alt={product.titulli}
            height="140"
            image={product.profilePictureUrl}
            title={product.titulli}
            className={classes.image}
          />
        </div>
        <CardContent className={classes.cardContent}>
          <Typography
            variant="h6"
            component="h2"
            align="center"
            className={classes.title}
          >
            {product.titulli}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            align="center"
          >
            Zhanri: {product.zhanri.emri}
            <br />
            <Chip
              label={product.inStock ? 'In Stock' : 'Out of Stock'}
              className={`${classes.chip} ${
                product.inStock ? classes.inStock : classes.outOfStock
              }`}
            />
          </Typography>
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModal}
              className={classes.exchangeButton}
            >
              Exchange
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ExchangeFormModal */}
      <ExchangeForm
        open={showModal}
        onClose={handleCloseModal}
        libriId={product.id} 
      />
    </div>
  );
};

export default Product;
