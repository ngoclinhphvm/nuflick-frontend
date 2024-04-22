import React, { useEffect, useState } from "react";
import movieAPI from "../api/modules/movie.api.js";
import Container from "../components/common/Container/Container.jsx";
import uiConfigs from "../configs/ui.configs.js";
import { Box, Divider, Stack, Typography } from "@mui/material";
import ImageHeader from "../components/common/ImageHeader";
import CircularRate from "../components/common/CircularRate";
import { Link } from "react-router-dom";
import MediaSlider from "../components/common/MediaSlider.jsx";

function HomePage() {
  const [popularMovies, setPopularMovies] = useState(null);
  const [topRatedMovies, setTopRatedMovies] = useState(null);
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [mostPopularMovie, setMostPopularMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularMoviesResponse = await movieAPI.getMovieList({
          movieType: "popular",
        });
        if (popularMoviesResponse.response) {
          const popularMoviesData = popularMoviesResponse.response.data.results;
          const top1 = popularMoviesData[0];
          setMostPopularMovie(top1);
          setPopularMovies(popularMoviesData);
        } else if (popularMoviesResponse.err) {
          console.error(
            "Error fetching popular movies:",
            popularMoviesResponse.err
          );
        }

        const topRatedMoviesResponse = await movieAPI.getMovieList({
          movieType: "top_rated",
        });
        if (topRatedMoviesResponse.response) {
          const topRatedMoviesData =
            topRatedMoviesResponse.response.data.results;
          setTopRatedMovies(topRatedMoviesData);
        } else if (topRatedMoviesResponse.err) {
          console.error(
            "Error fetching top rated movies:",
            topRatedMoviesResponse.err
          );
        }

        const upcomingMoviesResponse = await movieAPI.getMovieList({
          movieType: "upcoming",
        });
        if (upcomingMoviesResponse.response) {
          const upcomingMoviesData =
            upcomingMoviesResponse.response.data.results;
          setUpcomingMovies(upcomingMoviesData);
        } else if (upcomingMoviesResponse.err) {
          console.error(
            "Error fetching upcoming movies:",
            upcomingMoviesResponse.err
          );
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

  let posterPath = "";
  let src = "";
  if (mostPopularMovie) {
    posterPath = mostPopularMovie.backdrop_path || mostPopularMovie.poster_path;
    src = posterPath
      ? `https://image.tmdb.org/t/p/original${posterPath}`
      : "/no_image.jpg";
  }

  return (
    <div style={{ width: "99%" }}>
      {mostPopularMovie && (
        <>
          <Link to={`/movie/${mostPopularMovie.id}`}>
            <ImageHeader imgPath={src} />
          </Link>
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
              marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" },
            }}
          >
            <Box
              sx={{
                width: { xs: "70%", sm: "40%", md: "20%" },
                margin: { xs: "0 auto 2rem", md: "0 4rem 0 5rem" },
              }}
            >
              <Box
                sx={{
                  paddingTop: "140%",
                  ...uiConfigs.style.backgroundImage(src),
                }}
              />
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                color: "text.primary",
              }}
            >
              <Typography
                variant="h4"
                fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                fontWeight="700"
                sx={{ ...uiConfigs.style.typoLines(2, "left") }}
              >
                {`${mostPopularMovie.title || mostPopularMovie.name} ${
                  mostPopularMovie.release_date.split("-")[0]
                }`}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <CircularRate value={mostPopularMovie.vote_average} />
                <Divider orientation="vertical" />
              </Stack>
              <Typography
                variant="body1"
                sx={{ ...uiConfigs.style.typoLines(5) }}
              >
                {mostPopularMovie.overview}
              </Typography>
            </Box>
          </Box>
        </>
      )}
      {popularMovies && (
        <Container header="popular movies">
          <MediaSlider mediaList={popularMovies} mediaType="movie" />
        </Container>
      )}
      {topRatedMovies && (
        <Container header="top-rated movies">
          <MediaSlider mediaList={topRatedMovies} mediaType="movie" />
        </Container>
      )}
      {upcomingMovies && (
        <Container header="upcoming movies">
          <MediaSlider mediaList={upcomingMovies} mediaType="movie" />
        </Container>
      )}
    </div>
  );
}

export default HomePage;
