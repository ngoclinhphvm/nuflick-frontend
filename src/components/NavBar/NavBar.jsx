import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../common/Logo.jsx";
import "./navbar.css";
import { useAuth } from "../../hooks/AuthContext.js";
import TextAvatar from "../common/TextAvatar.jsx";
const NavBar = () => {
    const auth = useAuth();
    const user = auth.getUser();
    const handleLogout = () => {
        auth.handleLogout();
    };
    const username = user ? user.username : "";
    const [showMenu, setShowMenu] = useState(false);
    
   function toggleMenu() {
    const element = document.getElementById('sub-menu-wrap');
    if (element) {
        element.classList.toggle('open-class');
    } else {
        console.error('Element with id "sub-menu-wrap" not found');
    }
    }
    // const [isFixed, setIsFixed] = useState(false);
    // const [flexDirection, setFlexDirection] = useState(
    //     window.innerWidth < 768 ? "column" : "row"
    // );
    
    // useEffect(() => {
    //     const handleScroll = () => {
    //     const navbar = document.querySelector(".navbar");
    //     const scrollPosition = window.scrollY;

    //     if (scrollPosition > 0 && !isFixed) {
    //         setIsFixed(true);
    //         navbar.classList.add("fixed");
    //     } else if (scrollPosition === 0 && isFixed) {
    //         setIsFixed(false);
    //         navbar.classList.remove("fixed");
    //     }
    //     };

    //     const handleResize = () => {
    //     setFlexDirection(window.innerWidth < 768 ? "column" : "row");
    //     };

    //     window.addEventListener("scroll", handleScroll);
    //     window.addEventListener("resize", handleResize);

    //     return () => {
    //     window.removeEventListener("scroll", handleScroll);
    //     window.removeEventListener("resize", handleResize);
    //     };
    // }, [isFixed]);

    return (
        
        <nav
        // style={{
        //     display: "flex",
        //     flexDirection: "row",
        //     justifyContent: "space-between",
        //     alignItems: "center",
        //     textAlign: "center",
        // }}
        //className={`navbar ${isFixed ? "fixed" : ""} ${flexDirection}`}
        //  className="navbar"
        >
        <ul  className="nav_list">
            <li className="nav_items logo">
            <Logo/>
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
        <div className="container-menu">
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
                    <button className="button" onClick={() => {
                        setShowMenu(prev => !prev);
                    }}>
                        <TextAvatar text={user.username} />
                    </button>
                </li>
                )}
            </ul>
            
            
            {user&&showMenu && (
                <div className="drop-down-profile" id="sub-menu-wrap">
                    <div className="menu-sub">
                        <div className="user-info">
                            <h1>Welcome, {user.username}</h1>
                        </div>
                        <hr></hr>
                        <Link className="menu_items_link" to={`/account/${username}`}>
                            Profile
                        </Link>
                        <Link className="menu_items_link" to={`/account/${username}/update-profile`}>
                        Update Profile
                        </Link>
                        <Link className="menu_items_link" to={`/account/${username}/update-password`}>
                        Update Password
                        </Link>
                        <Link className="menu_items_link" to="/" onClick={handleLogout}>
                        Sign Out
                        </Link>
                        
                    </div>
                </div>
                )
                }
            </div>
            </nav>
            
        
    );
    };

export default NavBar;