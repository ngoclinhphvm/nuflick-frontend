import { Grid } from "@mui/material";
import MovieCard from "./MovieCard.jsx";
import Container from "./Container.jsx";

const MovieGrid = ({ movies, moviesType }) => {
  return (
    <>
      <Container header={moviesType}>
        <Grid container spacing={1}>
          {movies.map((movie, index) => (
            <Grid item key={index} xs={5} sm={4} md={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default MovieGrid;
