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

function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState(null);
  const [credits, setCredits] = useState(null);
  const { movieId } = useParams();
  useEffect(() => {
    const getDetails = async (movieId) => {
      try {
        const movieInfo = await movieAPI.getInfo(movieId);
        if (movieInfo.response) {
          setMovie(movieInfo.response.data);
          console.log("movieInfo.response.data", movieInfo.response.data);
        } else if (movieInfo.err) {
          console.error("Error fetching movie info:", movieInfo.err);
        }

        const videos = await movieAPI.getVideos(movieId);
        if (videos.response) {
          setVideos(videos.response.data.results);
          console.log(
            "videos.response.data.results",
            videos.response.data.results
          );
        } else if (videos.err) {
          console.error("Error fetching movie videos:", videos.err);
        }

        const credits = await movieAPI.getCredits(movieId);
        if (credits.response) {
          setCredits(credits.response.data.cast);
          console.log("credits.response.data.cast", credits.response.data.cast);
        } else if (credits.err) {
          console.error("Error fetching movie credits:", credits.err);
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    getDetails(movieId);
  }, [movieId]);
  let posterPath = "";
  if (movie) {
    posterPath = movie.backdrop_path || movie.poster_path;
  }
  const src =
    (posterPath && `https://image.tmdb.org/t/p/original${posterPath}`) ||
    "/no_image.jpg";
  return (
    movie && (
      <>
        <ImageHeader imgPath={src} />
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
              width: { xs: "70%", sm: "50%", md: "35%" },margin: { xs: "0 auto 2rem", md: "0 4rem 0 5rem" },
            }}
          >
            <Box
              sx={{
                paddingTop: "140%",
                ...uiConfigs.style.backgroundImage(src),
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
            loading={false}onClick={() => console.log("Add to watchlist")}
            >
              {/* Không có văn bản */}
            </Button>
  
            <Button
              variant="contained"
              sx={{ width: { xs: "50%", md: "auto" },
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
          {credits && <MediaSlider mediaList={credits} mediaType="person"></MediaSlider>}
          </Container>
             </Stack>
            </Box>
          </Box>
  
          {/*action buttons*/}
  
        
          {/*Credits*/}
          {/* cast */}
  
          {/*Trailer*/}
          <div
            style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}
          >
            {videos &&
              videos.slice(0, 4).map((video) => (
                <div
                  key={video.id}
                  style={{ flex: "0 0 auto", margin: "50px auto 10px auto" }}
                >
                  <h3>{video.name}</h3>
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    allowFullScreen
                    style={{ width: "560px", height: "320px" }}
                  ></iframe>
                </div>
              ))}
          </div>
        </>
      )
    );
  }
  export default MovieDetail;
