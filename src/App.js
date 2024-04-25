import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./components/Login/index.js";
import SignUp from "./components/SignUp/index.js";
import HomePage from "./pages/HomePage.jsx";
import AccountDetail from "./pages/AccountDetail.jsx";
import MovieDetail from "./pages/MovieDetails.jsx";
import PersonDetail from "./pages/PersonDetail.jsx";
import Discover from "./pages/Discover.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import MovieSearch from "./pages/MediaSearch.jsx";
import Footer from "./components/common/Footer/Footer.jsx";
import { Box } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <NavBar />
        <Box flex="1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:movieId" element={<MovieDetail />} />
            <Route path="/movie" element={<Discover />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account/:username" element={<AccountDetail />} />
            <Route path="/person/:personId" element={<PersonDetail />} />
            <Route path="/search" element={<MovieSearch />} />
          </Routes>
        </Box>
        <Footer style={{ marginTop: "auto" }} />
      </Box>
    </BrowserRouter>
  );
}

export default App;
