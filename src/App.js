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
import MovieSearch from "./pages/MediaSearch.jsx";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
 // const navigate = useNavigate();
 
  // useEffect(() => {
  //   // Kiểm tra trạng thái đăng nhập từ localStorage khi component được render
   
  //   const loggedInStatus = localStorage.getItem("isLoggedIn");
  //   if (loggedInStatus === "true") {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  const handleLoginSuccess = () => {
    // Xử lý logic đăng nhập thành công
    setIsLoggedIn(true);
    // Lưu trạng thái đăng nhập vào localStorage
    
    localStorage.setItem("isLoggedIn", "true");
  };
  const handleLogin = (usernameInput) => {

    setUsername(usernameInput);
  }
  const handleLogout = () => {
    // Xử lý logic đăng xuất
    setIsLoggedIn(false);
    // Xóa trạng thái đăng nhập khỏi localStorage
    localStorage.removeItem("isLoggedIn");

  }
  return (
  
    <BrowserRouter>
      <header className="navbar">
        <ul className="nav_list">
          <li className="nav_items">
            <Link className="nav_items_name" to="/">
              Home
            </Link>
          </li>
          <li className="nav_items">
            <Link className="nav_items_name" to="/movie">
              Discover
            </Link>
          </li>


          <li className="nav_items">
            <Link className="nav_items_name" to="/search">
              Search
            </Link>
          </li>
          
        </ul>
        <ul className="nav_list">
        {!isLoggedIn ? (
            <>
              <li className="nav_items">
                <Link className="nav_items_name" to="/login">Login</Link>
                {/* <button className="nav_items_name" onClick={handleLogin}>Login</button> */}
              </li>
              <li className="nav_items">
              <Link className="nav_items_name" to="/signup">
                Register
              </Link>

              </li>
            </>
          ) : (
            <li className="nav_items">
              <Link className="nav_items_name" to="/account">
              {username ? `${username} ` : 'Welcome, Guest'}
              </Link>
              {/* <button onClick={handleLogout}>Sign Out</button> */}
              <Link className="nav_items_name" to="/" onClick={handleLogout}>
              Sign Out
              </Link>
            </li>
          )}
        </ul>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:movieId" element={<MovieDetail />} />
        <Route path="/movie" element={<Discover/>} />
        <Route path="/login" element={ <Login handleLogin={handleLoginSuccess}/>} />
        <Route path="/signup" element={ <SignUp />}/>
        <Route path="/account/:username" element={<AccountDetail onUsername={handleLogin}/>} />
        <Route path="/person/:personId" element={<PersonDetail />} />
        <Route path="/search" element={<MovieSearch />} />
      </Routes>

      <footer className="footer">
        <p>© 2021 Movie App</p>
      </footer>
    </BrowserRouter>
  
  );
}

export default App;
