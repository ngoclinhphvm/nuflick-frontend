import { Typography, useTheme } from '@mui/material';

const Logo = () => {
  const theme = useTheme();

  return (
    <Typography fontWeight="700" fontSize="1.7rem">
      New<span style={{ color: theme.palette.primary.main }}>Flick</span>
    </Typography>
  );
};

export default Logo;