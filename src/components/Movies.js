import React, { useEffect, useState } from "react";
import movieAPI from "../api/modules/movie.api.js";
import axios from 'axios';

function Movies() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {

       // const response = await fetch('http://localhost:3000/movie/634492?api_key=6b651d68e87a26b95fe71080b28abea1');
        const response = await axios.get('http://localhost:3001/movie/634482');
        //setMovie(response.data);
        //const data = await response.json();
        const movieInfo = await movieAPI.getInfo(64482);
            if (movieInfo.response) {
                setMovie(movieInfo.response);
            } else if (movieInfo.err) {
                console.error('Error fetching movie info:', movieInfo.err);
            }
        //setMovie(response.data); 
        //console.log(movieInfo.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    getMovies();
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      {movie && (
        <div className="movie">
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <p>Release Date: {movie.release_date}</p>
          <p>Popularity: {movie.popularity}</p>
          <p>Vote Average: {movie.vote_average}</p>
        </div>
      )}
    </div>
  );
}

export default Movies;
