import "./App.css";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate} from "react-router-dom";
import React, { useState, useEffect } from "react"; // Import useState từ 'react'
import Login from "./components/Login/index.js";
import SignUp from "./components/SignUp/index.js";
import HomePage from "./pages/HomePage.jsx";
import AccountDetail from "./pages/AccountDetail.jsx";
import MovieDetail from "./pages/MovieDetails.jsx";
import PersonDetail from "./pages/PersonDetail.jsx";
import Discover from "./pages/Discover.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import MovieSearch from "./pages/MediaSearch.jsx";

import Review from "./components/Review/Review.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (usernameInput) => {

    setUsername(usernameInput);
  }

  return (
  
    <BrowserRouter>
    
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:movieId" element={<MovieDetail />} />
        <Route path="/movie" element={<Discover/>} />
        <Route path="/login" element={ <Login />} />
        <Route path="/signup" element={ <SignUp />}/>
        <Route path="/account/:username" element={<AccountDetail/>} />
        <Route path="/person/:personId" element={<PersonDetail />} />
        <Route path="/search" element={<MovieSearch />} />
        <Route path="/reviews/:movieId" element={<Review />} />
      </Routes>

    <footer className="footer">
        <p>© {new Date().getFullYear()} Movie App</p>
        {/* <div className="footer_legal">
          <h3>Legal</h3>
          <ul>
            <li><a>Terms of Use</a></li>
            <li><a>API Terms of Use</a></li>
            <li><a>Privacy Policy</a></li>
            <li><a>DMCA Policy</a></li>
          </ul>
      </div> */}
    </footer>
   
    </BrowserRouter>
  
  );
}

export default App;
