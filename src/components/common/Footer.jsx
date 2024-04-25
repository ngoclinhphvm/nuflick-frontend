import { Box } from "@mui/material";

function FooterMessage({ children }) {
  return (
    <p
      style={{
        textAlign: "center",
        fontFamily: '"Roboto", sans-serif',
        fontSize: "18px",
        fontWeight: "400",
        color: "white",
      }}
    >
      {children}
    </p>
  );
}

export default function Footer() {
  return (
    <footer>
      <Box
        sx={{
          marginTop: "3em",
          backgroundColor: "#000000",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "8.5em",
          justifyContent: "center"
        }}
      >
        <FooterMessage>
          All copyrighted content (i.e. film posters) 
          <br/>
          are owned by their respective owners.
          <br/>
          Data is provided by TMDB.
          <br />© 2024 NuFlick. All rights reserved.
        </FooterMessage>
      </Box>
    </footer>
  );
}
