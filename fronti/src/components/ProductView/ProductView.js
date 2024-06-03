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
import {jwtDecode} from "jwt-decode"; // Import without destructuring

const useStyles = makeStyles((theme) => ({
  // ... your styles here
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
        console.log("Fetched reviews:", reviews); // Log the reviews data
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
      console.log(`Fetching user data for userId: ${userId}`);
      const response = await axios.get(`https://localhost:7101/api/Klient/${userId}`);
      console.log("Response data:", response.data);
  
      if (response.data && typeof response.data === 'object') {
        setKlientData(response.data);
      } else {
        setKlientData(null);
        console.error("Expected an object but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching klient data:", error);
      setKlientData(null);
    }
  };
  
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      try {
        const decodedToken = jwtDecode(authToken);
        console.log("Decoded token:", decodedToken); // Log the decoded token
        setUser({
          id: decodedToken.nameid, // Verify this field
          email: decodedToken.email,
          role: decodedToken.role,
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
      klientName: `${klientData?.emri} ${klientData?.mbiemri}`,
      klientProfilePicture: klientData?.profilePictureUrl,
      libriID: bookId,
      libriTitle: product.titulli,
    };
  
    console.log("Submitting rating with data:", data);
  
    axios
      .post("https://localhost:7101/api/RatingComment", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((result) => {
        console.log("Rating submitted successfully:", result);
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
              className="product-image"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4">{product.titulli}</Typography>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={createMarkup(product.description)}
            />
            {/* Add to cart button */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => commerce.cart.add(id, 1)}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
        {/* Rating and comment form */}
        <Box mt={5}>
          <Typography variant="h5">Leave a Rating and Comment</Typography>
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
          />
          <Button
            variant="contained"
            color="primary"
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
  {reviews.map((review) => (
    <Paper key={review.ratingsCommentID} className={classes.review}>
      <Box display="flex" alignItems="center">
        <Avatar src={review.klientProfilePicture} />
        <Box ml={2}>
          <Typography variant="h6">
            {review.klientName ? review.klientName : "Anonymous"}
          </Typography>
          <Rating value={review.rating} readOnly />
        </Box>
      </Box>
      <Typography variant="body1">{review.comment}</Typography>
    </Paper>
  ))}
</Collapse>

</Box>

      </Container>
      <ToastContainer />
    </div>
  );
};

export default ProductView;
