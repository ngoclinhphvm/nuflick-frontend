import React, { useState, useEffect } from "react";
import movieAPI from "../api/modules/movie.api.js";
import { Box } from "@mui/material";
import { Button, Stack } from "@mui/material";
import FilterBox from "../components/common/FilterBox.jsx";
import ToggleablePanel from "../components/common/ToggleablePanel.jsx";
import MediaGrid from "../components/common/MediaGrid.jsx";

function SortPanel() {
  let sortOptions = [
    "Popularity Descending",
    "Popularity Ascending",
    "Rating Descending",
    "Rating Ascending",
    "Release Year Descending",
    "Release Year Ascending",
    "Title (A-Z)",
    "Title (Z-A)",
  ];
  return (
    <Box>
      <ToggleablePanel title="Sort">
        <FilterBox title="Sort Results by" options={sortOptions} />
      </ToggleablePanel>
    </Box>
  );
}

function FilterPanel() {
  let genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Thriller",
    "TV Movie",
    "War",
    "Western",
  ];
  let languages = ["vietnamese", "english"];
  let years = [2002, 2024];
  return (
    <Box>
      <ToggleablePanel title="filter">
        <FilterBox title="genre" options={genres} />
        <FilterBox title="language" options={languages} />
        <FilterBox title="year" options={years} />
      </ToggleablePanel>
    </Box>
  );
}

function SortFilterContainer() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "20px",
          justifyContent: "start",
        }}
      >
        <SortPanel />
        <FilterPanel />
      </Box>
    </>
  );
}

function ResultGridContainer({ movies }) {
  return (
    <>
      <Box sx={{ flex: "1" }}>
        <MediaGrid mediaList={movies} mediaType="movie"></MediaGrid>
      </Box>
    </>
  );
}

export default function Discover() {
  // const [sortOption, setSortOption] = useState("Popularity Descending");
  const [genreOption, setGenreOption] = useState(28);
  // const [languageOption, setLanguageOption] = useState("Any");
  // const [yearOption, setYearOption] = useState("Any");

  const [resultMovies, setResultMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [page, setPage] = useState(1);
  const skip = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesResponse = await movieAPI.getDiscover(28);
        if (moviesResponse) {
          let MoviesSorted = [];
          MoviesSorted = moviesResponse.response.results.sort(
            (a, b) => getReleaseDate(b) - getReleaseDate(a)
          );
          console.log(moviesResponse.response.results);
          setResultMovies([...MoviesSorted]);
          setFilteredMovies([...MoviesSorted].splice(0, skip));
        } else {
          console.error("Error fetching person:", moviesResponse.err);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

  const getReleaseDate = (movie) => {
    const date = new Date(movie.release_date);
    return date.getTime();
  };

  const onLoadMore = () => {
    setFilteredMovies([
      ...filteredMovies,
      ...[...resultMovies].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  return (
    <>
      <Stack>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <SortFilterContainer />
          <ResultGridContainer movies={filteredMovies} />
        </Box>
        {filteredMovies.length < resultMovies.length && (
          <Button sx={{right: -145}} onClick={onLoadMore}>load more</Button>
        )}
      </Stack>
    </>
  );
}
