import "./review.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import reviewApi from "../../api/modules/review.api.js";
import movieApi from "../../api/modules/movie.api.js";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { TextField, Stack, Divider } from "@mui/material";
import { toast } from "react-toastify";
import ReviewItem from "../common/ReviewItem";


const Review = ({reviews}) => {
  //const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [listReviews, setListReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);

  const skip = 5;
  useEffect(() => {
    const getDetails = async (movieId) => {
      const movieData = await movieApi.getInfo(movieId);
      if (movieData.response) {
        setMovie(movieData.response.data);
      } else {
        console.log(movieData.err);
      }
    };
    getDetails(movieId);
  }, []);

  useEffect(() => {
    setListReviews([...reviews]);
    setFilteredReviews([...reviews].splice(0,skip));
  }, [reviews]);

  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  const user = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : null;

  const username = user ? JSON.parse(user).username : "null";
  // console.log(user);
  const [newReview, setNewReview] = useState({
    username: username,
    movieId: movieId,
    text: "",
    create_at: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: newReview.username,
      movieId: newReview.movieId,
      text: newReview.text,
      create_at: new Date().toISOString().split("T")[0],
    };
    console.log(data);

    //console.log(data, token)
    reviewApi.createReview(data, token).then((res) => {
      console.log(res);
      if (res.success) {
        toast.success("Review created successfully");
        console.log("success");
        setShowReviewForm(false);
        setNewReview({
          username: username,
          movieId: movieId,
          text: "",
          create_at: "",
        });
        setFilteredReviews([...reviews, res.review]);

       // navigate(`/movie/${movieId}`);
      } else {
        toast.error("Failed to create review");
        console.log("error");
      }
    });
  };

  const onLoadMore = () => {
    setFilteredReviews([...filteredReviews, ...[...listReviews].splice(page * skip, skip)]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    if (listReviews.findIndex(e => e._id === id) !== -1) {
      const newListReviews = [...listReviews].filter(e => e._id !== id);
      setListReviews(newListReviews);
      setFilteredReviews([...newListReviews].splice(0, page * skip));
    } else {
      setFilteredReviews([...filteredReviews].filter(e => e._id !== id));
    }


    toast.success("Remove review success");
  };

  const handleChange = (event) => {
    setNewReview({
      ...newReview,
      [event.target.name]: event.target.value,
    });
  };
  const handleWriteReviewClick = () => {
    if(token){
        setShowReviewForm(true);
      //  navigate('/reviews/' + movieId);
      }else {
        navigate('/login');
        }
  };

  return (
    <>
    <Stack spacing={2}>
      {filteredReviews.map((review) => (
        <Box>
          <ReviewItem key={review._id} review={review} onRemoved={onRemoved} />
          <Divider sx={{
                display: { xs: "block", md: "none" }
              }} />
        </Box>
      ))}
        {filteredReviews.length < listReviews.length && (
          <Button onClick={onLoadMore}>load more</Button>
        )}
    </Stack>
  
    <Box sx={{ marginTop: 2 }}>
        
      {!showReviewForm && (
        <Button
          variant="contained"
          sx = {{backgroundColor: "darkred"}}
          startIcon={<CreateOutlinedIcon />}
          onClick={handleWriteReviewClick}
        >
          Write Review
        </Button>
      )}

      {showReviewForm && (
        <form
          className="review-form"
          onSubmit={handleSubmit}
          direction="column"
          spacing={2}
        >
          <Stack direction="column" spacing={2}>
        <TextField
            className="review-text"
            id="outlined-basic"
            name="text"
            label="Write your review"
            variant="outlined"
            value={newReview.text}
            onChange={handleChange}
            multiline
            rows={3}
            required
        />
        <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ width: "max-content", backgroundColor: "darkred" }}
            startIcon={<SendOutlinedIcon />}
            loadingPosition="start"
        >
            Submit
        </Button>
    </Stack>
        </form>
      )}
    </Box>
    </>
  );
}

export default Review;
