import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CircularRate from "./CircularRate";
import Container from "./Container";

const MediaItem = ({ media, mediaType }) => {
  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [rating, setRating] = useState(null);
  let src = "";
  useEffect(() => {
    setTitle(media.title || media.name);
    setPosterPath(
      media.poster_path || media.backdrop_path || media.profile_path
    );
    if (mediaType === "movie") {
      setReleaseDate(media.release_date);
      setRating(media.vote_average);
    }
  }, [media, mediaType]);
  if (posterPath !== "") {
    src =
      (posterPath && `https://image.tmdb.org/t/p/w500${posterPath}`) ||
      "/no_image.jpg";
  }
  return (
    media && (
      <>
        {mediaType === "movie" && (
          <Link to={`/movie/${media.id}`}>
            <Box
              sx={{
                ...uiConfigs.style.backgroundImage(src),
                paddingTop: "160%",
                "&:hover .media-info": { opacity: 1, bottom: 0 },
                "&:hover .media-back-drop, &:hover .media-play-btn": {
                  opacity: 1,
                },
                color: "primary.contrastText",
              }}
            >
              <>
                <FavoriteIcon
                  color="primary"
                  sx={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    fontSize: "2rem",
                  }}
                />

                <Box
                  className="media-back-drop"
                  sx={{
                    opacity: { xs: 1, md: 0 },
                    transition: "all 0.3s ease",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundImage:
                      "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
                  }}
                />
                <Button
                  className="media-play-btn"
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  sx={{
                    display: { xs: "none", md: "flex" },
                    opacity: 0,
                    transition: "all 0.3s ease",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    "& .MuiButton-startIcon": { marginRight: "-4px" },
                  }}
                />
                <Box
                  className="media-info"
                  sx={{
                    transition: "all 0.3s ease",
                    opacity: { xs: 1, md: 0 },
                    position: "absolute",
                    bottom: { xs: 0, md: "-20px" },
                    width: "100%",
                    height: "max-content",
                    boxSizing: "border-box",
                    padding: { xs: "10px", md: "2rem 1rem" },
                  }}
                >
                  <Stack spacing={{ xs: 1, md: 2 }}>
                    {rating && <CircularRate value={rating} />}

                    <Typography>{releaseDate}</Typography>

                    <Typography
                      variant="body1"
                      fontWeight="700"
                      sx={{
                        fontSize: "1rem",
                        ...uiConfigs.style.typoLines(1, "left"),
                      }}
                    >
                      {title}
                    </Typography>
                  </Stack>
                </Box>
              </>
            </Box>
          </Link>
        )}

        {mediaType === "person" && (
          <Link to={`/person/${media.id}`}>
            <Container>
              <img src={src} alt="portrait" style={{ width: "15vw" }} />

              <Typography variant="h2" fontSize={"1rem"}>
                {media.name}
              </Typography>
            </Container>
          </Link>
        )}
      </>
    )
  );
};

export default MediaItem;
