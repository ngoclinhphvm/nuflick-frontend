import React, { useState, useEffect } from "react";
import movieAPI from "../api/modules/movie.api.js";
import { Box } from "@mui/material";
import FilterBox from "../components/common/FilterBox.jsx";
import ToggleablePanel from "../components/common/ToggleablePanel.jsx";
import MediaGrid from "../components/common/MediaGrid.jsx";

function SortPanel({ onSortOptionChange }) {
  console.log(
    "In SortPanel, onSortOptionChange is a ",
    typeof onSortOptionChange
  );

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
        <FilterBox
          title="Sort Results by"
          options={sortOptions}
          onOptionChange={onSortOptionChange}
        />
      </ToggleablePanel>
    </Box>
  );
}

function FilterPanel({
  onGenreOptionChange,
  onLanguageOptionChange,
  onReleaseYearOptionChange,
}) {
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
        <FilterBox
          title="genre"
          options={genres}
          onOptionChange={onGenreOptionChange}
        />
        <FilterBox
          title="language"
          options={languages}
          onOptionChange={onLanguageOptionChange}
        />
        <FilterBox
          title="year"
          options={years}
          onOptionChange={onReleaseYearOptionChange}
        />
      </ToggleablePanel>
    </Box>
  );
}

function SortFilterContainer({
  onSortOptionChange,
  onGenreOptionChange,
  onLanguageOptionChange,
  onReleaseYearOptionChange,
}) {
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
        <SortPanel onSortOptionChange={onSortOptionChange} />
        <FilterPanel
          onGenreOptionChange={onGenreOptionChange}
          onLanguageOptionChange={onLanguageOptionChange}
          onReleaseYearOptionChange={onReleaseYearOptionChange}
        />
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
  const [sortOption, setSortOption] = useState("Popularity Descending");
  const [genreOption, setGenreOption] = useState(28);
  const [languageOption, setLanguageOption] = useState("Any");
  const [releaseYearOption, setRealeaseYearOption] = useState("Any");

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
        <SortFilterContainer
          onSortOptionChange={setSortOption}
          onGenreOptionChange={setGenreOption}
          onLanguageOptionChange={setLanguageOption}
          onReleaseYearOptionChange={setRealeaseYearOption}
        />
        {/* <Box>Sort option: {sortOption}</Box>
        <Box>Genre option: {genreOption}</Box>
        <Box>Language option: {languageOption}</Box>
        <Box>Year option: {releaseYearOption}</Box> */}
        <ResultGridContainer movies={resultMovies} />
      </Box>
    </>
  );
}
