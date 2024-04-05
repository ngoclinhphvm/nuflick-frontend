import Container from "../components/common/Container";
import { Box, Toolbar, Typography, Stack } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import ImageHeader from "../components/common/ImageHeader";

import movieAPI from "../api/modules/movie.api";

import React, { useEffect, useState } from "react";

const MovieDetail = ({ movieId }) => {
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState(null);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
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
    getDetails();
  }, []);

  return (
    movie && (
      <>
        <Container>
          <ImageHeader
            imgPath={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          />
          

          {videos &&
            videos.map((video) => (
              <div key={video.id}>
                <h3>{video.name}</h3>
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          {credits &&
            credits.map((credit) => (
              <div key={credit.id}>
                <h3>{credit.name}</h3>
                <img
                  src={`https://image.tmdb.org/t/p/w500${credit.profile_path}`}
                  alt={credit.name}
                />
                <p>Character: {credit.character}</p>
              </div>
            ))}
        </Container>
      </>
    )
  );
};
export default MovieDetail;
