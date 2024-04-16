import { useContext } from "react";
import { Link } from "react-router-dom";

import "./navbar.css";
import { useAuth } from "../../hooks/AuthContext.js";

const NavBar = () => {
   
    const auth = useAuth();

    const user = auth.getUser();
    const handleLogout = () => {
        auth.handleLogout();
    }
    const username = user ? user.username : '';
     console.log(user)
    return (
        <nav className="navbar">
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
            </ul>
            <ul className="nav_list">
            {!user ? (
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
                <Link className="nav_items_name" to={`/account/${username}`}>
                {user.username ? `${user.username} ` : 'Welcome, Guest'}
                </Link>
                {/* <button onClick={handleLogout}>Sign Out</button> */}
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