import React, { useEffect, useState } from "react";
import movieAPI from "../api/modules/movie.api.js";
import axios from 'axios';

function Movies() {
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {

       
        //const response = await axios.get('http://localhost:3001/movie/634488');
        const movieInfo = await movieAPI.getInfo(1011985);
            if (movieInfo.response) {
                setMovie(movieInfo.response.data);
                console.log(movieInfo.response.data);
            } else if (movieInfo.err) {
                console.error('Error fetching movie info:', movieInfo.err);
        }
        const videos = await movieAPI.getVideos(1011985);
        if (videos.response) {
            setVideos(videos.response.data.results);
            console.log(videos.response.data.results);
        } else if (videos.err) {
            console.error('Error fetching movie videos:', videos.err);
        }
     
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
      {videos && ( 
        <div>
          <h2>Videos</h2>
          <ul>
            {videos.map((video) => (
              <li key={video.id}>
                <a href={`https://www.youtube.com/watch?v=${video.key}`}>{video.name}</a>
              </li>
            ))}
          </ul>
        </div>
      
      )}
    </div>
  );
}

export default Movies;
