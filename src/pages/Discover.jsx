import React, { useState, useEffect } from "react";
import movieAPI from "../api/modules/movie.api.js";
import { Box } from "@mui/material";
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
          justifyContent: "start"
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesResponse = await movieAPI.getDiscover(28);
        if (moviesResponse.response) {
          const resultMoviesData = moviesResponse.response.results;
          setResultMovies(resultMoviesData);
        } else if (moviesResponse.err) {
          console.error("Error fetching top rated movies:", moviesResponse.err);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <SortFilterContainer />
        <ResultGridContainer movies={resultMovies} />
      </Box>
    </>
  );
}
