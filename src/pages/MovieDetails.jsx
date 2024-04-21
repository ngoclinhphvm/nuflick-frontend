import Container from "../components/common/Container";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import ImageHeader from "../components/common/ImageHeader";
import movieAPI from "../api/modules/movie.api.js";
import CircularRate from "../components/common/CircularRate";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MediaGrid from "../components/common/MediaGrid.jsx";
import LoadingButton from "@mui/lab/LoadingButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import MediaSlider from "../components/common/MediaSlider.jsx";
import VideosSlide from "../components/common/VideosSlide.jsx";
import BackdropSlide from "../components/common/BackdropSlide.jsx";
import PosterSlide from "../components/common/PosterSlide.jsx";
import { common } from "@mui/material/colors";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import reviewApi from "../api/modules/review.api";



function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [credits, setCredits] = useState([]);
  const [backdrops, setBackdrops] = useState([]);
  const [posters, setPosters] = useState([]);
  const [similars, setSimilars] = useState([]);
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let poster_path = "";
  let backdrop_path = "";
  useEffect(() => {
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
     
      if(reviewList){
        console.log(reviewList.length);
        setReviews(reviewList);
      }else{

        console.log("Error fetching reviews");
      }

      const backdrops = await movieAPI.getImages(movieId);
      if (backdrops.response) {
        setBackdrops(backdrops.response.backdrops);
      } else if (backdrops.err) {
        console.error("Error fetching movie images:", backdrops.err);
      }
      const posters = await movieAPI.getImages(movieId);
      if (posters.response) {
        setPosters(posters.response.posters);
      } else if (posters.err) {
        console.error("Error fetching movie images:", posters.err);
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
      "/no_image.jpg";
    backdrop_path =
      (movie.backdrop_path &&
        `https://image.tmdb.org/t/p/original${movie.backdrop_path}`) ||
      "/no_image.jpg";
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
            <Stack spacing={4}>
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
                <CircularRate value={movie.vote_average} />
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

              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <LoadingButton
                  variant="none"
                  sx={{
                    width: "fit-content",
                    minWidth: 0,
                    p: 0,
                  }}
                  size="large"
                  startIcon={<FavoriteBorderOutlinedIcon />}
                  onClick={() => console.log("Add to favorite")}
                  loadingPosition="start"
                  loading={false}
                >
                  {/* Không có văn bản */}
                </LoadingButton>

                <Button
                  variant="none"
                  sx={{
                    width: "fit-content",
                    minWidth: 0,
                    p: 0,
                  }}
                  startIcon={<BookmarkBorderOutlinedIcon />}
                  size="large"
                  loadingPosition="start"
                  loading={false}
                  onClick={() => console.log("Add to watchlist")}
                >
                  {/* Không có văn bản */}
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    width: { xs: "50%", md: "auto" },
                    backgroundColor: "darkred",
                  }}
                  startIcon={<PlayArrowIcon />}
                  size="large"
                  onClick={() => console.log("Watch trailer")}
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
        )} */}

        {/* Backdrops
         {backdrops.length !== 0 && (
          <Box padding={4}>
            <Container header={"Backdrops"} padding="center">
              <BackdropSlide backdrops={backdrops}></BackdropSlide>
            </Container>
          </Box>
        )}
        {posters.length !== 0 && (
          <Box padding={4}>
            <Container header={"Posters"} padding="center">
              <PosterSlide posters={posters}></PosterSlide>
            </Container>
          </Box>
        )} */}
        <Box padding={4}>
          <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="black"
        indicatorColor="primary"
        aria-label="secondary tabs example"
        sx={{ marginBottom: '0px' }} // Thêm một khoảng cách dưới Tabs
      >
        <Tab value="zero" label={<Typography variant="h5" fontWeight="700" text-decoration="underline">MEDIAS</Typography>} disabled="true"  />
        <Tab value="one" label={<Typography variant="h6" fontWeight="bold">VIDEOS</Typography>} />
        <Tab value="two" label={<Typography variant="h6" fontWeight="bold">POSTERS</Typography>} />
        <Tab value="three" label={<Typography variant="h6" fontWeight="bold">BACKDROPS</Typography>} />
      </Tabs>

      {value === 'one' && (
        videos.length !== 0 && (
          <Box padding={4}>
              <VideosSlide videos={videos}></VideosSlide>
          </Box>
        )
      )}

      {value === 'two' && (
        posters.length !== 0 && (
          <Box padding={4}>
              <PosterSlide posters={posters}></PosterSlide>
          </Box>
        )
      )}

      {value === 'three' && (
        backdrops.length !== 0 && (
          <Box padding={4}>
              <BackdropSlide backdrops={backdrops}></BackdropSlide>
          </Box>
        )
      )}
    </Box>
        </Box>
       
        {similars.length !== 0 && (
          <Box padding={4}>
            <Container header={"You may also like"} padding="center">
              <MediaSlider mediaList={similars} mediaType="movie"></MediaSlider>
            </Container>
          </Box>
        )}
      </>

    )
  );
}
export default MovieDetail;
