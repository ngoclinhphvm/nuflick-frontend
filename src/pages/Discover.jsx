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

  // const [filteredMovies, setFilteredMovies] = useState([]);
  const [resultMovies, setResultMovies] = useState([]);
  const [page, setPage] = useState(1);
  const skip = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesResponse = await movieAPI.getDiscover(
          page,
          searchParams.genre,
          searchParams.year,
          searchParams.language,
          searchParams.sort_by
        );
        if (moviesResponse.response) {
          const allMovies = moviesResponse.response.results;
          setResultMovies(allMovies);
        } else if (moviesResponse.err) {
          console.error("Error fetching top rated movies:", moviesResponse.err);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, [searchParams]);

  function handleSearchButtonClick() {
    setSearchParams({
      sort_by:
        sortOption === "" ? "" : tmdbConfigs.discoverSortOptions[sortOption],
      genre: genreOption === "" ? "" : tmdbConfigs.movieGenreIds[genreOption],
      language:
        languageOption === ""
          ? ""
          : tmdbConfigs.movieLanguageTags[languageOption],
      year: releaseYearOption,
    });
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
          {/* {filteredMovies.length < resultMovies.length && (
            <Button
              variant="contained"
              sx={{ width: "20%", alignSelf: "center", marginTop: "10px" }}
            >
              load more
            </Button> */}
        </Box>
      </Box>
    </>
  );
}
