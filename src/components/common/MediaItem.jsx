import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Container from "./Container.jsx";
import { Link } from "react-router-dom";

const MediaItem = ({ media, mediaType }) => {
  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    setTitle(media.title || media.name);
    setPosterPath(media.poster_path || media.profile_path);
    if (mediaType === "movie") {
      setReleaseDate(media.release_date);
      setRating(media.vote_average);
    }
  }, [media, mediaType]);

  return (
    <>
      {mediaType === "movie" && (
        <Container>
          <img
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt={title}
            style={{ width: "15vw", height: "22.5vw" }}
          />
          <Link to={`/movie/${media.id}`}>
            <Typography variant="h2" fontSize={"1rem"}>
              {title}
            </Typography>
          </Link>
          <Typography fontSize={"1rem"}>{releaseDate}</Typography>
        </Container>
      )}

      {mediaType === "person" && (
        <Container>
          <img
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt="portrait"
            style={{ width: "15vw" }}
          />
          <Link to={`/person/${media.id}`}>
            <Typography variant="h2" fontSize={"1rem"}>
              {media.name}
            </Typography>
          </Link>
          <Typography fontSize={"1rem"}>{media.character}</Typography>
        </Container>
      )}
    </>
  );
};

export default MediaItem;
