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
import { jwtDecode } from "jwt-decode";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
  },
  productImage: {
    width: "100%",
    borderRadius: theme.shape.borderRadius,
  },
  addToCartButton: {
    marginTop: theme.spacing(2),
  },
  reviewSection: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  },
  reviewPaper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  reviewAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  reviewContent: {
    flex: 1,
  },
  submitButton: {
    marginTop: theme.spacing(2),
    alignSelf: "flex-start",
  },
  productTitle: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    fontSize: "3rem",
    fontWeight: "bold",
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
  const [user, setUser] = useState(null);
  const [klientData, setKlientData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        `https://localhost:7101/api/Libri/${bookId}`
      );

      if (response.data && response.data.ratingComments) {
        const reviews = response.data.ratingComments.$values;
        setReviews(reviews);
      } else {
        setReviews([]);
        console.error("Expected rating comments but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `https://localhost:7101/api/Klient/${userId}`
      );
      if (response.data && typeof response.data === "object") {
        setKlientData(response.data);
      } else {
        setKlientData(null);
        console.error("Expected an object but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching klient data:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      }
      setKlientData(null);
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      try {
        const decodedToken = jwtDecode(authToken);
        setUser({
          id: decodedToken.nameid,
          email: decodedToken.email,
          role: decodedToken.role,
          klientName: decodedToken.emri,
          klientProfilePicture: decodedToken.profilePicturePath
            ? `https://localhost:7101/foto/${decodedToken.profilePicturePath}`
            : null,
        });
        setIsAuthenticated(true);
        fetchUserData(decodedToken.nameid);
      } catch (error) {
        console.error("Invalid token:", error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }

    const bookId = id.replace("book-", "");
    fetchBookProduct(bookId);
    fetchReviews(bookId);
    fetchCart();
  }, [id]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleRatingSubmit = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to leave a rating and comment");
      return;
    }

    if (rating < 1 || rating > 5) {
      toast.error("Rating must be between 1 and 5");
      return;
    }
    if (!comment) {
      toast.error("Comment cannot be empty");
      return;
    }

    const authToken = localStorage.getItem("authToken");
    const bookId = id.replace("book-", "");

    if (!klientData) {
      toast.error("Failed to retrieve user data. Please try again.");
      return;
    }

    const data = {
      ratingsCommentID: 0,
      rating: rating,
      comment: comment,
      klientID: user?.id,
      klientName: `${klientData.emri} ${klientData.mbiemri}`,
      klientProfilePicture: user?.klientProfilePicture,
      libriID: bookId,
      libriTitle: product.titulli,
    };

    axios
      .post("https://localhost:7101/api/RatingComment", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((result) => {
        toast.success("Rating has been added");
        setRating(0);
        setComment("");
        fetchReviews(bookId);
      })
      .catch((error) => {
        console.error("Error adding rating:", error);
        if (error.response && error.response.status === 409) {
          toast.error("Conflict: You may have already submitted a rating.");
        } else {
          toast.error("Failed to add rating. Please try again.");
        }
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
        <Button component={Link} to="/">
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <div>
      <CssBaseline />
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Container className={classes.root}>
        {/* Render product details */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <img
              src={product.src}
              alt={product.titulli}
              className={classes.productImage}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" className={classes.productTitle}>
              {product.titulli}
            </Typography>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={createMarkup(product.description)}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.addToCartButton}
              onClick={() => commerce.cart.add(id, 1)}
            >
              Huazo
            </Button>
          </Grid>
        </Grid>
        {/* Rating and comment form */}
        <Box className={classes.reviewSection}>
          <Typography variant="h5" gutterBottom>
            Leave a Rating and Comment
          </Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <TextField
            label="Comment"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.submitButton}
            onClick={handleRatingSubmit}
          >
            Submit
          </Button>
        </Box>
        {/* Reviews section */}
        <Box mt={5}>
          <Button onClick={handleToggleReviews}>
            {showReviews ? "Hide Reviews" : "Show Reviews"}
          </Button>
          <Collapse in={showReviews}>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <Paper key={index} className={classes.reviewPaper}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Avatar
                        className={classes.reviewAvatar}
                        src={
                          review.klient.profilePictureUrl ||
                          `https://localhost:7101/foto/${review.klient.profilePicturePath}`
                        }
                      />
                    </Grid>
                    <Grid item xs className={classes.reviewContent}>
                      <Typography variant="h6">
                        {`${review.klient.emri} ${review.klient.mbiemri}`}
                      </Typography>
                      <Rating value={review.rating} readOnly />
                      <Typography variant="body1">{review.comment}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              ))
            ) : (
              <Typography variant="body1">No reviews yet.</Typography>
            )}
          </Collapse>
        </Box>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default ProductView;
