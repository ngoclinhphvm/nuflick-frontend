import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import TextAvatar from "./TextAvatar";

const ReviewItem = ({ review }) => {
  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: "5px",
        position: "relative",
        opacity: 1,
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Stack direction="row" spacing={2}>
        <TextAvatar text={review.username} />
        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight="700">
              {review.username}
            </Typography>
            <Typography variant="caption">
              {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
            </Typography>
          </Stack>
          <Typography variant="body1" textAlign="justify">
            {review.text}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ReviewItem;
