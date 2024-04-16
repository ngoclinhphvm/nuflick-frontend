import React, { useState, useEffect } from "react";
import movieAPI from "../api/modules/movie.api.js";
import { Box } from "@mui/material";
import FilterBox from "../components/common/FilterBox.jsx";
import ToggleablePanel from "../components/common/ToggleablePanel.jsx";
import MediaGrid from "../components/common/MediaGrid.jsx";
import tmdbConfigs from "../api/configs/tmdb.configs.js";

function SortPanel({ onOptionChange }) {
  let sortOptions = Object.keys(tmdbConfigs.discoverSortOptions);
  return (
    <Box>
      <ToggleablePanel title="Sort">
        <FilterBox
          title="Sort Results by"
          options={sortOptions}
          onOptionChange={onOptionChange}
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
  let genres = Object.keys(tmdbConfigs.movieGenreIds);
  let languages = Object.keys(tmdbConfigs.movieLanguageTags);
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
        <SortPanel onOptionChange={onSortOptionChange} />
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
