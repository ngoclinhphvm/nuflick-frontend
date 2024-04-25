import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../common/Logo.jsx";
import "./navbar.css";
import { useAuth } from "../../hooks/AuthContext.js";

const NavBar = () => {
  const auth = useAuth();
  const user = auth.getUser();
  const handleLogout = () => {
    auth.handleLogout();
  };
  const username = user ? user.username : "";

  const [isFixed, setIsFixed] = useState(false);
  const [flexDirection, setFlexDirection] = useState(
    window.innerWidth < 768 ? "column" : "row"
  );
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      const scrollPosition = window.scrollY;

      if (scrollPosition > 0 && !isFixed) {
        setIsFixed(true);
        navbar.classList.add("fixed");
      } else if (scrollPosition === 0 && isFixed) {
        setIsFixed(false);
        navbar.classList.remove("fixed");
      }
    };

    const handleResize = () => {
      setFlexDirection(window.innerWidth < 768 ? "column" : "row");
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isFixed]);

  return (
    <nav
      style={{
        display: "flex",
        flexDirection: flexDirection,
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
      }}
      className={`navbar ${isFixed ? "fixed" : ""} ${flexDirection}`}
    >
      <ul style={{ alignItems: "center" }} className="nav_list">
        <li className="nav_items">
          <Logo />
        </li>
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
      <ul className="nav_list auth">
        {!user ? (
          <>
            <li className="nav_items">
              <Link className="nav_items_name" to="/login">
                Login
              </Link>
            </li>
            <li className="nav_items">
              <Link className="nav_items_name" to="/signup">
                Register
              </Link>
            </li>
          </>
        ) : (
          <li className="nav_items">
            <Link className="nav_items_name" to={`/account/${username}`}>
              {user.username ? `${user.username} ` : "Welcome, Guest"}
            </Link>
            <Link className="nav_items_name" to="/" onClick={handleLogout}>
              Sign Out
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
