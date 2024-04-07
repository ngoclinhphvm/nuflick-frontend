import Container from "../components/common/Container";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import ImageHeader from "../components/common/ImageHeader";
import tmdbConfigs from "../api/configs/tmdb.configs";
import movieAPI from "../api/modules/movie.api.js";
import CircularRate from "../components/common/CircularRate";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetail (){
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

  return (
    movie && (
      <>
        <ImageHeader
          imgPath={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        />
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
              margin: { xs: "0 auto 2rem", md: "0 4rem 0 5rem" },
            }}
          >
            <Box
              sx={{
                paddingTop: "140%",
                ...uiConfigs.style.backgroundImage(
                  tmdbConfigs.posterPath(movie.poster_path)
                ),
              }}
            />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "60%" },
              color: "text.primary",
            }}
          >
            {/* title */}
            <Typography
              variant="h4"
              fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
              fontWeight="700"
              sx={{ ...uiConfigs.style.typoLines(2, "left") }}
            >
              {`${movie.title || movie.name} ${
                movie.release_date.split("-")[0]
              }`}
            </Typography>
            {/* title */}

            {/* rate and genres */}
            <Stack direction="row" spacing={1} alignItems="center">
              {/* rate */}
              <CircularRate value={movie.vote_average} />
              {/* rate */}
              <Divider orientation="vertical" />
            </Stack>
            {/* rate and genres */}

            {/* overview */}
            <Typography
              variant="body1"
              sx={{ ...uiConfigs.style.typoLines(5) }}
            >
              {movie.overview}
            </Typography>
          </Box>
        </Box>

        {/*Credits*/}
        <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row"}}>
          {credits &&
            credits.slice(0, 4).map((credit) => (
              <div key={credit.id} style={{  margin: "auto 10px auto 20px" }}>
                <h3>{credit.name}</h3>
                
                <img
                  src={`https://image.tmdb.org/t/p/w500${credit.profile_path}`}
                  alt={credit.name}
                  width="100"  // set the width
                  height="150" // set the height
                />
                <p>{credit.character}</p>
              </div>
            ))}
        </div>

        {/*Trailer*/}
        <div style={{ display: "flex", flexWrap: "wrap" ,flexDirection: "column"}}>
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
};
export default MovieDetail;
