import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Chip,
} from "@material-ui/core";
import { Link } from "react-router-dom";
// import { FaStar } from "react-icons/fa";
import useStyles from "./styles";

const Product = ({ product }) => {
  const classes = useStyles();
  // const [rating, setRating] = useState(0);
  // const [comments, setComments] = useState("");
  // const [showRatingForm, setShowRatingForm] = useState(false);

  // const handleRatingChange = (value) => {
  //   setRating(value);
  // };

  // const handleCommentsChange = (event) => {
  //   setComments(event.target.value);
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("Rating:", rating);
  //   console.log("Comments:", comments);
  // };

  // const handleShowRatingForm = () => {
  //   setShowRatingForm(true);
  // };

  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card}>
        <Link to={`product-view/${product.id}`}>
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
          {/* {!showRatingForm && (
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={handleShowRatingForm}
            >
              Rate & Comment
            </Button>
          )}
          {showRatingForm && (
            <form onSubmit={handleSubmit} className={classes.form}>
              <div className={classes.rating}>
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;

                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        className={classes.radio}
                        onClick={() => handleRatingChange(ratingValue)}
                      />
                      <FaStar
                        className={classes.star}
                        color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                        size={25}
                      />
                    </label>
                  );
                })}
              </div>
              <TextField
                id="comments"
                label="Comments"
                multiline
                rows={3}
                variant="outlined"
                fullWidth
                value={comments}
                onChange={handleCommentsChange}
                className={classes.textField}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.submitButton}
              >
                Submit
              </Button>
            </form>
          )} */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Product;
