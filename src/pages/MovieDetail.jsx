import Container from "../components/common/Container";
import Box from "@mui/material/Box";
import 

import movieAPI from "../api/modules/movie.api";

import React, { useEffect, useState } from "react";

function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const movieInfo = await movieAPI.getInfo(1011985);
        if (movieInfo.response) {
          setMovie(movieInfo.response.data);
        } else if (movieInfo.err) {
          console.error("Error fetching movie info:", movieInfo.err);
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    getDetails();
  }, []);

  return (
    <>
      <Container>
       <ImageHeader imgPath = {movie.back_drop.path} />
        {movie && (
          <div className="movie">
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <p>Release Date: {movie.release_date}</p>
            <p>Popularity: {movie.popularity}</p>
            <p>Vote Average: {movie.vote_average}</p>
          </div>
        )}
      </Container>
    </>
  );
}
export default MovieDetail;
