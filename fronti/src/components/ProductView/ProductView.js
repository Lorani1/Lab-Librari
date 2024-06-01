import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Button,
  Typography,
  CssBaseline,
  TextField,
  Box,
  Paper,
  Avatar,
  Collapse,
  makeStyles,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { Link, useParams } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  productImage: {
    maxWidth: "100%",
    borderRadius: theme.shape.borderRadius,
  },
  textWrapper: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(4),
    },
  },
  productTitle: {
    fontWeight: "bold",
    marginTop: theme.spacing(8), // Adjust this value to move the title down
  },
  continueShoppingButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    marginTop: theme.spacing(2),
  },
  ratingPaper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  },
  reviewsSection: {
    position: "relative",
    marginTop: theme.spacing(4),
  },
  reviewsContainer: {
    overflow: "hidden",
  },
  reviewPaper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "flex-start",
  },
  reviewAvatar: {
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(2),
  },
  noReviews: {
    marginTop: theme.spacing(2),
  },
}));

const createMarkup = (text) => {
  return { __html: text };
};

const ProductView = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useState({});
  const [error, setError] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);

  // Dummy client data (replace with actual client data from context/auth)
  const klient = {
    id: 1, // Replace with actual client ID
    emri: "Test User", // Replace with actual client name
  };

  const fetchCommerceProduct = async (id) => {
    try {
      const response = await commerce.products.retrieve(id);
      const { name, media, description } = response;
      setProduct({
        titulli: name,
        src: media.source,
        description,
      });
    } catch (error) {
      console.error(error);
      setError("Product not found");
    }
  };

  const fetchBookProduct = async (id) => {
    try {
      const response = await axios.get(
        `https://localhost:7101/api/Libri/${id}`
      );
      const { titulli, profilePictureUrl, description } = response.data;
      setProduct({
        titulli,
        src: profilePictureUrl,
        description,
      });
    } catch (error) {
      console.error(error);
      setError("Product not found");
    }
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const fetchReviews = async (bookId) => {
    try {
      const response = await axios.get(
        `https://localhost:7101/api/RatingComment?productId=${bookId}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    // Determine if the ID belongs to a commerce product or a book product
    const isCommerceProduct = id.startsWith("commerce-"); // Adjust this logic as needed
    if (isCommerceProduct) {
      fetchCommerceProduct(id.replace("commerce-", ""));
    } else {
      const bookId = id.replace("book-", "");
      fetchBookProduct(bookId);
      fetchReviews(bookId);
    }
    fetchCart();
  }, [id]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleRatingSubmit = () => {
    if (rating < 1 || rating > 5) {
      toast.error("Rating must be between 1 and 5");
      return;
    }
    if (!comment) {
      toast.error("Comment cannot be empty");
      return;
    }

    const url = `https://localhost:7101/api/RatingComment`;

    const data = {
      ratingsCommentID: 0,
      rating: rating,
      comment: comment,
      klientID: klient.id,
      klientName: klient.emri,
      libriID: id.replace("book-", ""), // Assuming id is the book id
      libriTitle: product.titulli,
    };

    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        toast.success("Rating has been added");
        setRating(0);
        setComment("");
        fetchReviews(id.replace("book-", ""));
      })
      .catch((error) => {
        toast.error("Failed to add rating. Please try again.");
        console.error("Error adding rating:", error);
      });
  };

  const handleToggleReviews = () => {
    setShowReviews(!showReviews);
  };

  if (error) {
    return (
      <Container className={classes.root}>
        <Typography variant="h3" color="error">
          {error}
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Go back to Home
        </Button>
      </Container>
    );
  }

  return (
    <>
      <CssBaseline />
      <Navbar
        totalItems={cart.total_items}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Container className={classes.root}>
        <ToastContainer />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} className={classes.imageWrapper}>
            <img
              src={product.src}
              alt={product.titulli}
              className={classes.productImage}
            />
          </Grid>
          <Grid item xs={12} md={6} className={classes.textWrapper}>
            <Typography
              variant="h2"
              gutterBottom
              className={classes.productTitle}
            >
              <b>{product.titulli}</b>
            </Typography>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={createMarkup(product.description)}
              gutterBottom
            />
            <Button
              component={Link}
              to="/"
              variant="contained"
              className={classes.continueShoppingButton}
            >
              Continue Shopping
            </Button>
            <Box mt={4}>
              <Paper elevation={3} className={classes.ratingPaper}>
                <Typography variant="h5" gutterBottom>
                  Leave a Rating and Comment
                </Typography>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Rating
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                    style={{ marginBottom: 16 }}
                  />
                  <TextField
                    fullWidth
                    label="Comment"
                    multiline
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    style={{ marginBottom: 16 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRatingSubmit}
                    style={{ marginTop: 16 }}
                  >
                    Submit
                  </Button>
                </Box>
              </Paper>
            </Box>
            <Box mt={4} className={classes.reviewsSection}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleToggleReviews}
                style={{ marginBottom: 16 }}
              >
                {showReviews ? "Hide Reviews" : "Show Reviews"}
              </Button>
              <Collapse in={showReviews} className={classes.reviewsContainer}>
                <div>
                  <Typography variant="h5" gutterBottom>
                    Reviews
                  </Typography>
                  {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                      <Paper
                        key={index}
                        elevation={3}
                        className={classes.reviewPaper}
                      >
                        <Avatar className={classes.reviewAvatar}>
                          {review.klientName[0]}
                        </Avatar>
                        <div>
                          <Typography variant="subtitle1" gutterBottom>
                            {review.klientName}
                          </Typography>
                          <Rating value={review.rating} readOnly />
                          <Typography variant="body2" gutterBottom>
                            {review.comment}
                          </Typography>
                        </div>
                      </Paper>
                    ))
                  ) : (
                    <Typography variant="body1" className={classes.noReviews}>
                      No reviews yet.
                    </Typography>
                  )}
                </div>
              </Collapse>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProductView;
