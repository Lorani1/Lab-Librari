import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Product = ({ product }) => {
  const classes = useStyles();

  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card}>
      <Link to={`/product-view/${product.id}`}>
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
        </Link>
        <CardContent>
          <Typography variant="h6" component="h2" align="center">
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
              label={product.inStock ? "In Stock" : "Out of Stock"}
              className={product.inStock ? classes.inStock : classes.outOfStock}
            />
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Product;