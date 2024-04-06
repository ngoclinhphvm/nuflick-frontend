import { Typography } from "@mui/material";
import Container from "./Container.jsx";

const MovieCard = ({ movie }) => {
  const DEFAULT_IMAGE_PATH = "/no_image.jpg";
  let src = movie.poster_path || movie.backdrop_path;
  if (src) {
    src = `https://image.tmdb.org/t/p/w500${src}`;
  } else {
    src = DEFAULT_IMAGE_PATH;
  }

  return (
    <>
      <Container>
        <img
          src={src}
          alt="film poster"
          style={{ width: "15vw", height: "22.5vw" }}
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
