import { Typography } from "@mui/material";
import Container from "./Container.jsx";

const MovieCard = ({ posterPath, title, releaseDate }) => {
  return (
    <>
      <Container>
        <img src={posterPath} alt="film poster" style={{ width: "15vw" }} />
        <Typography variant="h2" fontSize={"1rem"}>
          {title}
        </Typography>
        <Typography fontSize={"1rem"}>{releaseDate}</Typography>
      </Container>
    </>
  );
};

export default MovieCard;
