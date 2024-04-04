import { Box, useTheme } from "@mui/material";
import React from "react";
import Container from "./Container.jsx";

const ImageHeader = ({ movie }) => {
    return (
      <>
        <Container>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt="film poster"
            style={{ width: "15vw" }}
          />
          <Typography variant="h2" fontSize={"1rem"}>
            {movie.title}
          </Typography>
          <Typography fontSize={"1rem"}>{movie.release_date}</Typography>
        </Container>
      </>
    );
  };
  
  export default MovieCard;
  