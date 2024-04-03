import { Typography } from "@mui/material";
import Container from "./Container.jsx";

const MovieCard = ({ movie }) => {
  return (
    <>
      <Container>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
