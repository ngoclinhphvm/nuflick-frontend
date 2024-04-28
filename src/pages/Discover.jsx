import React, { useState, useEffect } from "react";
import movieAPI from "../api/modules/movie.api.js";
import { Box, Button } from "@mui/material";
import FilterBox from "../components/common/FilterBox.jsx";
import ToggleablePanel from "../components/common/ToggleablePanel.jsx";
import MediaGrid from "../components/common/MediaGrid.jsx";
import tmdbConfigs from "../api/configs/tmdb.configs.js";
import { toast } from "react-toastify";

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
  const genres = Object.keys(tmdbConfigs.movieGenreIds);
  const languages = Object.keys(tmdbConfigs.movieLanguageTags);
  const decades = [
    "1870s",
    "1880s",
    "1890s",
    "1900s",
    "1910s",
    "1920s",
    "1930s",
    "1940s",
    "1950s",
    "1960s",
    "1970s",
    "1980s",
    "1990s",
    "2000s",
    "2000s",
    "2010s",
    "2020s",
  ];
  const [decadeOption, setDecadeOption] = useState("");

  let years = [];
  if (decadeOption !== "") {
    let startYear = parseInt(decadeOption.substring(0, 4));
    console.log("startYear", startYear);
    for (let i = 0; i < 10; i++) {
      years.push(startYear++);
    }
  }
  return (
    <Box>
      <ToggleablePanel title="filter">
        <FilterBox
          title="genre"
          options={genres}
          defaultOption="Any"
          onOptionChange={onGenreOptionChange}
        />
        <FilterBox
          title="language"
          options={languages}
          defaultOption="Any"
          onOptionChange={onLanguageOptionChange}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <FilterBox
            title="decade"
            defaultOption="Any"
            options={decades}
            onOptionChange={setDecadeOption}
          />
          <FilterBox
            title="year"
            defaultOption="Any"
            options={years}
            onOptionChange={onReleaseYearOptionChange}
          />
        </Box>
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
          gap: "0.5em",
        }}
      >
        <SortPanel onOptionChange={onSortOptionChange} />
        <FilterPanel
          onGenreOptionChange={onGenreOptionChange}
          onLanguageOptionChange={onLanguageOptionChange}
          onReleaseYearOptionChange={onReleaseYearOptionChange}
        />
        <Button sx={{ margin: "1rem" }} onClick={onSearch}>
          Search
        </Button>
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
    const getMovies = async () => {
      const { response, err } = await movieAPI.getDiscover(
        currentPage,
        searchParams.genre,
        searchParams.year,
        searchParams.language,
        searchParams.sort_by
      );
      if (response) {
        const allMovies = response.results;
        setResultMovies((resultMovies) => [...resultMovies, ...allMovies]);
      }
      if (err) {
        toast.error(err.message);
      }
    };

    getMovies();
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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          alignContent: "center",
        }}
      >
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
            margin: "2em",
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
