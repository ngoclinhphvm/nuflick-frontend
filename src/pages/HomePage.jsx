import React, { useEffect, useState } from "react";
import MovieGrid from "../components/common/MovieGrid.jsx";
import movieAPI from "../api/modules/movie.api.js";
import personApi from "../api/modules/person.api.js";
import PersonItem from "../components/common/PersonItem.jsx";
function HomePage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const popularMovies = await movieAPI.getMovieList({ movieType: "popular"});
        if (popularMovies.response) {
          let top4 = popularMovies.response.data.results.slice(0, 4);
          setPopularMovies(top4);
        } else if (popularMovies.err) {
          console.error("Error fetching popular movies:", popularMovies.err);
        }
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    const getTopRatedMovies = async () => {
      try {
        const topRatedMovies = await movieAPI.getMovieList({ movieType: "top_rated" });
        if (topRatedMovies.response) {
          let top4 = topRatedMovies.response.data.results.slice(0, 4);
          setTopRatedMovies(top4);
        } else if (topRatedMovies.err) {
          console.error("Error fetching top rated movies:", topRatedMovies.err);
        }
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    }

    const getUpcomingMovies = async () => {
      try {
        const upcomingMovies = await movieAPI.getMovieList({ movieType: "upcoming" });
        if (upcomingMovies.response) {
          let top4 = upcomingMovies.response.data.results.slice(0, 4);
          setUpcomingMovies(top4);
        } else if (upcomingMovies.err) {
          console.error("Error fetching upcoming movies:", upcomingMovies.err);
        }
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    }
    const getPerson = async ()=> {
      try {
        const personDetail = await personApi.getDetails(52);
        if(personDetail) {
          setPerson(personDetail);
        } else {
          console.error("Error fetching person:", personDetail.err);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getPopularMovies();
    getTopRatedMovies();
    getUpcomingMovies();
    getPerson();
  }, []);

  
  return (
    <>
      <PersonItem person={{
        name:  person ? person.name : "" ,
        profile_path: person ? person.profile_path : ""
      }}/>
      <MovieGrid movies={popularMovies} moviesType="popular"/>
      <MovieGrid movies={topRatedMovies} moviesType="top rated"/>
      <MovieGrid movies={upcomingMovies} moviesType="upcoming"/>
    </>
  );
}

export default HomePage;
