import React, { useState, useEffect } from "react";
import movieAPI from "../api/modules/movie.api.js";
import { Box, Button } from "@mui/material";
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
  let genres = ["Any", ...Object.keys(tmdbConfigs.movieGenreIds)];
  let languages = ["Any", ...Object.keys(tmdbConfigs.movieLanguageTags)];
  let years = ["Any", 2002, 2024];
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
  onSearch,
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
        <button onClick={onSearch}>Search</button>
      </Box>
    </>
  );
}

export default function Discover() {
  const [sortOption, setSortOption] = useState("Popularity Descending");
  const [genreOption, setGenreOption] = useState("");
  const [languageOption, setLanguageOption] = useState("");
  const [releaseYearOption, setRealeaseYearOption] = useState("");

  const [searchParams, setSearchParams] = useState({
    sort_by: "",
    genre: "",
    language: "",
    year: "",
  });

  const [resultMovies, setResultMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesResponse = await movieAPI.getDiscover(
          currentPage,
          searchParams.genre,
          searchParams.year,
          searchParams.language,
          searchParams.sort_by
        );
        if (moviesResponse.response) {
          const allMovies = moviesResponse.response.results;
          setResultMovies((resultMovies) => [...resultMovies, ...allMovies]);
        } else if (moviesResponse.err) {
          console.error("Error fetching top rated movies:", moviesResponse.err);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, [searchParams, currentPage]);

  function handleSearchButtonClick() {
    setSearchParams({
      sort_by: tmdbConfigs.discoverSortOptions[sortOption],
      genre:
        genreOption === "Any" ? "" : tmdbConfigs.movieGenreIds[genreOption],
      language:
        languageOption === "Any"
          ? ""
          : tmdbConfigs.movieLanguageTags[languageOption],
      year: releaseYearOption === "Any" ? "" : releaseYearOption,
    });
    setResultMovies([]);
    setCurrentPage(1);
  }

  function handleLoadMoreButtonClick() {
    setCurrentPage(currentPage + 1);
  }

  return (
    <>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <SortFilterContainer
          onSortOptionChange={setSortOption}
          onGenreOptionChange={setGenreOption}
          onLanguageOptionChange={setLanguageOption}
          onReleaseYearOptionChange={setRealeaseYearOption}
          onSearch={handleSearchButtonClick}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "20px",
            justifyContent: "start",
            flexGrow: "1",
          }}
        >
          <MediaGrid mediaList={resultMovies} mediaType="movie"></MediaGrid>
          <Button onClick={handleLoadMoreButtonClick}>Load More</Button>
        </Box>
      </Box>
    </>
  );
}
