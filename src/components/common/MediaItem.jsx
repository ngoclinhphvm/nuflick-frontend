import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Container from "./Container.jsx";

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
          <Typography variant="h2" fontSize={"1rem"}>
            {title}
          </Typography>
          <Typography fontSize={"1rem"}>{releaseDate}</Typography>
        </Container>
      )}

      {mediaType === "people" && (
        <Container>
          <img
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt="portrait"
            style={{ width: "15vw" }}
          />
          <Typography variant="h2" fontSize={"1rem"}>
            {media.name}
          </Typography>
        </Container>
      )}
    </>
  );
};

export default MediaItem;
