
import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Movies from './components/Movies.js';
import Login from './components/Login/index.js';
import SignUp from './components/SignUp/index.js';
import HomePage from './pages/HomePage.jsx';
import AccountDetail from './pages/AccountDetail.jsx';
import MovieDetail from './pages/MovieDetails.jsx';
function App() {
  return (
    <BrowserRouter>
    
      <nav className = 'navbar'>
        <ul className='nav_list'>
            <li className='nav_items'>
              <a className = "nav_items_name" href ="/">Home</a>
            </li>
            <li className='nav_items'>
              <a className = "nav_items_name"  href = "/movie">Detail</a>
            </li>
        </ul>
        <ul className='nav_list'>
          <li className='nav_items'>
            <a className = "nav_items_name"  href ="/login"> Login</a>
          </li>
          <li className='nav_items'>
            <a  className = "nav_items_name"  href ="/signup">Register</a>
          </li>
          <li className='nav_items'>
            <a className = "nav_items_name"  href ='/account'>Account</a>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/movie/:movieId" element={<MovieDetail/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/account/:username" element={<AccountDetail/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
