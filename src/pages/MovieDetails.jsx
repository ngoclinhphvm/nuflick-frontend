import Container from "../components/common/Container.jsx";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import ImageHeader from "../components/common/ImageHeader";
import CircularRate from "../components/common/CircularRate";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import MediaSlider from "../components/common/MediaSlider.jsx";
import VideosSlide from "../components/common/VideosSlide.jsx";
import BackdropSlide from "../components/common/BackdropSlide.jsx";
import PosterSlide from "../components/common/PosterSlide.jsx";
import ReviewItem from "../components/common/ReviewItem.jsx";
import Review from "../components/Review/Review.jsx";
import { useNavigate } from "react-router-dom";
import reviewApi from "../api/modules/review.api.js";
import movieAPI from "../api/modules/movie.api.js";
import accountApi from "../api/modules/account.api.js";
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//test

function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [credits, setCredits] = useState([]);
  const [backdrops, setBackdrops] = useState([]);
  const [posters, setPosters] = useState([]);
  const [similars, setSimilars] = useState([]);
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const [value, setValue] = React.useState("one");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  const user = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : null;

  const username = user ? JSON.parse(user).username : "null";

  let poster_path = "";
  let backdrop_path = "";
  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getDetails = async (movieId) => {
      try {
        const movieInfo = await movieAPI.getInfo(movieId);
        if (movieInfo.response) {
          setMovie(movieInfo.response.data);
        } else if (movieInfo.err) {
          console.error("Error fetching movie info:", movieInfo.err);
        }

        const videos = await movieAPI.getVideos(movieId);
        if (videos.response) {
          setVideos(videos.response.data.results);
        } else if (videos.err) {
          console.error("Error fetching movie videos:", videos.err);
        }

        const credits = await movieAPI.getCredits(movieId);
        if (credits.response) {
          setCredits(credits.response.data.cast);
        } else if (credits.err) {
          console.error("Error fetching movie credits:", credits.err);
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      }

      const reviewList = await reviewApi.getReviews(movieId);

      if (reviewList) {
        console.log(reviewList.length);
        setReviews(reviewList);
      } else {
        console.log("Error fetching reviews");
      }

      const imagesData = await movieAPI.getImages(movieId);
      if (imagesData.response) {
        setBackdrops(imagesData.response.backdrops);
        setPosters(imagesData.response.posters);
      } else if (backdrops.err) {
        console.error("Error fetching movie images:", backdrops.err);
      }

      const similars = await movieAPI.getSimilar(movieId);
      if (similars.response) {
        setSimilars(similars.response.data.results);
      } else if (similars.err) {
        console.error("Error fetching movie images:", similars.err);
      }
    };
    getDetails(movieId);
  }, [movieId]);
  if (movie) {
    poster_path =
      (movie.poster_path &&
        `https://image.tmdb.org/t/p/original${movie.poster_path}`) ||
      "/film.jpg";
    backdrop_path =
      (movie.backdrop_path &&
        `https://image.tmdb.org/t/p/original${movie.backdrop_path}`) ||
      "/no_image.jpg";
  }
  const handleNewReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };
  if (token) {
    const favoriteData = user ? user.favoriteFilm : null;
    //console.log(favoriteData);
    if (favoriteData) {
      setFavoriteList(favoriteData);
      if (favoriteData.find((item) => item === movieId)) {
        setIsFavorite(true);
      }
    } else {
      console.log("Error fetching favorite list");
    }
    console.log(favoriteList);
  }
  return (
    movie && (
      <>
        <ImageHeader imgPath={backdrop_path} />
        {/* Poster */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" },
          }}
        >
          <Box
            sx={{
              width: { xs: "70%", sm: "50%", md: "35%" },
              margin: { xs: "0 auto 2rem", md: "2 4rem 0 0" },
            }}
          >
            <Box
              sx={{
                paddingTop: "140%",
                ...uiConfigs.style.backgroundImage(poster_path),
                transition: "height 0.3s ease",
                height: "100%",
              }}
            />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "60%" },
              color: "text.primary",
              padding: { xs: "1rem", md: "2rem" },
            }}
          >
            <Stack spacing={4} maxHeight={"200%"}>
              {/* title */}
              <Typography
                variant="h4"
                fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                fontWeight="700"
                sx={{ ...uiConfigs.style.typoLines(2, "left") }}
              >
                {`${movie.title || movie.name} (${
                  movie.release_date.split("-")[0]
                })
              `}
              </Typography>
              {/* title */}

              {/* rate and genres */}
              <Stack direction="row" spacing={1} alignItems="center">
                {/* rate */}
                {movie.vote_average > 0 && (
                  <CircularRate value={movie.vote_average} />
                )}
                {/* rate */}
                <Divider orientation="vertical" />
                {/* genres */}
                {movie.genres.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name} //genre.name
                    variant="filled"
                    color="warning"
                    clickable="true"
                    sx={{
                      fontWeight: "5", // Thiết lập độ đậm cho kiểu chữ
                      color: "white", // Thiết lập màu sắc cho kiểu chữ
                      backgroundColor: "darkred", // Thiết lập màu sắc cho nền
                      fontFamily: "'Arial', 'sans-serif'",
                    }}
                  />
                ))}
                {/* genres */}
              </Stack>
              {/* rate and genres */}

              {/* overview */}
              <Typography
                variant="body1"
                sx={{ ...uiConfigs.style.typoLines(5) }}
              >
                {movie.overview}
              </Typography>

              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                sx={{
                  alignItems: { xs: "center" },
                }}
              >
                <IconButton
                  variant="none"
                  sx={{
                    color: isFavorite ? "red" : "inherit",
                  }}
                  size="large"
                  onClick={async () => {
                    if (token) {
                      if (!isFavorite) {
                        console.log("Add to favorite");
                        await accountApi.addFavorite(username, movie.id, token);
                        setIsFavorite(true);
                      } else {
                        console.log("Remove from favorite");
                        await accountApi.removeFavorite(
                          username,
                          movie.id,
                          token
                        );
                        setIsFavorite(false);
                      }
                    } else {
                      navigate("/login");
                    }
                  }}
                  loadingPosition="start"
                  loading={false}
                >
                  <FavoriteBorderOutlinedIcon />

                  {/* Không có văn bản */}
                </IconButton>

                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => console.log("Add to watchlist")}
                >
                  <BookmarkBorderOutlinedIcon />
                </IconButton>

                <Button
                  variant="contained"
                  sx={{
                    width: { xs: "50%", md: "auto" },
                    backgroundColor: "darkred",
                  }}
                  startIcon={<PlayArrowIcon />}
                  size="large"
                  onClick={() => {
                    if (videoRef.current)
                      return videoRef.current.scrollIntoView();
                  }}
                >
                  Watch Trailer
                </Button>
              </Stack>
              <Container header={"Cast"}>
                {credits && (
                  <MediaSlider
                    mediaList={credits}
                    mediaType="person"
                  ></MediaSlider>
                )}
              </Container>
            </Stack>
          </Box>
        </Box>

        {/*action buttons*/}

        {/*Credits*/}
        {/* cast */}

        {/*Trailer*/}
        {/* {videos.length !== 0 && (
          <Box padding={4}>
            <Container header={"Videos"} padding="center">
              <VideosSlide videos={videos}></VideosSlide>
            </Container>
          </Box>
        )}} */}
        {(videos.length != 0 ||
          backdrops.length != 0 ||
          posters.length != 0) && (
          <Box padding={4}>
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="black"
                indicatorColor="primary"
                aria-label="secondary tabs example"
                sx={{ marginBottom: "0px" }} // Thêm một khoảng cách dưới Tabs
              >
                <Tab
                  value="zero"
                  label={
                    <Typography
                      variant="h5"
                      fontWeight="700"
                      text-decoration="underline"
                    >
                      MEDIAS
                    </Typography>
                  }
                  disabled="true"
                />
                <Tab
                  value="one"
                  label={
                    <Typography variant="h6" fontWeight="bold">
                      VIDEOS
                    </Typography>
                  }
                />
                <Tab
                  value="two"
                  label={
                    <Typography variant="h6" fontWeight="bold">
                      POSTERS
                    </Typography>
                  }
                />
                <Tab
                  value="three"
                  label={
                    <Typography variant="h6" fontWeight="bold">
                      BACKDROPS
                    </Typography>
                  }
                />
              </Tabs>

              {value === "one" && videos.length !== 0 && (
                <div ref={videoRef}>
                  <Box padding={4}>
                    <VideosSlide videos={videos}></VideosSlide>
                  </Box>
                </div>
              )}

              {value === "two" && posters.length !== 0 && (
                <Box padding={4}>
                  <PosterSlide posters={posters}></PosterSlide>
                </Box>
              )}

              {value === "three" && backdrops.length !== 0 && (
                <Box padding={4}>
                  <BackdropSlide backdrops={backdrops}></BackdropSlide>
                </Box>
              )}
            </Box>
          </Box>
        )}

        {/*Reviews*/}
        <Box padding={4}>
          <Container header={"Reviews"} padding="center">
            {reviews &&
              reviews.map((review, index) => (
                <ReviewItem key={index} review={review}></ReviewItem>
              ))}
            <Review movieId={movieId} reviews={reviews}></Review>
          </Container>
          <Button
            variant="none"
            sx={{
              width: "fit-content",
              minWidth: 0,
              p: 0,
            }}
            startIcon={<AddIcon />}
            size="large"
            loadingPosition="start"
            loading={false}
            onClick={() => {
              if (token) {
                navigate("/reviews/" + movieId);
              } else {
                navigate("/login");
              }
            }}
          >
            {/* Không có văn bản */}
          </Button>
        </Box>

        {similars.length !== 0 && (
          <Box padding={4}>
            <Container header={"You may also like"} padding="center">
              <MediaSlider mediaList={similars} mediaType="movie"></MediaSlider>
            </Container>
          </Box>
        )}
      <ToastContainer />
      </>
    )
  );
}
export default MovieDetail;
