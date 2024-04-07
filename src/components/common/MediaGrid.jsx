import { Grid } from "@mui/material";
import MediaItem from "./MediaItem.jsx";

const MediaGrid = ({ medias, mediaType }) => {
  return (
    <>
      <Grid container spacing={1}>
        {medias.map((media, index) => (
          <Grid item key={index} xs={5} sm={4} md={3}>
            <MediaItem media={media} mediaType={mediaType} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MediaGrid;
