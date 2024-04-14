import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import personApi from "../../api/modules/person.api.js";
import MediaGrid from "./MediaGrid.jsx";
const PersonMovieGrid = ({ personId, type }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [page, setPage] = useState(1);
  const skip = 8;

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await personApi.getMovieCredits(personId);
        if (response) {
          let MoviesSorted = [];
          if (type === "cast") {
          MoviesSorted = response.cast.sort(
            (a, b) => getReleaseDate(b) - getReleaseDate(a)
          );
          } else if (type === "crew") {
           MoviesSorted = response.crew.sort(
            (a, b) => getReleaseDate(b) - getReleaseDate(a)
          );
          }
          setMovies([...MoviesSorted]);
          setFilteredMovies([...MoviesSorted].splice(0, skip));
        
        } else {
          console.error("Error fetching person:", response.err);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getMovies();
  }, [personId]);

  const getReleaseDate = (movie) => {
    const date = new Date(movie.release_date);
    return date.getTime();
  };

  const onLoadMore = () => {
    setFilteredMovies([
      ...filteredMovies,
      ...[...movies].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  return (
    <>
      <MediaGrid mediaList={filteredMovies} mediaType="movie"/>
      {filteredMovies.length < movies.length && (
        <Button onClick={onLoadMore}>load more</Button>
      )}
    </>
  );
};

export default PersonMovieGrid;
