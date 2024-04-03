import { Box, Typography, CircularProgress } from "@mui/material";

const CircularRate = ({ value }) => {
  return (
    <Box
    sx={{
      position: "relative",
      display: "inline-block",
      width: "max-content"
    }}>
       <CircularProgress variant="determinate" value={value * 10} color="success" size={50} />
        <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 5,
          left: 0,
          right: 0,
          alignItems: "center",
          display: "flex",
          justifyContent: "center"
        }}>
          <Typography
          variant="caption"
          component="div"
          fontWeight="700"
          >
          {Math.floor(value * 10) / 10}
          </Typography>
        </Box>
    </Box>
  );
};

export default CircularRate;